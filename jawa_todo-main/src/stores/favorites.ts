import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favoriteIds.value.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter(favId => favId !== id)
    } else {
      favoriteIds.value.push(id)
    }
    saveToStorage()
  }

  const isFavorite = (id: number): boolean => favoriteIds.value.includes(id)

  const loadFromStorage = () => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      favoriteIds.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
  }

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    loadFromStorage
  }
})
