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
      // 找到的是旧的
      const sample = state.cartList.find((item)=>item.iid === product.iid);
      if(sample){
        sample.count += 1;
      }else{
        product.count = 1;
        state.cartList.push(product)
      }
    }
  },
  modules: {

  },
  actions: {

  }
})

// 挂载到Vue实例中
export default store
