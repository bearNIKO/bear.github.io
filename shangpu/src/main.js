import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import axios from './utils/axios.js'
import VueAxios from 'vue-axios'
import vueLazyload from 'vue-lazyload'
import Mint from 'mint-ui'
import BScroll from 'better-scroll'

// 引入默认样式
import './style/base/base.css'
import './style/font/iconfont.css'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
// 将Bscroll 挂载到vue中
Vue.prototype.$BScroll = BScroll
// 将 axios 挂载到vue的原型上  组件继承实例,所以vue原型上的属性组件也有
// Vue.prototype.$axios = axios
// Vue.prototype.$LocalHost = 'https://bearbk.live/shangpu/'
Vue.prototype.$LocalHost = 'http://localhost:8082'
Vue.use(vueLazyload, {
  preLoad: 1.3,
  error: './assets/loading.gif',
  loading: './assets/loading.gif',
  attempt: 1
})
Vue.use(Mint)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
