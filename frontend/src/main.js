import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from './router'

// Axios
import axios from "@/services/axiosApi";

// Vuetify
import vuetify from "@/plugins/vuetify";

/**
 * App
 * @type {App<Element>}
 */
const app = createApp(App)
app.config.globalProperties.$axios = axios;

app.use(router)
app.use(vuetify);

app.mount('#app')
