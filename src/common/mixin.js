import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data(){
    return {
      itemListen: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh)
    let newRefresh = ()=>{
      refresh();
    }
    this.itemListen = newRefresh;
    this.$bus.$on('itemImageLoad',newRefresh)
    console.log("min")
  }
}
