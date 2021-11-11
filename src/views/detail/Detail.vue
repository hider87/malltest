<template>
  <div  id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg">
      </div>
      <detail-nav-bar slot="center"></detail-nav-bar>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :goods="goodsDetail" @imageLoad="imageLoad"></detail-goods-info>
      <detail-goods-param :param-info="param"></detail-goods-param>
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
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailGoodsParam from "@/views/detail/childComps/DetailGoodsParam";

import {getDetail,Goods,Shop,Param} from "@/network/detail";



export default {
  name: "Detail",
  components: {
    DetailBaseInfo,
    NavBar,
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParam
  },
  data(){
    return{
      iid: null,
      topImages:[],
      goods: {},
      shop:{},
      goodsDetail:{},
      param: {}
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

      this.goodsDetail = data.detailInfo

      // 商品参数
      this.param = new Param(data.itemParams.info,data.itemParams.rule)


      // console.log(data.itemParams.info)
      console.log(data.itemParams.tables[0])

      // console.log(this.goodsDetail)
      //
      // console.log(this.goods)
    })
  },
  methods: {
    backClick(){
      this.$router.back()
    },
    imageLoad(){
      this.$refs.scroll.refresh()
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
