import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// Configure axios defaults
axios.defaults.baseURL = '/api'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add authorization token to requests
axios.interceptors.request.use((config) => {
    const token = store.state.auth.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
