import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Todo from "@/pages/todo.vue";
import Shop from "@/pages/shop.vue";
import ShopPlatzi from "@/components/ShopPlatzi.vue";
import Checkout from "@/components/Checkout.vue";

const routes = [
  {path: '/', component: Index},
  {path: '/todo', component: Todo},
  {path: '/shop', component: Shop},
  {path: '/shopplatzi', component: ShopPlatzi},
  {path: '/checkout', component: Checkout},


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
