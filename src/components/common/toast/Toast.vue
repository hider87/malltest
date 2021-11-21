<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message,duration=1000){
      this.isShow = true
      this.message = message;
      setTimeout(()=>{
        this.isShow = false;
        this.message = ""
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    /*transform: translate(-50%,-50%);*/
    top: 50%;
    left: 35%;
    padding: 7px 10px;
    color: #fff;
    background-color: rgba(0,0,0,0.75);
    z-index: 99999;
  }
</style>
