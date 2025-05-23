import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// Optional: only if you use Bootstrap JS components like modal, dropdown, etc.
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initAxiosFromConfig, api } from './utils/axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const init = async () => {
  await initAxiosFromConfig()  // wait for config.json to load

  const app = createApp(App)

  app.config.globalProperties.$api = api
  app.use(createPinia())
  app.use(ElementPlus)
  app.use(router)

  app.mount('#app')
}

init()
