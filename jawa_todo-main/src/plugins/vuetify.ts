// plugins/vuetify.ts

// Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Core Vuetify
import { createVuetify } from 'vuetify'


// Icon Support
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const myCustomTheme = {
  dark: false, // Startet im Hellmodus
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#1976D2',
    secondary: '#424242',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})
