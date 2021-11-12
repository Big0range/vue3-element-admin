import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { directive } from '@/directive'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
// 样式初始化
import 'normalize.css'
// 全局样式
import '@/styles/index.scss' // global css
// 权限控制
import './permission'

//全局引入element-plus UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// // error log
// import './utils/error-log'

// // mock 模拟数据 不需要可以注释掉
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
const app = createApp(App)
// icon
import ElIcons from '@/icons'
app.component('svg-icon', SvgIcon)
ElIcons(app)
app.use(store).use(router).use(ElementPlus).use(directive).mount('#app')
