<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer" />
    <v-toolbar-title>Menü</v-toolbar-title>
    <v-spacer />

    <!-- Darkmode -->
    <v-switch
      class="mr-3 mt-5"
      v-model="isDark"
      label="Darkmode"
      inset
      color="primary"
    />

    <!--Cart-Button -->
    <v-btn icon @click="openCart" class="mr-4">
      <v-badge
        :content="cartCount"
        :value="cartCount > 0"
        color="red"
        overlap
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref, watch, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  isDark: boolean
  cartSidebar: any
}>()

const emit = defineEmits<{
  (e: 'toggleDrawer'): void
  (e: 'update:dark', value: boolean): void
}>()

const theme = useTheme()
const isDark = ref(props.isDark)

watch(isDark, (val) => {
  theme.global.name.value = val ? 'dark' : 'myCustomTheme'
  emit('update:dark', val)
})

const toggleDrawer = () => {
  emit('toggleDrawer')
}

const openCart = () => {
  props.cartSidebar.isOpen = true
}

const cart = useCartStore()
const cartCount = computed(() =>
  cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
)
</script>

