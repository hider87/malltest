<template>
  <div class="cart">
    <NavBar class="cart-nav">
      <div slot="center" class="cart-bar">购物车({{getLength}})</div>
    </NavBar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList"
import Scroll from "@/components/common/scroll/Scroll";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import {mapGetters} from "vuex"

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  // 还是要多看文档
  computed: {
    ...mapGetters(['getLength'])
  },
  activated() {
    // 进入组件就进行刷新
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*font-weight: 800;*/
  }

  .content {
    height: calc(100vh - 93px - 40px );
    overflow: hidden;
  }
</style>
