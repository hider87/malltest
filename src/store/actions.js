import {ADD_COUNTER,ADD_PRODUCT} from "@/store/mutations-types";

export default {
  addCart(context,product){
    // 找到的是旧的
    const sample = context.state.cartList.find((item)=>item.iid === product.iid);
    if(sample){
      context.commit(ADD_COUNTER,sample)
    }else{
      product.count = 1;
      context.commit(ADD_PRODUCT,product)
    }
  }
}
