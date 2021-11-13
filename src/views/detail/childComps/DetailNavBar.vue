<template>
  <div>
    <nav-bar>
      <div slot="center" class="title">
        <span v-for="(item,index) in titles" class="title-item"
             :class="{active:index === currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data(){
    return{
      titles: ['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex  = index
      this.$emit('itemClick',this.currentIndex)
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 16px;
  }

  .title-item{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }
</style>
