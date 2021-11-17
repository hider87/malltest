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
      default: false
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .check {
    border-radius: 50%;
    border:3px solid #aaa
  }

  .active{
    background-color: red;
    border-color: red;
  }

</style>
