import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// 应用入口
createApp(App).use(router).mount('#app')
