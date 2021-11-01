<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img slot="item-icon" src="../assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="../assets/img/tabbar/category_active.svg">
      <div slot="item-text">
        首页
      </div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="../assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="../assets/img/tabbar/category_active.svg">
      <div slot="item-text">
        首页
      </div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="../assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="../assets/img/tabbar/category_active.svg">
      <div slot="item-text">
        首页
      </div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="../assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="../assets/img/tabbar/category_active.svg">
      <div slot="item-text">
        首页
      </div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "./tabbar/TabBar";
import TabBarItem from "./tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>


<style scoped>

</style>
