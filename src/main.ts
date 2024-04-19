import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18next from 'i18next'
import i18nextVue from 'i18next-vue'
import en from './lang/en.json'
import App from './App.vue'
import router from './router'


i18next.init({
    resources : {
        en : en
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18nextVue, { i18next})

app.mount('#app')
