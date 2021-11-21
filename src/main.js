import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import toast from "@/components/common/toast"
import fastClick from "fastclick"

//外部框架
// import lazyload from "vue-lazyload"


import 'vant/lib/index.css';

Vue.config.productionTip = false

// 原型
Vue.prototype.$bus = new Vue()

Vue.use(toast)

// Vue.use(lazyload)

// 解决移动端的300ms问题
fastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
