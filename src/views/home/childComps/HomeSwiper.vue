<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper"

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: Array,
    default(){
      return []
    }
  },
  methods: {
    imageLoad() {
      if (this.isLoad) {
        this.isLoad = false;
        this.$emit('swiperImageLoad')
        console.log("------")
      }
    }
  },
  data(){
    return {
      isLoad: true
    }
  }
}
</script>

<style scoped>

</style>
