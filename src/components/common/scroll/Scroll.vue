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
      pullUpLoad:true,
      observeDOM:true,
      click:true
    })
    console.log("Hhhhhhhh")
    this.scroll.on('scroll',(position)=>{
      console.log(position)
    })
    this.scroll.on('pullingUp',()=>{
      console.log('pullingUp')
      this.scroll.finishPullUp()
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
