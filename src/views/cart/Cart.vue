<template>
  <div class="cart">
    <NavBar class="cart-nav">
      <div slot="center" class="cart-bar">购物车({{getLength}})</div>
    </NavBar>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import {mapGetters} from "vuex"

export default {
  name: "Cart",
  components:{
    NavBar
  },
  // 还是要多看文档
  computed: {
    ...mapGetters(['getLength'])
  }
}
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*font-weight: 800;*/
  }
</style>
