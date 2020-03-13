<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{ seller.name }}</h1>
          <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{ seller.ratingCount }})</span>
            <span class="text">月售{{ seller.sellCount }}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{ seller.minPrice }}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{ seller.deliveryPrice }}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{ seller.deliveryTime }}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="mark($event)">
            <span class="icon-favorite" :class="{ 'active': favorite }"></span>
            <span class="text">{{ favoriteText }}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-warpper">
            <p class="content">{{ seller.bulletin }}</p>
          </div>
        </div>
        <div v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="supportsType[item.type]"></span>
            <span class="text">{{ item.description }}</span>
          </li>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-warpper" ref="picWarpper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="(pic, picIndex) in seller.pics" :key="picIndex">
                <img :src="pic" alt="" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商家信息</h1>
          <ul>
            <li class="info-item" v-for="(info, infoIndex) in seller.infos" :key="infoIndex">
              {{ info }}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import { formatDate } from 'common/js/date';
import split from '@/components/split/split';
import BScroll from 'better-scroll'
import star from '@/components/star/star';
// import Vue from 'vue';
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {star, split},
    data() {
        // 这里存放数据
        return {
          supportsType:
          [
            'decrease',
            'discount',
            'guarantee',
            'invoice',
            'special'
          ],
          favorite: false
        };
    },
    props: {
      seller: {
        type: [Array, Object],
        default() {
          return []
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
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    // 监控data中的数据变化
    watch: {
      seller() {
        this._initScorll()
        this._initPics()
      }
    },
    // 方法集合
    methods: {
      isTrue(str) {
        if (str === 'true') {
          return true
        } else {
          return false
        }
      },
      mark(event) {
        console.log(event)
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        console.log(this.favorite, 'this.favorite')
        localStorage.setItem('favorite', this.favorite)
      },
      _initScorll() {
        if (!this.scorll) {
          this.scorll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scorll.refresh()
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picWarpper, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            })
          console.log(this.picScroll)
          })
        }
      }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DsOM元素）
    mounted() {
      this._initScorll()
      this._initPics()
      this.favorite = this.isTrue(localStorage.getItem('favorite'))
    },
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
@import '../../common/stylus/mixin.styl';
// @import url(); 引入公共css类
  .seller
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .seller-content
      .overview
        padding 18px
        .title
          margin-bottom 8px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc
          padding-bottom 18px
          font-size 0
          border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
          .star
            display inline-block
            margin-right 8px
            vertical-align top
          .text
            display inline-block
            line-height 18px
            margin-right 12px
            vertical-align top
            font-size 10px
            color rgb(77, 85, 93)
        .remark
          display flex
          // border-top 0.02rem solid rgba(7, 17, 27, 0.1)
          .block
            flex 1
            margin-top 18px
            border-right 0.02rem solid rgba(7, 17, 27, 0.1)
            text-align center
            &:last-child
              border none
            h2
              margin-bottom 4px
              font-size 10px
              color rgb(147, 153, 159)
            .content
              line-height 24px
              font-size 10px
              color rga(7, 17, 27)
              .stress
                font-size 24px
        .favorite
          position absolute
          right 18px
          top 18px
          text-align center
          font-size 0
          .icon-favorite
            display block
            width 36px
            line-height 24px
            font-size 24px
            color #ccc
            margin-bottom 4px
            &.active
              color rgb(240, 20, 20)
          .text
            line-height 10px
            font-size 10px
            color rgb(77, 85, 93)
      .bulletin
        padding 18px 18px 0 18px
        .title
          margin-bottom 8px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .content-warpper
          padding 0px 12px 16px 12px
          border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
          .content
            line-height 24px
            font-size 12px
            color rgb(240, 20, 20)
      .supports
        padding 0 18px
        .support-item
          padding 16px 12px
          border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
          font-size 0
          &:last-child
            border none
          .icon
            display inline-block
            width 16px
            height 16px
            margin-right 6px
            background-size 100%
            background-repeat no-repeat
            vertical-align top
            &.decrease
              bg-image('images/decrease_4')
            &.discount
              bg-image('images/discount_4')
            &.guarantee
              bg-image('images/guarantee_4')
            &.invoice
              bg-image('images/invoice_4')
            &.special
              bg-image('images/special_4')
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
            vertical-align top
      .pics
        padding 18px
        .title
          margin-bottom 12px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .pic-warpper
          width 100%
          overflow hidden
          white-space nowrap
          .pic-list
            font-size 0
            .pic-item
              display inline-block
              margin-right 6px
              width 120px
              height 90px
              &:last-child
                margin-right 0
      .info
        padding 18px 18px 0 18px
        .title
          margin-bottom 12px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .info-item
          padding 16px 12px
          line-height 16px
          border-top 0.02rem solid rgba(7, 17, 27, 0.1)
          font-size 12px
          color rgb(7, 17, 27)
</style>
