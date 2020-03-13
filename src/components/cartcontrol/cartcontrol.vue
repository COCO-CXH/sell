<!--  -->
<template>
    <div class="cartconcontrol">
      <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
      </transition>
      <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Vue from 'vue'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        // 这里存放数据
        return {};
    },
    props: {
      food: {
        type: Object
      }
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
          // this.food.count = 1
        } else {
          this.food.count++
        }
        this.$emit('cart-add', event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        console.log(this.food)
        if (this.food.count) {
          this.food.count--
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
  .cartconcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 0.24rem
      .inner
        line-height 0.96rem
        color rgb(0, 169, 220)
        font-size 0.96rem
      &.move-enter-active, &.move-leave-active
        transition all .4s linear
      &.move-enter, &.move-leave-to
        transform translate3d(0.96rem,0,0) rotate(90deg)
        opacity 0
    .cart-count
      display inline-block
      text-align center
      padding-top 0.24rem
      font-size 0.4rem
      color rgb(147, 153, 159)
      line-height 0.96rem
      vertical-align top
    .cart-add
      display inline-block
      padding 0.24rem
      line-height 0.96rem
      color rgb(0, 169, 220)
      font-size 0.96rem
// @import url(); 引入公共css类

</style>
