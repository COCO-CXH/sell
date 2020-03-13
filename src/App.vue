<template>
  <div id="app">
    <!-- <router-view /> -->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path: '/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/seller'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from '../src/components/header/header';
// import { getSeller, getGoods, getRatings } from '@/api';
export default {
  name: 'App',
  data() {
    return {
      seller: [], // 商家
      goods: [], // 商品
      ratings: [] // 评论
    };
  },
  components: { 'v-header': header },
  methods: {
    getSeller() { // 获取商家信息
        // getSeller().then(res => {
        //   if (res.errno === 0) {
        //     console.log(res, 'seller')
        //     this.seller = res.data
        //   }
        // }).catch(reason => {
        //     console.error(reason);
        // });
        let data = require('../data.json')
        this.seller = data.seller
    },
    getGoods() { // 获取商品信息
        // getGoods().then(res => {
        //   if (res.errno === 0) {
        //     console.log(res, 'Goods')
        //     this.goods = res.data
        //   }
        // }).catch(reason => {
        //     console.error(reason);
        // });
    },
    getRatings() { // 获取评论信息
        // getRatings().then(res => {
        //   if (res.errno === 0) {
        //     console.log(res, 'Ratings')
        //     this.ratings = res.data
        //   }
        // }).catch(reason => {
        //     console.error(reason);
        // });
    }
  },
  mounted() {
    this.getSeller() // 加载时就请求商家信息
    // this.getGoods() // 加载时就请求商品信息
    // this.getRatings()
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
@import './common/stylus/index.styl';

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 1.6rem;
    line-height: 1.6rem;
    border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        font-size: 0.56rem;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
