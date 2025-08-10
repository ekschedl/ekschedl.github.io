import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerPlugins } from './plugins'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // NEU: Aufruf als Funktion!
app.use(pinia)

registerPlugins(app)
app.mount('#app')
