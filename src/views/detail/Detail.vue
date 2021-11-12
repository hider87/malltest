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
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <div class="recommendInfo"><span>热门推荐</span></div>
      <GoodsList :goods="recommend"></GoodsList>
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
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail,Goods,Shop,Param,getRecommend} from "@/network/detail";
import {itemListenerMixin} from "@/common/mixin"




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
    DetailGoodsParam,
    DetailCommentInfo,
    GoodsList
  },
  data(){
    return{
      iid: null,
      topImages:[],
      goods: {},
      shop:{},
      goodsDetail:{},
      param: {},
      commentInfo: {},
      recommend: []
    }
  },
  mixins: [itemListenerMixin],
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

      // 评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
        console.log(this.commentInfo)
      }
    })

    getRecommend().then(res => {
      this.recommend = res.data.list;
      console.log(typeof  this.recommend)
    })
  },
  methods: {
    backClick(){
      this.$router.back()
    },
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  },
  destroyed() {
    this.$bus.$off("itemImage",this.itemListen);
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
  .recommendInfo span{
    position: relative;
    left: 5px;
  }
  .recommendInfo {
    margin-top: 3px;
    padding-bottom: 20px;
    padding-top: 20px;
    border-top: 2px solid rgba(0,0,0,.1);
  }
</style>
