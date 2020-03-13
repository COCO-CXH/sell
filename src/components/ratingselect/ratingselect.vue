<template>
    <div class="ratingselect">
      <div class="rating-type">
        <span @click="select(2, $event)" class="block positive" :class="{'active': selectType === 2}">{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
        <span @click="select(0, $event)" class="block positive" :class="{'active': selectType === 0}">{{ desc.positive }}<span class="count">{{ positives.length }}</span></span>
        <span @click="select(1, $event)" class="block negative" :class="{'active': selectType === 1}">{{ desc.negative }}<span class="count">{{ negative.length }}</span></span>
      </div>
      <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
        <i class="icon-check_circle"></i>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        // 这里存放数据
        return {};
    },
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    // 监听属性 类似于data概念
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return
        }
        // this.selectType = type
        this.$emit('ratingSelect', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
          return
        }
        // this.onlyContent = !this.onlyContent;
        this.$emit('contentToggle')
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
  .ratingselect
    .rating-type
      padding 0.72rem 0
      margin 0 0.72rem
      border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
      font-size 0
      .block
        display inline-block
        padding 0.32rem 0.48rem
        margin-right 0.32rem
        border-radius 0.04rem
        color rgb(77, 85, 93)
        font-size 0.48rem
        line-height 0.64rem
        &.active
          color #fff
        .count
          font-size 0.32rem
          margin-left 0.08rem
        &.positive
          background-color rgba(0, 160, 220, 0.2)
          &.active
            background-color rgb(0, 160, 220)
        &.negative
          background-color rgba(77, 85, 93, 0.2)
          &.active
            background-color rgb(77, 85, 93)
    .switch
      padding 0.48rem 0.72rem
      border-bottom 0.02rem solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 149)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        font-size 0.96rem
        vertical-align middle
        margin-right 0.16rem
        // line-height 0.96rem
      .text
        font-size 0.48rem
        vertical-align middle
        // line-height 0.96rem
</style>
