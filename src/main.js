import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import VForm3 from 'vform3-builds'
import 'vform3-builds/dist/designer.style.css'
import echarts from 'echarts'

import '@/assets/css/global.css'

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(store).use(router).use(ElementPlus, {locale: zhCn}).use(VForm3).mount('#app')
