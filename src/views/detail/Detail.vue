<template>
  <div  id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg">
      </div>
      <detail-nav-bar slot="center"></detail-nav-bar>
    </nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";

import {getDetail,Goods,Shop} from "@/network/detail";



export default {
  name: "Detail",
  components: {
    DetailBaseInfo,
    NavBar,
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailShopInfo
  },
  data(){
    return{
      iid: null,
      topImages:[],
      goods: {},
      shop:{}
    }
  },
  created() {
    this.iid = this.$route.params.iid
    console.log(this.iid)

    getDetail(this.iid).then(res=>{
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      console.log(this.topImages[0])
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)


      console.log(this.goods)
    })
  },
  methods: {
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .back img{
    margin-top: 12px;
  }
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100vh - 44px);
  }
</style>
