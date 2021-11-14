import Vue from "vue";
import Vuex from "vuex"
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 挂载到Vue实例中
export default store
