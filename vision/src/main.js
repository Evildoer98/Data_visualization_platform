import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import './assets/css/global.less'
// 引入字体文件
import './assets/font/iconfont.css'
// 引入websocket
import SocketService from '@/utils/socket_service'

import axios from 'axios'
// 对服务端进行websocket连接
SocketService.Instance.connect()
// 其他组件 this.$socket
Vue.prototype.$socket = SocketService.Instance

// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到Vue的原型对象上
// 使用this.$http
Vue.prototype.$http = axios

// 将全局的echarts对象挂载到Vue的原型对象上
// 在别的组件中 this.$echarts
Vue.prototype.$echarts = window.echarts

// 阻止显示生产模式的消息（当前阶段为开发模式）
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
