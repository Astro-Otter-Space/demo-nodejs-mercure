import './assets/main.css'
import 'vuetify/dist/vuetify.min.css';

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { createVuetify } from "vuetify";
const vuetify = createVuetify()


const app = createApp(App)
app.use(router)
app.use(vuetify);
app.mount('#app')
