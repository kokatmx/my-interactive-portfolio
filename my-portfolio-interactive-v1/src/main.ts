import { createApp } from 'vue'
import { createPinia } from 'pinia'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import App from './App.vue'
import router from './router'
import { vMagnetic } from './directives/v-magnetic'
import './index.css'

// Register GSAP plugins globally (once)
gsap.registerPlugin(ScrollTrigger)

// Create app instance
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

// Register directives
app.directive('magnetic', vMagnetic)

// Mount
app.mount('#app')
