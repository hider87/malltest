<template>
  <div class="check" :class="{active: isActive}">
    <img src="@/assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name: "CheckBottom",
  props: {
    isActive: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .check {
    background-color: red;
    border-radius: 50%;
    border:3px solid #aaa
  }

  .active{
    border-color: red;
  }

</style>
