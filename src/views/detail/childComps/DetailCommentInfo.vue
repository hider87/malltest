<template>
  <div>
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-detail-other">
        <span>2018-08-09</span>
        <span class="span02">{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images">
      </div>
    </div>
  </div>
</template>

<script>


import {formatDate} from '@/common/utils'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value*1000);
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .header-title {
    float: left;
    font-size: 15px;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span {
    position: relative;
    top: -15px;
    padding: 10px;
    font-size: 15px;
  }

  .info-detail {
    font-size: 16px;
    margin-top: 8px;
    padding-left: 20px;
    margin-bottom: 20px;
    padding-bottom: 40px;
  }
  .info-detail span {
    font-size: 14px;
    color: #eb4868;
  }

  .info-detail-other {
    margin-top: 5px;
  }
  .span02 {
    position: relative;
    right: -5px;
  }

  .commentImages {
    display: flex;
  }

  .commentImages img{
    width: 40px;
  }


  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
