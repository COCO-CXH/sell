<!--  -->
<template>
    <div class="shopcart-warpper">
      <div class="shopcart">
        <div class="content">
          <div class="content-left" @click="toggleList">
            <div class="logo-wrapper">
              <div class="logo" :class="{'highlight' : totalCount > 0}">
                <i class="icon-shopping_cart" :class="{'highlight' : totalCount > 0}"></i>
              </div>
              <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
            </div>
            <div class="price" :class="{'highlight' : totalPrice > 0}">￥{{ totalPrice }}</div>
            <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
          </div>
          <div class="content-right" @click="pay">
            <div class="pay" :class="payClass">
              {{ payDesc }}
            </div>
          </div>
          <div class="ball-container">
            <div v-for="(ball,index) of balls" :key="index">
              <transition @before-enter="handleBeforeEnter" v-on:enter="handleEnter" @after-enter="handleAfterEnter">
              <div class="ball" v-show="ball.show" v-bind:css="false"><!--外层盒子-->
                <div class="inner inner-hook"></div> <!--内层盒子-->
              </div>
              </transition>
            </div>
          </div>
          <transition name="fold">
          <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty()">清空</span>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li class="food" v-for="(food, index) in selectFoods" :key="index">
                  <span class="name">{{ food.name }}</span>
                  <div class="price">
                    <span>￥{{ food.price * food.count }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </transition>
        </div>
      </div>
      <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
      </transition>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import cartcontrol from '@/components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {cartcontrol},
    data() {
        // 这里存放数据
        return { // 使用balls存放5个小球，这些小球的默认状态都是不显示的
          balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
          dropBalls: [], // 用dropBalls来存放掉落的小球
          listShow: false,
          scroll:null
        }
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    // 监听属性 类似于data概念
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        });
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        });
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
           return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
           return `还差￥${this.minPrice - this.totalPrice}元起送`
        } else {
          return '立即结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
           return 'not-enough'
        } else {
           return 'enough'
        }
      }
    },
    // 监控data中的数据变化
    watch: {
      totalCount(newdata) {
        if (newdata === 0) {
          this.listShow = false
        }
      }
    },
    // 方法集合
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.listShow = !this.listShow
        if (this.listShow) {
          this.$nextTick(() => {
            if (this.scroll === null) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true, probeType: 3
              });
            } else {
              this.scroll.refresh()
            }
          });
        }
        // if (!this.totalCount) {
        //   return
        // }
        // this.fold = !this.fold
      },
      hideList() {
        this.listShow = false
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
        this.empty()
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      // 当触发drop方法时小球开始掉落
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) { // 遍历这5个小球
          let ball = this.balls[i]
          if (!ball.show) { // 当小球显示状态为隐藏时
            ball.show = true // 将这个小球的显示状态设置为true
            ball.el = el // 将cartControl传过来的对象挂载到ball的el属性上
            this.dropBalls.push(ball) // 将这个小球放入到dropBalls数组中
            return
          }
        }
      },
      handleBeforeEnter: function (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect() // getBoundingClientRect()获取小球相对于视窗的位置，屏幕左上角坐标为0，0
            let x = rect.left - 32 // 小球x方向位移= 小球距离屏幕左侧的距离-外层盒子距离水平的距离
            let y = -(window.innerHeight - rect.top - 22) // 负数，因为是从左上角向下
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)` // 设置外层盒子，即小球垂直方向的位移
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)` // 设置内层盒子，即小球水平方向的距离
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      // enter
      handleEnter: function (el, done) {
        /* eslint-disable no-unused-vars */
        // 触发浏览器重绘
        let rf = el.offsetHeight
        this.$nextTick(() => { // 让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0, 0, 0)'// 设置小球掉落后最终的位置
          el.style.transform = 'translate3d(0, 0, 0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0, 0, 0)'
          inner.style.transform = 'translate3d(0, 0, 0)'
          el.addEventListener('transitionend', done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。它可以是transitionend或 animationend
        })
      },
      handleAfterEnter: function (el) {
        let ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
        if (ball) {
        ball.show = false
        el.style.display = 'none'
        }
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
// @import url(); 引入公共css类
  .shopcart
    position fixed
    bottom 0px
    left 0px
    z-index 50
    width 100%
    height 1.92rem
    background-color #141d27
    .content
      display flex
      .content-left
        flex 1
        background-color #141d27
        .logo-wrapper
          display inline-block
          position relative
          top -0.4rem
          left 0.72rem
          margin 0 0.48rem
          padding 0.24rem
          width 2.24rem
          height 2.24rem
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background-color #141d27
          .num
            position absolute
            top 0
            right 0
            width 0.96rem
            height 0.64rem
            line-height 0.64rem
            text-align center
            border-radius 0.64rem
            font-size 0.36rem
            font-weight 700
            color #fff
            background-color rgb(240, 20, 20)
            box-shadow 0 0.16rem 0.32rem rgba(0, 0, 0, 0.4)
          .logo
            width 100%
            height 100%
            border-radius 50%
            background-color #2b343c
            text-align center
            &.highlight
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 0.96rem
              line-height 1.92rem
              color #80858a
              &.highlight
                color #fff
        .price
          display inline-block
          vertical-align top
          line-height 0.96rem
          margin-top 0.48rem
          padding-right 0.48rem
          box-sizing border-box
          border-right 0.04rem solid rgba(255, 255, 255, 0.1)
          font-size 0.64rem
          font-weight 700
          color rgba(255, 255, 255, 0.4)
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          line-height 0.96rem
          margin 0.48rem 0 0 0.48rem
          color rgba(255, 255, 255, 0.4)
          font-size 0.4rem
      .content-right
        flex 0 0 4.2rem
        width 4.2rem
        .pay
          height 1.92rem
          line-height 1.92rem
          color rgba(255, 255, 255, 0.4)
          font-weight 700
          font-size 0.48rem
          text-align center
          &.not-enough
            background-color #2b333b
          &.enough
            background-color #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 1.28rem
        bottom 0.88rem
        z-index 200
        transition all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 0.64rem
          height 0.64rem
          border-radius 50%
          background-color rgb(0, 160, 220)
          transition all .5s linear
    .shopcart-list
      position absolute
      top 0
      left 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0) //整个列表相对于当前自身的高度做一个偏移
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s linear
        transform translate3d(0, -100%, 0) //每个表项相对于当前自身的高度做一个偏移
      &.fold-enter, &.fold-leave-active
        transform translate3d(0, 0, 0)
      .list-header
        height 1.6rem
        line-height 1.6rem
        padding 0 0.72rem
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 0.56rem
          color rgb(7,17,27)
        .empty
          float right
          font-size 0.48rem
          color rgb(0,160,220)
      .list-content
        padding 0 0.72rem
        max-height 8.68rem
        overflow hidden
        background #ffffff
        .food
          position relative
          padding 0.48rem 0
          box-sizing border-box
          border-bottom 0.02rem solid rgba(7,17,27,0.1)
          .name
            line-height 0.96rem
            font-size 0.56rem
            color rgb(7,17,27)
          .price
            position absolute
            right 3.6rem
            bottom 0.48rem
            line-height 0.96rem
            font-size 0.56rem
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 0.24rem
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background-color rgba(7, 17, 27, 0.6)
    backdrop-filter blur(0.2rem)
    &.fade-enter-active, &.fade-leave-active
      transition: all .4s linear
    &.fade-enter, &.fade-leave-to
      opacity 0
      background-color rgba(7, 17, 27, 0)
</style>
