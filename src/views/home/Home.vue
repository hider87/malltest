<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>

    <tab-control class="tab-control2" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
            @needMoreData="needMoreData(currentType)" :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="imageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native ="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import TabControl from "@/components/content/tabController/TabControl";

import GoodsList from "@/components/content/goods/GoodsList";
import GoodsListItem from "@/components/content/goods/GoodsListItem";

import {getHomeMultidata,getHomeGoods} from "@/network/home";

import {itemListenerMixin} from "@/common/mixin"

import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop
  },created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  mixins: [itemListenerMixin],
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh)
    // this.$bus.$on('itemImageLoad',()=>{
    //   refresh();
    // })
    // 所有的组件都有一个属性$el:用于获取组件中的元素
  },
  methods: {
    imageLoad(){
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
    },
    getHomeMultidata(){
      // 请求多个数据
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list,
          this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page +=1;
      })
    },
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl2.currentIndex = index
      this.$refs.tabControl1.currentIndex = index

    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0);
    },
    contentScroll(position){
      this.isShowBackTop = position.y < -2000?true:false

      //  决定tabController是否吸顶(position:fixed)

      this.isTabFixed = ((-position.y) +1 * this.$refs.tabControl2.$el.clientHeight)> this.tabOffSetTop
    },
    needMoreData(currentType){
      this.getHomeGoods(currentType)
    }
  },
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY:0,

    }
  },
  // activated() {
  //   this.$refs.scroll.refresh()
  //   this.$refs.scroll.scrollTo(0,this.saveY,0);
  //   console.log('activated')
  // },
  // deactivated() {
  //   this.saveY = this.$refs.scroll.scroll.y;
  //   console.log(this.saveY = this.$refs.scroll.scroll.y);
  //   console.log("deactivated")
  // }
  deactivated() {
    // this.$bus.$off("imageLoad",this.newRefresh);
    this.$bus.$off("imageLoad",this.itemListen)
    console.log("hhhhhhh")
  }
}

</script>

<style scoped>

#home{
  /*padding-top: 44px;*/
  height: 100vh;
}

.home-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content{
  height: calc(100vh - 93px);
  overflow: hidden;
}

</style>
