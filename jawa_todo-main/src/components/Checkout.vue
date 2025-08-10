<template>
  <v-container class="mt-12">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="7" lg="5">
        <v-card elevation="3" class="pa-6 rounded-xl">

          <h2 class="text-h5 font-weight-bold mb-6 text-center">
            🧾 Zur Kasse
          </h2>

          <v-form @submit.prevent="submitOrder">
            <v-text-field
              v-model="name"
              label="👤 Name"
              placeholder="Max Mustermann"
              outlined
              required
              color="green"
              density="comfortable"
              class="mb-4"
            />

            <v-text-field
              v-model="address"
              label="🏠 Adresse"
              placeholder="Musterstraße 1, 12345 Stadt"
              outlined
              required
              color="green"
              density="comfortable"
              class="mb-4"
            />

            <v-text-field
              v-model="email"
              label="📧 E-Mail"
              type="email"
              placeholder="max@example.com"
              outlined
              required
              color="green"
              density="comfortable"
              class="mb-6"
            />

            <v-btn color="green" type="submit" block elevation="2" size="large">
              Bestellung abschicken
            </v-btn>
          </v-form>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const address = ref('')
const email = ref('')

const submitOrder = () => {
  alert(`✅ Danke, ${name.value}! Deine Bestellung wurde erfolgreich abgeschickt.`)
  // TODO: cart.clearCart()
}
</script>
