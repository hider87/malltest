<template>
  <div v-if="Object.keys(category).length !== 0">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <scroll class="content">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item :title="item.title"
                          v-for="item in this.category.data.category.list"
                          @click="change"></van-sidebar-item>
      </van-sidebar>
    </scroll>
  </div>
</template>

<script>

import Scroll from "@/components/common/scroll/Scroll";

import NavBar from "@/components/common/navbar/NavBar";

import Vue from "vue";
import {SidebarItem,Sidebar,Button} from 'vant'
import 'vant/lib/index.css';

Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Button)

// 请求数据
import {getCategory,getCategoryDetail,getSubcategory} from "@/network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll
  },
  data() {
    return {
      activeKey: 0,
      category:{},
      categories: [],
      categoryData: {},
      currentIndex: -1,
      type:['pop','new','sell']
    };
  },
  methods: {
    change(index){
      this.activeKey = index
    }
  },
  created() {
    getCategory().then(res=>{
      this.category = res
      // console.log(typeof res)

      this.categories = res.data.category.list
      // 2.初始化每个类别的子数据
      for (let i = 0; i < this.categories.length; i++) {
        this.categoryData[i] = {
          subcategories: {},
          categoryDetail: {
            'pop': [],
            'new': [],
            'sell': []
          }
        }
        getSubcategory(this.categories[i].maitKey).then(res=>{
            this.categoryData[i] = res.data
        })

        getCategoryDetail(this.categories[i].miniWallkey,'pop').then(res=>{
          // console.log(typeof res)

          this.categoryData[i].categoryDetail['pop'] = res
          this.categoryData = {...this.categoryData}
        })
      }
    })


    // for (let i = 0;i<this.categories.length;++i){
    //   console.log(this.categories[i])
    // }
  }
}
</script>

<style scoped>
* {
  touch-action: none;
}

.nav-bar {
  background-color: var(--color-tint);
}

.content {
  height: calc(100vh - 93px);
}
</style>
