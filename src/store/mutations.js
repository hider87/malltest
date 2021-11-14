import {ADD_COUNTER,ADD_PRODUCT} from "@/store/mutations-types";

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每一个方法尽可能完成的事情比较单一
  [ADD_COUNTER](state,product){
    product.count ++;
  },

  [ADD_PRODUCT](state,product){
    state.cartList.push(product)
  }
}
