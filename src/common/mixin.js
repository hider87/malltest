import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";

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
  }
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0,0);
    },
    listenShow(position){
      this.isShowBackTop = position.y < -2000?true:false
    }
  }
}
