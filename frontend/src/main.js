import './assets/main.css'
import 'vuetify/dist/vuetify.min.css';

import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from './router'

// Axios
import axios from "@/services/axiosApi";

// Vuetify
import { createVuetify } from "vuetify";
const vuetify = createVuetify()

/**
 * App
 * @type {App<Element>}
 */
const app = createApp(App)
app.config.globalProperties.$axios = axios;

app.use(router)
app.use(vuetify);

app.mount('#app')
