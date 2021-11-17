<template>
  <div class="bottom-bar">
    <check-bottom class="check-all"
                  @click.native="checkAll"
                  :is-active="isActive"></check-bottom>
    <span>全选</span>
    <div class="totalPrice">合计: ¥{{totalPrice}}</div>
    <div class="toComputed">
      <div class="one">去计算({{computedTotal}})</div>
    </div>
  </div>
</template>

<script>

import CheckBottom from "@/components/content/checkBottom/CheckBottom";
import BackTop from "@/components/content/backTop/BackTop";

export default {
  name: "CartBottomBar",
  components: {
    BackTop,
    CheckBottom
  },
  computed:{
    totalPrice(){
      return this.$store.state.cartList.filter((item)=>{
        return item.checked
      }).reduce((preVal,item)=>{
        return preVal + item.newPrice * item.count;
      },0).toFixed(2)
    },
    computedTotal(){
      let count = 0;
      for (let val of this.$store.state.cartList){
        if (val.checked){
          count++;
        }
      }
      return count;
    },
    isActive(){
      if (this.$store.state.cartList.length === 0){
        return false;
      }
      for (let item of this.$store.state.cartList){
        if(!item.checked){
          this.isActive = false
          return false;
        }
      }
      this.active = true
      return true
    }
  },
  methods: {
    /**
     * 天才的操作的哈哈哈哈哈哈哈
     */
    checkAll(){
      if (this.isActive){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  data: {
    return: {
      active: false
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    /*bottom: 40px;*/
  }

  .check-all {
    height: 22px;
    margin-top:10px;
    margin-left: 5px;
  }

  .bottom-bar {
    display: flex;
  }

  .bottom-bar span {
    margin-top: 10px;
    padding: 3px;
  }

  .totalPrice {
    margin-left: 10px;
    margin-top: 12px;
  }

  .toComputed {
    background-color: red;
    /*position: relative;*/
    width: 100px;
    height: 100%;
    /*left: 149px;*/
    text-align: center;
    margin-left: auto;
  }


  .one {
    margin-top: 10px;
  }
</style>
