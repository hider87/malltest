<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      observeDOM:true,
      click:true
    })
    console.log("Hhhhhhhh")
    // 监听滚动事件
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })

    // 监听上拉事件
    this.scroll.on('pullingUp',()=>{
      console.log('pullingUp')
      this.$emit("needMoreData")
      setTimeout(()=>{
        console.log("HHHHHHH")
        this.scroll.finishPullUp()
      },700)
    })
  },
  methods: {
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style scoped>

</style>
