<script setup lang="ts">
import {computed, ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'



// 🟦 Interfaces
interface Product {
  id: number
  title: string
  price: number
  images: string[]
  category: {
    id: number
    name: string
    image: string
  }
}

interface Category {
  id: number
  name: string
  image: string
}

// 🟦 Store
const cart = useCartStore()

// 🟦 Refs
const products = ref<Product[]>([])
const categories = ref<{ label: string; value: number | 'all' }[]>([])
const selectedCategory = ref<number | 'all'>('all')
const imageDialog = ref(false)
const selectedImage = ref('')

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarQueue = ref<string[]>([])

const isLoading = ref(true)
const allowedCategoryIds = [1, 4, 5, 22, 23, 24]

const showOnlyFavorites = ref(false)

const favorites = useFavoritesStore()

onMounted(() => {
  favorites.loadFromStorage()
})


// 🟦 Hilfsfunktionen
function openImage(imageUrl: string) {
  selectedImage.value = imageUrl
  imageDialog.value = true
}

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
    // Warte, bis die Snackbar zu ist, dann nächste
    setTimeout(showNextSnackbar, 300)
  }, 2000) // gleiche Dauer wie timeout
}

//Suche
const searchQuery = ref('')

const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (!showOnlyFavorites.value || favorites.isFavorite(p.id))
  )
)
// 🟦 API-Aufrufe
const loadProducts = async () => {
  isLoading.value = true
  try {
    const url =
      selectedCategory.value === 'all'
        ? 'https://api.escuelajs.co/api/v1/products'
        : `https://api.escuelajs.co/api/v1/categories/${selectedCategory.value}/products`

    const res = await axios.get(url)
    products.value = res.data
      .filter(p =>
        typeof p.title === 'string' &&
        p.title.length > 5 &&
        !/test|sample|dating|demo|new product/i.test(p.title) &&
        typeof p.price === 'number' &&
        p.price > 0 && p.price < 1000 &&
        Array.isArray(p.images)
      )
      .map(p => {
        const validImage = typeof p.images[0] === 'string' && p.images[0].trim().startsWith('http')
          ? p.images[0]
          : 'https://via.placeholder.com/300x200/eeeeee/000000?text=Bild+fehlt'

        return {
          ...p,
          images: [validImage]
        }
      })
  } catch (err) {
    console.error('Fehler beim Laden der Produkte:', err)
  } finally {
    isLoading.value = false
  }
}

const loadCategories = async () => {
  try {
    const res = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories')
    const filtered = res.data.filter(cat => allowedCategoryIds.includes(cat.id))
    categories.value = [
      { label: 'Alle Kategorien', value: 'all' },
      ...filtered.map(cat => ({
        label: categoryTranslations[cat.name] || cat.name,
        value: cat.id
      }))
    ]
  } catch (err) {
    console.error('Fehler beim Laden der Kategorien:', err)
  }
}

// 🟦 Übersetzungen
const categoryTranslations: Record<string, string> = {
  Clothes: 'Kleidung',
  Shoes: 'Schuhe',
  Miscellaneous: 'Verschiedenes',
  fruit: 'Obst',
  Electronics: 'Elektronik',
  Furniture: 'Möbel'
}

// 🟦 Lifecycle
watch(selectedCategory, loadProducts)
onMounted(() => {
  loadCategories()
  loadProducts()
})
</script>

<template>
  <v-container  style="padding-top: 5vh">
    <h1>ShopPlatzi</h1>
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

      <!-- Favoriten-Schalter -->
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

    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12" sm="6" md="4"
      >
        <v-card class="pa-4">
          <v-img
            :src="product.images[0]"
            height="200"
            class="product-img"
            @click="openImage(product.images[0])"
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
              <v-icon>
                {{ favorites.isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" v-if="isLoading">
      <v-progress-circular
        indeterminate
        color="blue"
        size="50"
        class="mt-4"
      />
    </v-row>

    <v-alert
      v-if="!isLoading && products.length === 0"
      type="info"
      class="mt-4"
    >
      Keine Produkte in dieser Kategorie vorhanden.
    </v-alert>

    <v-dialog v-model="imageDialog" max-width="500">
      <v-card>
        <v-img :src="selectedImage" height="400" class="product-img" cover />
      </v-card>
    </v-dialog>

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
