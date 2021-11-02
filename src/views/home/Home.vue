<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
    <ul>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
      <li>hhhhhh</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import TabControl from "@/components/content/tabController/TabControl";

import {getHomeMultidata} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
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
      recommends: [],
      goods: {
        'pop': {page:0, list: []},
        'news': {page:0, list: []},
        'sell': {page:0, list: []}
      }
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
}

.home-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control{
  position: sticky;
  top: 44px;
}

</style>
