<!-- 轮播图组件 -->
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
// 循环轮播
      loop: {
        type: Boolean,
        default: true
      },
// 自动轮播
      autoPlay: {
        type: Boolean,
        default: true
      },
// 自动轮播间隔
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      // setTimeout(() => {
      //   this._setSliderWidth()
      //   this._initDots()
      //   this._initSlider()
      //   if (this.autoPlay) {
      //     this._play()
      //   }
      // }, 20)
      let length = this.$refs.sliderGroup.children.length
      const fecthChil = () => {
        window.setTimeout(() => {
          length = this.$refs.sliderGroup.children.length
          // console.log('.....', length)
          if (length <= 0) fecthChil()
          // const chi  = Array.from(this.$refs.sliderGroup.children)
          // console.log('233c', chi)
          this._setSliderWidth()
          this._initDots()
          this._initSlider()
          if (this.autoPlay) {
            this._play()
          }
        }, 300)
      }
      fecthChil()
// 监听窗口改变事件--优化
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
// 初始化slider之前，设置slider宽度
      _setSliderWidth(isResize) {
        // console.log(this.$refs.sliderGroup.children)
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          // console.log(this.children, 0)
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
// 初始化dots(轮播图小圆点)
      _initDots() {
        this.dots = new Array(this.children.length)
      },
// 初始化slider
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
// 自动轮播
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
// 组件销毁的时候，要清除定时器
    destroyed() {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>