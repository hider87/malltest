export default {
  // 要加state不然会报错
  // 并且无法devtools无法跟踪状态的变化
  getLength(state){
    return state.cartList.length;
  },
  cartList(state){
    return state.cartList
  }
}
