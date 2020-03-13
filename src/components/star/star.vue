<!--  -->
<template>
    <div class="star" :class="starType">
        <span v-for="( itemClass, index ) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data() {
        // 这里存放数据
        return {};
    },
    // 监听属性 类似于data概念
    computed: {
        starType() {
          return 'star-' + this.size
        },
        itemClasses() {
          let result = []
          let score = Math.floor(this.score * 2) / 2
          let hasDecimal = score % 1 !== 0
          let integer = Math.floor(score)
          for (let i = 0; i < integer; i++) {
            result.push(CLS_ON);
          }
          if (hasDecimal) {
            result.push(CLS_HALF);
          }
          while (result.length < LENGTH) {
            result.push(CLS_OFF);
          }
          // console.log(result)
          return result
        }
    },
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {},
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
@import '~common/stylus/index.styl'
// @import url(); 引入公共css类
    .star
      text-align center
      font-size 0
      .star-item
        display inline-block
        background-repeat no-repeat
      &.star-24
        .star-item
          width 0.4rem
          height 0.4rem
          margin-right 0.12rem
          background-size 100%
          &:last-child
            margin-right 0
          &.on
            bg-image('images/star24_on')
          &.half
            bg-image('images/star24_half')
          &.off
            bg-image('images/star24_off')
      &.star-36
        .star-item
          width 0.6rem
          height 0.6rem
          margin-right 0.24rem
          background-size 100%
          &:last-child
            margin-right 0
          &.on
            bg-image('images/star36_on')
          &.half
            bg-image('images/star36_half')
          &.off
            bg-image('images/star36_off')
      &.star-48
        .star-item
          width 0.8rem
          height 0.8rem
          margin-right 0.88rem
          background-size 100%
          &:last-child
            margin-right 0
          &.on
            bg-image('images/star48_on')
          &.half
            bg-image('images/star48_half')
          &.off
            bg-image('images/star48_off')
</style>
