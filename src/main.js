/*
 * @Author: yingxin wang
 * @Date: 2023-05-04 22:14:54
 * @LastEditors: yingxin wang
 * @LastEditTime: 2023-05-06 15:49:04
 * @Description: 请填写简介
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import axios from './http'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueCookies from 'vue-cookies'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.config.globalProperties.$axios = axios
// app.config.headers["Access-Control-Allow-Origin"]="http://127.0.0.1:8080";

app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(VueCookies)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')


