import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from '@/router'
import 'bulma/css/bulma.css'
import '@/assets/styles/styles.scss'

const pinia = createPinia()
const app = createApp(App)
const head = createHead()

app.use(head)
app.use(pinia)
app.use(router)
app.mount('#app')
