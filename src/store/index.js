import Vue from "vue";
import Vuex from "vuex"

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state,product){
      state.cartList.push(product)
    }
  },
  modules: {

  },
  actions: {

  }
})

// 挂载到Vue实例中
export default store
