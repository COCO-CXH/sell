<!--  -->
<template>
    <div class="ratings" ref="ratings">
      <div class="rating-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{ seller.score }}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
          </div>
          <div class="overview-right">
            <div class="score-warpper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{ seller.serviceScore }}</span>
            </div>
            <div class="score-warpper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{ seller.foodScore }}</span>
            </div>
            <div class="delivery-warpper">
              <span class="title">送达时间</span>
              <span class="delivery">{{ seller.deliveryTime }}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect @ratingSelect="ratingSelect" @contentToggle="contentToggle"
         :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
        <div class="rating-warpper">
          <ul>
            <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item">
              <div class="avatar">
                <img :src="rating.avatar" alt="">
              </div>
              <div class="content">
                <h1 class="name">{{ rating.username }}</h1>
                <div class="star-warpper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                </div>
                <p class="text">{{ rating.text }}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <!-- <span class="icon-thumb_up"></span> -->
                  <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                  <span class="item" v-for="(item, recommendIndex) in rating.recommend" :key="recommendIndex">{{ item }}</span>
                </div>
                <div class="time">
                  {{ rating.rateTime | formatDate }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import BScroll from 'better-scroll'
import star from '@/components/star/star';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect';
// import { getRatings } from '@/api';
import { formatDate } from 'common/js/date';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {star, split, ratingselect},
    data() {
        // 这里存放数据
        return {
          ratings: [],
          selectType: ALL,
          onlyContent: false,
          desc: {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        };
    },
    props: {
      seller: {
        type: [Object, Array],
        default() {
          return {}
        }
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
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      },
      ratingSelect(type) {
        this.selectType = type
      },
      contentToggle() {
        this.onlyContent = !this.onlyContent
      },
      getRatings() { // 获取评论信息
          // getRatings().then(res => {
          //   if (res.errno === 0) {
          //     console.log(res, 'Ratings')
          //     this.ratings = res.data
          //     this.$nextTick(() => {
          //       this.scorll = new BScroll(this.$refs.ratings, {
          //         click: true
          //       })
          //     })
          //   }
          // }).catch(reason => {
          //     console.error(reason);
          // });
          let data = require('../../../data.json')
          this.ratings = data.ratings
          this.$nextTick(() => {
              this.scorll = new BScroll(this.$refs.ratings, {
                click: true
              })
          })
      }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.getRatings()
    },
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
// @import url(); 引入公共css类
  .ratings
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .rating-content
      .overview
        display flex
        padding 18px 0
        .overview-left
          flex 0 0 137px
          padding 6px 0
          width 137px
          text-align center
          border-right 0.02rem solid rgba(7, 17, 27, 0.1)
          @media only screen and (max-width: 320px){
            flex 0 0 120px
            width 120px
          }
          .score
            padding-bottom 6px
            line-height 28px
            font-size 24px
            color rgb(255, 153, 0)
          .title
            margin-bottom 8px
            line-height 12px
            font-size 12px
            color rgb(7, 17, 27)
          .rank
            line-height 10px
            color rgb(147, 153, 159)
            font-size 10px
        .overview-right
          flex 1
          padding 6px 0 6px 24px
          @media only screen and (max-width: 320px){
            padding-left 6px
          }
          .score-warpper
            margin-bottom 8px
            font-size 0
            .title
              display inline-block
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            .star
              line-height 18px
              display inline-block
              margin 0 12px
              vertical-align top
            .score
              display inline-block
              line-height 18px
              font-size 12px
              color rgb(255, 153, 0)
          .delivery-warpper
            font-size 0
            .title
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            .delivery
              margin-left 12px
              line-height 18px
              font-size 12px
              color rgb(147, 153, 159)
      .rating-warpper
        padding 0 18px
        .rating-item
          display flex
          padding 18px 0
          border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
          .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            img
              width 28px
              height 28px
              border-radius 50%
          .content
            position relative
            flex 1
            .name
              margin-bottom 4px
              line-height 12px
              font-size 10px
              color rgb(7, 17, 27)
            .star-warpper
              margin-bottom 6px
              font-size 0
              .star
                display inline-block
                margin-right 6px
                vertical-align top
              .delivery
                display inline-block
                line-height 12px
                vertical-align top
                font-size 10px
                color rgb(147, 153, 159)
            .text
              margin-bottom 8px
              line-height 12px
              font-size 12px
              color rgb(7, 17, 27)
            .recommend
              line-height 16px
              font-size 0
              .icon-thumb_up,.item
                display inline-block
                margin 0 8px 4px 0
                font-size 9px
              .icon-thumb_up
                color rgb(0, 160, 220)
              // .icon-thumb_down
              //   color rgb(183, 187, 191)
              .item
                padding 0 6px
                border 0.02rem solid rgba(7, 17, 27, 0.1)
                border-radius 1px
                color rgb(147, 153, 159)
            .time
              position absolute
              right 0
              top 0
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
</style>
