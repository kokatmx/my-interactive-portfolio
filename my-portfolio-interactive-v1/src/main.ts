import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { vMagnetic } from './directives/v-magnetic'

createApp(App).directive('magnetic', vMagnetic).mount('#app')
