<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'


// 🟦 Interfaces
interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
}


// Suche
const searchQuery = ref('')
const showOnlyFavorites = ref(false)

const filteredProducts = computed(() =>
  products.value
    .filter(p =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .filter(p => !showOnlyFavorites.value || favorites.isFavorite(p.id))
)
// 🟦 Store
const cart = useCartStore()

// 🟦 Refs
const products = ref<Product[]>([])
const categories = ref<{ label: string; value: string }[]>([])
const selectedCategory = ref<string>('all')
const imageDialog = ref(false)
const selectedImage = ref('')
const isLoading = ref(true)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarQueue = ref<string[]>([])

const favorites = useFavoritesStore()


onMounted(() => {
  favorites.loadFromStorage()
})


// 🟦 Snackbar-Warteschlange
function queueSnackbar(message: string) {
  snackbarQueue.value.push(message)
  if (!snackbar.value) {
    showNextSnackbar()
  }
}

function showNextSnackbar() {
  if (snackbarQueue.value.length === 0) return

  snackbarText.value = snackbarQueue.value.shift()!
  snackbar.value = true

  setTimeout(() => {
    snackbar.value = false
    setTimeout(showNextSnackbar, 300)
  }, 2000)
}

// 🟦 Bild-Dialog
function openImage(imageUrl: string) {
  selectedImage.value = imageUrl
  imageDialog.value = true
}

// 🟦 Produkte laden
const loadProducts = async () => {
  isLoading.value = true
  try {
    const url =
      selectedCategory.value === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory.value}`

    const res = await axios.get(url)
    products.value = res.data
  } catch (err) {
    console.error('Fehler beim Laden der Produkte:', err)
  } finally {
    isLoading.value = false
  }
}

// 🟦 Kategorienübersetzungen
const categoryMap: Record<string, string> = {
  "men's clothing": 'Herrenbekleidung',
  "women's clothing": 'Damenbekleidung',
  "jewelery": 'Schmuck',
  "electronics": 'Elektronik',
}

// 🟦 Kategorien laden
const loadCategories = async () => {
  try {
    const res = await axios.get('https://fakestoreapi.com/products/categories')
    categories.value = [
      { label: 'Alle Kategorien', value: 'all' },
      ...res.data.map((cat: string) => ({
        label: categoryMap[cat] || cat,
        value: cat,
      })),
    ]
  } catch (err) {
    console.error('Fehler beim Laden der Kategorien:', err)
  }
}

// 🟦 Lifecycle
watch(selectedCategory, () => {
  loadProducts()
})

onMounted(() => {
  loadCategories()
  loadProducts()
})
</script>

<template>
  <v-container  style="padding-top: 5vh">
    <h1>Shop</h1>
    <v-row class="mt-4 mb-6" dense>
      <!-- Suchfeld -->
      <v-col cols="12" md="9">
        <v-text-field
          v-model="searchQuery"
          label="🔍 Produkt suchen"
          variant="outlined"
          density="comfortable"
          clearable
        />
      </v-col>

      <!-- Favoriten-Schalter oben rechts -->
      <v-col
        cols="12"
        md="3"
        class="mt-n5 d-flex justify-center justify-md-end align-center"
      >
        <div>
          <v-switch
            v-model="showOnlyFavorites"
            label="Nur ❤️ Favoriten"
            color="red"
            inset
            hide-details
          />
        </div>
      </v-col>
    </v-row>


    <!-- Kategorie-Auswahl -->
    <v-select
      v-model="selectedCategory"
      :items="categories"
      item-title="label"
      item-value="value"
      label="Kategorie auswählen"
      prepend-inner-icon="mdi-filter"
      variant="outlined"
      density="comfortable"
      color="blue"
      class="mb-12 mt-6"
    />

    <!-- Ladeanzeige -->
    <v-row justify="center" v-if="isLoading">
      <v-progress-circular
        indeterminate
        color="blue"
        size="50"
        class="mt-4"
      />
    </v-row>


    <!-- Produktliste -->
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12" sm="6" md="4"
      >
        <v-card class="pa-4">
          <v-img
            :src="product.image"
            height="200"
            class="product-img"
            @click="openImage(product.image)"
            cover
            style="cursor: pointer"
          />
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.price }} €</v-card-subtitle>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="outlined"
              @click="() => { cart.addToCart(product); queueSnackbar(`„${product.title}“ hinzugefügt`) }"
            >
              In den Warenkorb
            </v-btn>
            <v-btn
              icon
              :color="favorites.isFavorite(product.id) ? 'red' : 'grey'"
              @click="favorites.toggleFavorite(product.id)"
            >
              <v-icon>{{ favorites.isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog für großes Bild -->
    <v-dialog v-model="imageDialog" max-width="500">
      <v-card>
        <v-img :src="selectedImage" height="400" class="product-img" cover />
      </v-card>
    </v-dialog>

    <!-- Snackbar für Bestätigung -->
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="success"
      elevation="2"
      transition="slide-y-transition"
      :transition-duration="300"
      location="top right"
      style="
        position: fixed;
        top: 5px;
        right: 0px;
        font-size: 0.85rem;
        border-radius: 8px;
        z-index: 9999;
      "
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
::v-deep(.product-img .v-img__img),
::v-deep(.product-img .v-img__img--cover) {
  object-fit: contain !important;
  background-color: white;
}
</style>
