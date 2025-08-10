<template>
  <v-container class="text-center mt-10">
    <h1 class="text-h3 font-weight-bold mb-4">Willkommen in meiner App 👋</h1>
    <p class="mb-6 text-grey-darken-1">Hier kannst du deine Aufgaben verwalten oder coole Produkte shoppen.</p>

    <v-row justify="center" class="mt-6" align="stretch" dense>
      <v-col cols="12" sm="8" md="4" lg="3">
        <v-card to="/todo" color="blue-lighten-5" flat class="pa-4 hoverable">
          <v-icon size="40" color="blue-darken-2">mdi-format-list-checkbox</v-icon>
          <div class="text-h6 mt-2">ToDo App öffnen</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="8" md="4" lg="3">
        <v-card to="/shop" color="green-lighten-5" flat class="pa-4 hoverable">
          <v-icon size="40" color="green-darken-2">mdi-cart</v-icon>
          <div class="text-h6 mt-2">Zum Shop gehen</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="8" md="4" lg="3">
        <v-card to="/shopplatzi" color="green-lighten-5" flat class="pa-4 hoverable">
          <v-icon size="40" color="green-darken-2">mdi-cart</v-icon>
          <div class="text-h6 mt-2">Zum ShopPlatzi gehen</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>
