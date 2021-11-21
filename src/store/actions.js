import {ADD_COUNTER,ADD_PRODUCT} from "@/store/mutations-types";

export default {
  addCart(context,product){
    return new Promise((resolve, reject)=>{
      // 找到的是旧的
      const sample = context.state.cartList.find((item)=>item.iid === product.iid);
      if(sample){
        context.commit(ADD_COUNTER,sample)
        resolve('添加数量')
      }
      else{
        product.count = 1;
        context.commit(ADD_PRODUCT,product)
        resolve('添加商品')
      }
    })
  }
}
