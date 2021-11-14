<template>
  <div class="detail" v-if="Object.keys(goods).length !== 0">
    <div class="descDetail">
      {{goods.desc}}
    </div>
    <div class="info-key">
      {{goods.detailImage[0].key}}
    </div>
    <div class="detailImage">
      <div v-for="item in goods.detailImage[0].list">
        <img :src="item" alt="" @load="imageLoad">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goods: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    imageLoad(){
      this.$emit('imageLoad')
    }
  }
}
</script>

<style scoped>
  .descDetail{
    font-size: 14px;
  }

  .detailImage img{
    width: 400px;
  }
  .info-key{
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
</style>
