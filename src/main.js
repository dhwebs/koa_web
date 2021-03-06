import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Element from 'element-ui'
import utils from './utils/index.js'
console.log('工具类方法',utils)
Vue.prototype.$utils=utils
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$axios=axios
Vue.use(Element)
Vue.config.productionTip = false
Vue.directive('copy', {
  inserted (el, binding) {
    el.addEventListener('dblclick', () => {
      document.execCommand("Copy");
    })
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
