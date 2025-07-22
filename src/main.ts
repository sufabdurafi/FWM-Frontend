import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import api from '@/plugins/axios'

// Inisialisasi AOS
AOS.init()

const app = createApp(App)

// Tambahkan axios ke global properties
app.config.globalProperties.$http = api

// Gunakan Pinia untuk state management
const pinia = createPinia()
app.use(pinia)

// Gunakan router
app.use(router)

// Mount aplikasi
app.mount('#app')
