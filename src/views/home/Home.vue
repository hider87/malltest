<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultidata} from "@/network/home";
import {Swiper,SwiperItem} from "@/components/common/swiper"

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem
  },created() {
    // 请求多个数据
    getHomeMultidata().then(res =>{
      console.log(res)
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list;
    })
  },
  data(){
    return {
      banners: [],
      recommends: []
    }
  }
}
</script>

<style scoped>

.home-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
}

</style>
