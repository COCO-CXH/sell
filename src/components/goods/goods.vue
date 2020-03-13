<!--  -->
<template>
  <div class="goods-container">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)" ref="menuListItem">
            <span class="text">
              <span v-show="parseInt(item.type) > 0" :class="supportsType[item.type]" class="icon"></span>
               {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" class="foods-list food-list-hook">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li v-for="(food, foodIndex) in item.foods" :key="foodIndex" class="food-item" @click="selectFood(food, $event)">
                <div class="food-img">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span>月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now-price"><span class="unit">￥</span>{{ food.price }}</span>
                    <span v-show="food.oldPrice" class="old-price"><span class="unit">￥</span>{{ food.oldPrice }}</span>
                  </div>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @cart-add="handlecartAdd"></cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods" ref="shopCart"></shopcart>
    </div>
    <food :food="selectedFood" ref="food" @cart-add="handlecartAdd"></food>
  </div>
</template>

<script>
// import { getGoods } from '@/api';
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import food from '@/components/food/food';
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {shopcart, cartcontrol, food},
    data() {
        // 这里存放数据
        return {
          supportsType: [
              'decrease',
              'discount',
              'guarantee',
              'invoice',
              'special'
          ],
          goods: [],
          listHeight: [],
          menuItemHeight: 0,
          scrollY: 0,
          menuScrollY: 0,
          selectedFood: {}
        };
    },
    props: {
      seller: {
        type: [Array, Object]
      }
    },
    // 监听属性 类似于data概念
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            // 种类菜单跟随
            if ((i + 1) * this.menuItemHeight > this.$refs.menuWrapper.offsetHeight - 3 * this.menuItemHeight) {
              this.meunScroll.scrollToElement(this.$refs.menuListItem[i + 1], 300)
            } else if (this.$refs.menuListItem[i].clientHeight < this.menuItemHeight * 3) {
              this.meunScroll.scrollToElement(this.$refs.menuListItem[i - 1], 300)
            }
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        });
        return foods
      }
    },
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      _drop(target) {
        this.$nextTick(() => { // 使用$nextTick优化体验
          this.$refs.shopCart.drop(target) // 父组件goods通过.$refs属性访问shopCart子组件的drop方法
        })
      },
      handlecartAdd (target) { // 点击加号按钮触发事件
        this._drop(target) // 调用_drop方法
      },
      getGoods() { // 获取商品信息
          // getGoods().then(res => {
          //   if (res.errno === 0) {
          //     this.goods = res.data
          //     this.$nextTick(() => {
          //       this._initScroll()
          //       this._calculateHeight()
          //       this.menuItemHeight = this.$refs.menuListItem[1].offsetHeight
          //       console.log(this.menuItemHeight)
          //     })
          //   }
          // }).catch(reason => {
          //     console.error(reason);
          // });
          let data = require('../../../data.json')
          this.goods = data.goods
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
            this.menuItemHeight = this.$refs.menuListItem[1].offsetHeight
            // console.log(this.menuItemHeight)
          })
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true, probeType: 3
        });
        this.meunScroll.on('scroll', (pos) => {
          this.meunScrollY = Math.abs(Math.round(pos.y))
          // console.log(this.meunScrollY, 'meunScrollY')
          // console.log(this.$refs.menuWrapper.offsetHeight, 'menuWrapper')
          // console.log(this.menuItemHeight, 'menuItemHeight')
        });
        this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
          click: true, probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0;

        this.listHeight.push(height)

        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.getGoods() // 加载时就请求商品信息
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
@import '../../common/stylus/index.styl'
// @import url(); 引入公共css类 任然的《疑心病》
  .goods
    display flex
    position absolute
    top 6.96rem
    bottom 1.84rem
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 3.2rem
      width 3.2rem
      background-color #f3f5f7
      // overflow-y auto
      .menu-item
        display table
        width 3.2rem
        height 2.16rem
        // align-items center
        font-size 0.48rem
        line-height 0.56rem
        color rgb(147, 153, 159)
        padding 0 0.48rem
        // padding 0 0.48rem
        box-sizing border-box
        &.current
          position relative
          z-index 10
          margin-top 0.04rem;
          background-color #fff;
          color #000
          font-weight 700
          .text
            border-bottom none
    .foods-wrapper
      flex 1
      // overflow auto
      .title
        padding-left 0.56rem
        height 1.04rem
        background-color #f3f5f7
        border-left 0.06rem solid #d9dde1
        font-size 0.48rem
        color rgb(147, 153, 159)
        line-height 0.96rem
      .food-item
        font-size 0
        display flex
        margin 0.72rem
        position relative
        padding-bottom 0.72rem
        border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
        &:last-child
          padding-bottom 0
          border-bottom 0
        .food-img
          img
            width 3.2rem
            height 3.2rem
            margin-right 0.4rem
        .name
          font-size 0.56rem
          color rgb(7, 17, 27)
          line-height 0.56rem
          margin 0.08rem 0
        .desc, .extra
          font-size 0.4rem
          color rgb(147, 153, 159)
          line-height 0.6rem
          margin-top 0.32rem
          span
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
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 0
  .icon
    display inline-block
    width 0.48rem
    height 0.48rem
    background-size 100%
    background-repeat no-repeat
    vertical-align top
    &.decrease
        bg-image('images/decrease_3')
    &.discount
        bg-image('images/discount_3')
    &.guarantee
        bg-image('images/guarantee_3')
    &.invoice
        bg-image('images/invoice_3')
    &.special
        bg-image('images/special_3')
  .text
    width 2.24rem
    // height 2.16rem
    display table-cell
    border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
    vertical-align middle
</style>
