<template>
  <v-footer class="app-footer" color="grey-lighten-4" elevation="1">
    <v-container class="d-flex justify-center align-center pa-0 fill-height">
      <span class="footer-text">© {{ new Date().getFullYear() }} – App von Katja ✨</span>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-footer {
  min-height: 70px !important;
  max-height: 90px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

.footer-text {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.2;
  text-align: center;
}
</style>
