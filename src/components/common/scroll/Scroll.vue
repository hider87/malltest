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
      observeImage:true,
      click:true,
      mouseWheel: true,//开启鼠标滚轮
      disableMouse: false,//启用鼠标拖动
      disableTouch: false,//启用手指触摸
      keepAlive:true
    })
    // 监听滚动事件
    if (this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
    }

    // 监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit("needMoreData")
        setTimeout(()=>{
          this.scroll.finishPullUp()
        },700)
      })
    }
  },
  methods: {
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
