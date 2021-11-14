<template>
  <div  id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg">
      </div>
      <detail-nav-bar slot="center" @itemClick="itemClick" ref="detailNav"></detail-nav-bar>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :goods="goodsDetail" @imageLoad="imageLoad"></detail-goods-info>
      <detail-goods-param :param-info="param" ref="param01"></detail-goods-param>
      <detail-comment-info :comment-info="commentInfo" ref="comment01"></detail-comment-info>
      <div class="recommendInfo" ><span>热门推荐</span></div>
      <GoodsList :goods="recommend" ref="recommend01"></GoodsList>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native ="backTop" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import {getDetail,Goods,Shop,Param,getRecommend} from "@/network/detail";
import {itemListenerMixin,backTopMixin} from "@/common/mixin"
import {debounce} from "@/common/utils";




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
    GoodsList,
    DetailBottomBar
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
      recommend: [],
      to:[],
      getTheme: null
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
  created() {
    this.iid = this.$route.params.iid
    console.log(this.iid)

    getDetail(this.iid).then(res=>{

      const data = res.result;

      this.topImages = data.itemInfo.topImages

      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.goodsDetail = data.detailInfo

      // 商品参数
      this.param = new Param(data.itemParams.info,data.itemParams.rule)

      // 评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(()=>{
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完。
        // this.to = []
        // this.to.push(0)
        // this.to.push(-1 * this.$refs.param01.$el.offsetTop + 44)
        // this.to.push(-1 * this.$refs.comment01.$el.offsetTop + 44)
        // this.to.push(-1 * this.$refs.recommend01.$el.offsetTop + 44 + 45)
      })
    })

    getRecommend().then(res => {
      this.recommend = res.data.list;
      console.log(typeof  this.recommend)
    })

    //下一帧
    this.$nextTick(()=>{

    })


    this.getTheme = debounce(()=> {
      this.to = []
      this.to.push(0)
      this.to.push(-1 * this.$refs.param01.$el.offsetTop + 44)
      this.to.push(-1 * this.$refs.comment01.$el.offsetTop + 44)
      this.to.push(-1 * this.$refs.recommend01.$el.offsetTop + 44 + 45)
    })
  },
  methods: {
    backClick(){
      this.$router.back()
    },
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getTheme()
    },
    // 点击图片就跳到对应的theme中
    itemClick(index){
      this.$refs.scroll.scrollTo(0,this.to[index],500)
    },
    scroll(position){
      // 判断的次数太多了
      this.$refs.scroll.refresh()
      if(position.y <= this.to[0] && position.y > this.to[1]){
        this.$refs.detailNav.currentIndex = 0;
      }else if(position.y <= this.to[1] && position.y > this.to[2]){
        this.$refs.detailNav.currentIndex = 1;
      }else if(position.y <= this.to[2] && position.y > this.to[3]){
        this.$refs.detailNav.currentIndex = 2;
      }else if(position.y <= this.to[3]){
        this.$refs.detailNav.currentIndex = 3;
      }
      this.listenShow(position)
    },
    addToCart(){
      const product = {}
      product.iid = this.iid;
      product.imgURL = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc;
      product.newPrice = this.goods.realPrice;
      this.$store.commit("addCart",product)
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
    height: calc(100vh - 44px - 58px);
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
