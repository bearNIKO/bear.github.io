<template  lang="html">
  <div class="container">
    <header class="header">
      <router-link to="/my" class="back iconfont">&#xe618;</router-link>
      <p class="title">新手帮助</p>
    </header>
    <div class="banner wrapper" ref="wrapper">
      <ul>
        <li v-for="(item, index) in images" :key="index">
          <img v-lazy="$LocalHost+`${item.img}`">
        </li>
        <div style="clear:both;"></div>
      </ul>
      <transition name="show">
        <div class="back iconfont" @click="backTop" v-if="show">
          &#xe621;
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      startY: 0,
      images: [
        { img: '/static/couponHelp/ant_01.jpg' },
        { img: '/static/couponHelp/ant_02.jpg' },
        { img: '/static/couponHelp/ant_03.jpg' },
        { img: '/static/couponHelp/ant_04.jpg' },
        { img: '/static/couponHelp/ant_05.jpg' },
        { img: '/static/couponHelp/ant_06.jpg' },
        { img: '/static/couponHelp/ant_07.jpg' }
      ]
    }
  },
  methods: {
    backTop () {
      this.scroll.scrollTo(0, 0, 1000, 'bounce')
    }
  },
  watch: {
    startY () {
      if (this.startY < 500) {
        this.show = false
      } else {
        this.show = true
      }
    }
  },
  created () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.scroll) {
        this.scroll = new this.$BScroll(this.$refs.wrapper, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          tap: true,
          mouseWheel: true,
          probeType: 3,
          momentum: true
        })
        this.scroll.on('scroll', (pos) => {
          this.startY = Math.abs(pos.y)
        })
      // console.log(this.scroll)
      } else if (!this.$refs.wrapper) {
        return false
      } else {
        this.scroll.refresh()
      }
    })
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/index.less';
.container {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #fff;
  .header {
    top: 0;
    position: fixed;
    z-index: 88;
    width: 100%;
    .h(53);
    overflow: hidden;
    background: -moz-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
    background: -webkit-gradient(linear,left top,left right,color-stop(0,#FA4DBE),color-stop(100%,#FBAA58));
    background: -webkit-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
    background: -o-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
    background: -ms-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
    background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%);
    border-bottom-color: transparent;
    .back {
      display: inline-block;
      .w(53);
      .h(53);
      text-align: center;
      .lh(53);
      .fs(24);
      color: #fff;
    }
    .title {
      display: inline-block;
      .h(53);
      .w(80);
      .lh(53);
      .fs(19);
      margin-left: 27%;
      color: #fff;
    }
  }
  .banner {
    position: absolute;
    .top(53);
    width: 100%;
    bottom: 0;
    overflow: hidden;
    ul {
      width: 100%;
      li {
        width: 100%;
        .h(600);
        img {
          width: 100%;
          .h(600);
        }
      }
    }
    .back {
      position: absolute;
      bottom: 5%;
      right: 5%;
      .fs(40);
    }
  }
}
.show-enter{
  opacity: 0;
}
.show-enter-to{
  opacity: 1;
}
.show-enter-active{
  transition: all 2s;
}
.show-leave{
  opacity: 1;
}
.show-leave-to{
  opacity: 0;
}
.show-leave-active{
  transition: all 2s;
}

</style>
