<!--  -->
<template>
    <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now-price"><span class="unit">￥</span>{{ food.price }}</span>
            <span v-show="food.oldPrice" class="old-price"><span class="unit">￥</span>{{ food.oldPrice }}</span>
          </div>
          <div class="cartcontrol-warpper">
            <cartcontrol :food="food" @cart-add="handlecartAdd"></cartcontrol>
          </div>
          <transition name="fade">
          <div class="buy" v-show="!food.count || food.count === 0" @click="addcart($event)">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <div class="title">商品介绍</div>
          <p class="text">{{ food.info }}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType="selectType"  :onlyContent="onlyContent"
          :desc="desc" :ratings="food.ratings" @ratingSelect="changeType" @contentToggle="changeContent"></ratingselect>
          <div class="rating-warpper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, foodIndex) in food.ratings" :key="foodIndex" class="rating-item">
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img class="avatar" :src="rating.avatar" alt="">
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                  {{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
    </transition>
</template>

<script>

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect';
import Vue from 'vue'
import { formatDate } from 'common/js/date';
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {cartcontrol, split, ratingselect},
    data() {
        // 这里存放数据
        return {
          showFlag: false,
          scroll: null,
          selectType: ALL,
          onlyContent: false,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        };
    },
    props: {
        food: {
            type: Object
        }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
      changeType(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      changeContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      handlecartAdd() {
        this.$emit('cart-add', event.target)
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType;
        }
      },
      addcart(event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1);
        this.handlecartAdd()
      },
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (this.scroll === null) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false
      }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, // 生命周期 - 创建之前
    beforeMount() {}, // 生命周期 - 挂载之前
    beforeUpdate() {}, // 生命周期 - 更新之前
    updated() {}, // 生命周期 - 更新之后
    beforeDestroy() {}, // 生命周期 - 销毁之前
    destroyed() {}, // 生命周期 - 销毁完成
    activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl'
  .food
    position fixed
    left 0
    top 0
    bottom 1.92rem
    z-index 30
    width 100%
    background-color #fff
    &.move-enter-active, &.move-leave-active
      transition all .2s linear
    &.move-enter, &.move-leave-to
      transform translate3d(-100%, 0, 0)
    .food-content
      .image-header
        position relative
        width 100%
        height 0
        padding-top 100%
        img
          position absolute
          top  0
          left 0
          width 100%
          height 100%
        .back
          position absolute
          top 0.4rem
          left 0
          .icon-arrow_lift
            display block
            padding 0.4rem
            font-size 0.8rem
            color #fff
      .content
        position relative
        padding 0.72rem
        .title
          line-height 0.56rem
          margin-bottom 0.32rem
          font-size 0.56rem
          font-weight 700
          color rgb(7, 17, 27)
        .detail
          margin-bottom 0.72rem
          line-height 0.4rem
          height 0.4rem
          font-size 0
          .sell-count,.rating
            font-size 0.4rem
            color rgb(147, 153, 159)
            .sell-count
              margin-right 0.48rem
        .price
            font-size 0.56rem
            line-height 0.96rem
            color rgb(240, 20, 20)
            margin-top 0.2rem
            font-weight 700
            .now-price
                margin-right 0.32rem
            .unit
              font-size 0.4rem
              font-weight normal
            .old-price
              font-size 0.4rem
              color rgb(147, 153, 159)
              line-height 0.4rem
              font-weight 700
              text-decoration line-through
              .unit
                font-size 0.4rem
                font-weight normal
        .cartcontrol-warpper
          position absolute
          right 0.48rem
          bottom 0.48rem
        .buy
          position absolute
          right 0.72rem
          bottom 0.72rem
          z-index 10
          height 0.96rem
          line-height 0.96rem
          padding 0 0.48rem
          box-sizing border-box
          border-radius 0.48rem
          font-size 0.4rem
          background-color rgb(0, 160, 220)
          color #fff
          &.fade-enter-active, &.fade-leave-active
            transition all .8s
          &.fade-enter, &.fade-leave-to
            opacity 0
      .info
        padding 0.72rem
        .title
          margin-bottom 0.24rem
          line-height 0.56rem
          font-size 0.56rem
          color rgb(7, 17, 27)
        .text
          padding 0 0.32rem
          font-size 0.48rem
          color rgb(77, 85, 93)
          line-height 0.96rem
      .rating
        padding-top 0.72rem
        .title
          // margin-bottom 0.24rem
          margin-left 0.72rem
          line-height 0.56rem
          font-size 0.56rem
          color rgb(7, 17, 27)
        .rating-warpper
          padding 0 0.72rem
          .rating-item
            position relative
            padding 0.64rem 0
            border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
            .user
              position absolute
              right 0
              top 0.64rem
              line-height 0.48rem
              font-size 0
              .name
                display inline-block
                margin-right 0.24rem
                vertical-align top
                font-size 0.4rem
                color rgb(147, 153, 159)
              .avatar
                display inline-block
                width 0.48rem
                height 0.48rem
                border-radius 50%
            .time
              margin-bottom 0.24rem
              line-height 0.48rem
              font-size 0.4rem
              color rgb(147, 153, 159)
            .text
              font-size 0.48rem
              color rgb(7, 17, 27)
              line-height 1.28rem
              .icon-thumb_up, .icon-thumb_down
                font-size 0.48rem
                margin-right 0.16rem
                line-height 1.28rem
              .icon-thumb_up
                color rgb(0, 160, 220)
              .icon-thumb_down
                color rgb(147, 153, 159)
          .no-rating
            padding 0.72rem 0
            font-size 0.48rem
            color rgb(147, 153, 159)
</style>
