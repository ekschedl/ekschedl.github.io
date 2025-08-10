<template>
  <v-navigation-drawer
    v-model="isOpen"
    location="right"
    width="400"
    temporary
  >
    <!-- Kopfzeile -->
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>
        <v-icon start class="text-h5">mdi-cart</v-icon>
        Warenkorb
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="isOpen = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider />

    <!-- Warenkorb-Liste -->
    <v-list v-if="cartItems.length" class="py-8 pl-4 pr-4">
      <v-list-item
        v-for="item in cartItems"
        :key="item.product.id"
        class="d-flex align-center mb-3"
      >
        <!-- Rechteckiges Bild ohne Avatar -->
        <v-img
          :src="item.product.image"
          width="100"
          height="100"
          class="cart-img"
          aspect-ratio="1"
          style="border-radius: 0;"
        />

        <!-- Infos -->
        <div class="flex-grow-1">
          <div class="font-weight-medium mb-1">{{ item.product.title }}</div>
          <div class="text-grey">
            {{ item.product.price.toFixed(2) }} € × {{ item.quantity }}
          </div>
        </div>

        <!-- Buttons -->
        <div class="d-flex align-center mb-2 mt-2">
          <v-btn icon size="small" @click="increase(item.product.id)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="decrease(item.product.id)">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="remove(item.product.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-list-item>
    </v-list>

    <!-- Wenn leer -->
    <v-card-text v-else class="text-center text-grey mt-8">
      🧺 Dein Warenkorb ist leer.
    </v-card-text>

    <v-divider class="my-4" />

    <!-- Gesamt -->
    <div class="cart-summary pl-5 pr-5">
      <v-card-text class="text-end">
        <strong class="text-h6">Gesamt: {{ total }} €</strong>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="green"
          variant="elevated"
          block
          @click="goToCheckout"
        >
          Zur Kasse
        </v-btn>
      </v-card-actions>
      <!-- Leeren -->
      <v-card-actions>
        <v-btn block color="red" variant="tonal" @click="clearCart">
          Warenkorb leeren
        </v-btn>
      </v-card-actions>
    </div>


  </v-navigation-drawer>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/stores/cart'

import { useRouter } from 'vue-router'
const router = useRouter()

const goToCheckout = () => {
  isOpen.value = false
  router.push('/checkout')
}
//  Zugriff auf den Cart-Store
const cart = useCartStore()

// Kontrolle, ob der Warenkorb geöffnet ist (wird vom App.vue gesteuert)
const isOpen = ref(false)
defineExpose({ isOpen }) // erlaubt App.vue Zugriff per ref

//  Die Produkte im Warenkorb
const cartItems = computed<CartItem[]>(() => cart.cartItems)

//  Gesamtpreis
const total = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)
)

//+ Produktmenge erhöhen
const increase = (id: number) => {
  const item = cartItems.value.find(i => i.product.id === id)
  if (item) cart.addToCart(item.product)
}

// - Produktmenge reduzieren
const decrease = (id: number) => {
  cart.removeFromCart(id)
}

// x löschen alle Einheiten
const remove = (id: number) => {
  const item = cartItems.value.find(i => i.product.id === id)
  if (item) {
    for (let i = 0; i < item.quantity; i++) {
      cart.removeFromCart(id)
    }
  }
}

//Alles entfernen
const clearCart = () => {
  cart.clearCart()
}
</script>

<style scoped>
.cart-img ::v-deep(.v-img__img),
.cart-img ::v-deep(.v-img__img--cover) {
  object-fit: contain !important;

}
</style>

