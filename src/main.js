import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import BiliApp from './BiliApp.vue'


const pinia = createPinia()
pinia.use(piniaPersist)

// import router from './router'

const app = createApp(BiliApp)

app.use(pinia)
// app.use(router)

app.mount('#app')