import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import vueFormCraft from 'vue-form-craft'
import { request } from '@/utils'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import extendElements from './extendElements'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const vue = createApp(App)

vue.use(pinia)
vue.use(router)
vue.use(ElementPlus, {
  locale: zhCn,
  request,
})
vue.use(vueFormCraft, {
  request,
  extendElements,
})


vue.mount('#app')
