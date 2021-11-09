<template>
  <div  id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg">
      </div>
      <detail-nav-bar slot="center"></detail-nav-bar>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";

export default {
  name: "Detail",
  components: {
    NavBar,
    DetailNavBar
  },
  data(){
    return{
      iid: null
    }
  },
  created() {
    this.iid = this.$route.params.iid
    console.log(this.iid)
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
</style>
