<!--  -->
<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img class="img-avatar" :src="seller.avatar" />
            </div>
            <div class="seller-info">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="description">
                    <span>{{ seller.description + '/' + seller.deliveryTime + '分钟送达' }}</span>
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon-cutDown decrease" :class="supportsType[seller.supports[0].type]"></span>
                    <span class="rule-cutDown">{{ seller.supports[0].description }}</span>
                </div>
                <div v-if="seller.supports" class="support-count" @click="showDetail()">
                    <span class="count">{{ seller.supports.length }}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail()">
            <span class="bulletin-title"></span><span class="bulletin-content">{{ seller.bulletin }}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" />
        </div>
        <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{ seller.name }}</h1>
                    <star :size="48" :score="seller.score "></star>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <div class="cutDownInfo">
                        <div class="cutDown" v-for="(item, index) in seller.supports" :key="index">
                            <span class="icon" :class="supportsType[item.type]"></span>
                            <span class="text">{{ item.description }}</span>
                        </div>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin-content">
                        {{ seller.bulletin }}
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="showDetail()">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import star from '@/components/star/star';

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {star},
    props: {
        seller: {
            type: [Array, Object],
            default() {
                return {};
            }
        }
    },
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
            detailShow: false
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        showDetail() {
            this.detailShow = !this.detailShow
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
@import '../../common/stylus/index.styl';
    .avatar
        margin-right 0.64rem
        img
            width 2.56rem
            height 2.56rem
            border-radius 0.08rem
// @import url(); 引入公共css类
    .header
        color #fff
        overflow hidden
        background-color rgba(7, 17, 27, 0.5)
        position relative
        .content-wrapper
            font-size 0
            padding 0.96rem 0.48rem 0.72rem 0.96rem
            display flex
            box-sizing border-box
            position relative
            .seller-info
                // line-height 1.5
                .title
                    margin-top 0.08rem
                    .brand
                        display inline-block
                        width 1.2rem
                        height 0.72rem
                        bg-image('images/brand')
                        background-size 100%
                        background-repeat no-repeat
                        vertical-align middle
                    .name
                        margin-left 0.24rem
                        font-size 0.64rem
                        font-weight bold
                        vertical-align middle
                .description
                    font-size 0.48rem
                    margin-top 0.32rem
                    margin-bottom 0.4rem
                .support
                    .icon-cutDown
                        display inline-block
                        margin-right 0.16rem
                        width 0.48rem
                        height 0.48rem
                        background-size 100%
                        background-repeat no-repeat
                        vertical-align middle
                    .rule-cutDown
                        font-size 0.4rem
                        vertical-align middle
                .support-count
                    position absolute
                    display block
                    right 0.48rem
                    bottom 0.56rem
                    height 0.96rem
                    line-height 0.96rem
                    padding 0 0.32rem
                    background-color rgba(0, 0, 0, 0.2)
                    border-radius 1rem
                    .count
                        font-size 0.4rem
                        margin-right 0.08rem
                        vertical-align middle
                    .icon-keyboard_arrow_right
                        color #fff
                        font-size 0.4rem
                        line-height 0.96rem
                        vertical-align middle
        .bulletin-wrapper
            height 1.12rem
            line-height 1.12rem
            padding 0 0.58rem
            background-color rgba(7, 17, 27, 0.2)
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            position relative
            font-size 0.4rem
            .bulletin-title
                display inline-block
                width 0.88rem
                height 0.48rem
                bg-image('./images/bulletin')
                background-size 100%
                vertical-align top
                margin-top 0.3rem
            .bulletin-content
                font-size 0.4rem
                margin 0 0.16rem
                vertical-align top
            .icon-keyboard_arrow_right
                position absolute
                color #fff
                font-size 0.4rem
                line-height 0.96rem
                right 0.4rem
                top 0.16rem
        .background
            width 100%
            height 100%
            position absolute
            top 0
            left 0
            z-index -1
            filter blur(0.2rem)
            img
                width 100%
                height 100%
        .detail
            position fixed
            z-index 100
            width 100%
            height 100%
            background-color rgba(7, 17, 27, 0.8)
            // filter blur(10px)
            overflow auto
            top 0
            left 0
            font-size 0.48rem
            line-height 0.96rem
            .detail-wrapper
                width 100%
                min-height 100%
                // margin-top 2.56rem
                // padding-bottom 2.56rem
                padding 2.56rem 10%
                box-sizing border-box
                // overflow-y auto
                .detail-main
                    .name
                        font-size 0.64rem
                        line-height 0.64rem
                        font-weight 700
                        text-align center
                        margin-bottom 0.64rem
                    .title
                        display flex
                        width 100%
                        margin 1.2rem auto 0.96rem auto
                        .line
                            flex 1
                            position relative
                            top -0.40rem
                            border-bottom 0.02rem solid rgba(255, 255, 255, 0.2)
                        .text
                            padding 0 0.48rem
                            font-size 0.60rem
                    .cutDownInfo
                        padding 0 0.48rem
                        .cutDown
                            margin-bottom 0.24rem
                            .icon
                                display inline-block
                                margin-right 0.24rem
                                width 0.64rem
                                height 0.64rem
                                background-size 100%
                                background-repeat no-repeat
                                vertical-align middle
                            .text
                                font-size 0.48rem
                                vertical-align middle
                    .bulletin-content
                        font-size 0.48rem
                        line-height 0.96rem
                        padding 0 0.48rem
            .detail-close
                position relative
                width 1.28rem
                height 1.28rem
                margin -2.56rem auto 0 auto
                clear both
                font-size 1.28rem
                color rgba(255, 255, 255, 0.5)
.decrease
    bg-image('images/decrease_1')
.discount
    bg-image('images/discount_1')
.guarantee
    bg-image('images/guarantee_1')
.invoice
    bg-image('images/invoice_1')
.special
    bg-image('images/special_1')
</style>
