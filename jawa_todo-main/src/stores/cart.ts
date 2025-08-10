// store/cart.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 🔄 Gemeinsamer Typ – beide APIs werden abgedeckt
export interface Product {
  id: number
  title: string
  price: number
  image?: string           // Fakestore
  images?: string[]        // Platzi
  category: string | {     // Beides erlauben
    id: number
    name: string
    image: string
  }
}

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

  const addToCart = (product: Product) => {
    // Eindeutige Bild-URL herausholen (egal ob image oder images)
    const image = product.image ?? product.images?.[0] ?? ''

    // Kategorie-Name extrahieren
    const category = typeof product.category === 'string'
      ? product.category
      : product.category.name

    const existingItem = cartItems.value.find(item => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({
        product: {
          ...product,
          image,     // normalisiertes Bild
          category,  // normalisierte Kategorie
        },
        quantity: 1
      })
    }
  }

  const removeFromCart = (id: number) => {
    const index = cartItems.value.findIndex(item => item.product.id === id)
    if (index !== -1) {
      if (cartItems.value[index].quantity > 1) {
        cartItems.value[index].quantity--
      } else {
        cartItems.value.splice(index, 1)
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  }

}, {
  persist: true
})
