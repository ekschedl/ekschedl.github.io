<template>
  <v-app class="d-flex flex-column min-h-screen">
    <!-- Header -->
    <AppHeader
      :isDark="isDark"
      :cartSidebar="cartSidebar"
      @toggleDrawer="drawer = !drawer"
      @update:dark="isDark = $event"
    />

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          link
          @click="drawer = false"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Warenkorb -->
    <CartSidebar ref="cartSidebar" />

    <!-- Inhalt + Footer -->
    <v-main class="d-flex flex-column flex-grow-1">
      <router-view class="flex-grow-1" />
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartSidebar from '@/components/CartSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const drawer = ref(false)
const cartSidebar = ref()
const isDark = ref(false)

const items = [
  { title: '🏠 Home', to: '/' },
  { title: '📝 Todo App', to: '/todo' },
  { title: '🛒 Shop', to: '/shop' },
  { title: '🛒 ShopPlatzi', to: '/shopplatzi' },
]
</script>
