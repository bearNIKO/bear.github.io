<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <div class="search" @click="toSearch">
        <a class="iconfont">&#xe63c;</a>
        <span>好宝贝 等你搜</span>
      </div>
    </header>
    <div class="head_box"></div>
    <div class="tab_left wrapper" ref="leftWrapper">
      <ul>
        <li v-for="(item, index) in Shopping" :Key=index :data-code=item.code :class="code == item.code ? 'active' : ''" @click="getProducts">{{item.name}}</li>
      </ul>
    </div>
    <section class="tab_right">
      <RightBox v-bind:datas="products" v-if="products"/>
      <div class="warning" v-if="!products">
        状态:404<span>-------</span>信息:获取不到数据
      </div>
    </section>
    <Footer class='footer'/>
  </div>
</template>

<script>
import Footer from '@/components/Footer/'
import RightBox from './RightBox/'
export default {
  data () {
    return {
      Shopping: [
        { id: 1, code: 25, name: '为你推荐', router: '/index/lay/25' },
        { id: 2, code: 26, name: '精品推荐', router: '/index/lay/26' },
        { id: 3, code: 27, name: '女装', router: '/index/lay/27' },
        { id: 4, code: 28, name: '男装', router: '/index/lay/28' },
        { id: 5, code: 29, name: '化妆', router: '/index/lay/29' },
        { id: 6, code: 30, name: '美食', router: '/index/lay/30' },
        { id: 7, code: 31, name: '居家用品', router: '/index/lay/31' },
        { id: 8, code: 32, name: '鞋品', router: '/index/lay/32' },
        { id: 9, code: 33, name: '数码家电', router: '/index/lay/33' },
        { id: 10, code: 34, name: '文娱车品', router: '/index/lay/34' },
        { id: 11, code: 35, name: '内衣', router: '/index/lay/35' },
        { id: 12, code: 36, name: '母婴', router: '/index/lay/36' },
        { id: 13, code: 37, name: '箱包', router: '/index/lay/37' },
        { id: 14, code: 38, name: '配饰', router: '/index/lay/38' },
        { id: 15, code: 39, name: '家装家纺', router: '/index/lay/39' },
        { id: 16, code: 40, name: '户外运动', router: '/index/lay/40' }
      ],
      products: null,
      code: 25
    }
  },
  name: 'classify',
  components: { Footer, RightBox },
  methods: {
    toSearch () {
      this.$router.push({ path: '/search' })
    },
    message (msg) {
      this.toastInstanse = this.$toast({
        message: msg,
        position: 'middle',
        duration: 600
      })
    },
    hisBack () {
      history.go(-1)
    },
    getProducts (e) {
      if (this.code === e.target.dataset.code) {
        this.message('请勿重复操作')
        return
      }
      this.code = e.target.dataset.code
      this.axios({
        method: 'get',
        url: this.$LocalHost + `/classify/${this.code}`
      }).then(async (res) => {
        const success = await res.data
        if (success.err !== 0) {
          this.products = null
          this.message(`获取失败${success.msg}`)
        } else {
          this.message(`${success.msg}`)
          this.products = success.data
        }
      }).catch(() => {
        this.message('服务器未响应请稍后再试')
      })
    }
  },
  created () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.scrollLeft) {
        this.scrollLeft = new this.$BScroll(this.$refs.leftWrapper, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          tap: true,
          mouseWheel: true
        })
      // console.log(this.scroll)
      } else if (!this.$refs.leftwrapper) {
        return false
      } else {
        this.scrollLeft.refresh()
      }
    })
    this.axios({
      method: 'get',
      url: this.$LocalHost + `/classify/${this.code}`
    }).then(async (res) => {
      const success = await res.data
      if (success.err !== 0) {
        this.products = null
        this.message(`获取失败${success.msg}`)
      } else {
        this.message(`${success.msg}`)
        this.products = success.data
      }
    }).catch(() => {
      this.message('服务器未响应请稍后再试')
    })
  }
}

</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container {
  position: fixed;
  top: 0;
  width: 100%;
  bottom: 0;
  .header {
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
      .w(50);
      .h(53);
      text-align: center;
      .lh(53);
      .fs(24);
      color: #fff;
    }
    .search {
      position: relative;
      float: right;
      .mt(10);
      .mr(25);
      .w(300);
      .h(33);
      .border(20);
      background: #fff;
      a {
        display: inline-block;
        .ml(5);
        .h(33);
        .w(25);
        .fs(24);
        .lh(33);
        background: 0 0;
        color: #ccc;
      }
      span {
        position: absolute;
        .fs(16);
        .top(5);
        background: 0 0;
        color: #ccc;
      }
    }
  }
  .head_box {
    width: 100%;
    .h(53);
  }
  .tab_left {
    position: absolute;
    .bottom(58);
    .top(53);
    left: 0;
    .w(75);
    overflow: hidden;
    ul {
      li {
        width: 100%;
        .h(45);
        .lh(45);
        text-align: center;
        .fs(14)
      }
      .active {
        background: #fff;
        color: #FC3F78;
        border-left: 2px solid #FC3F78;
      }
    }
  }
  .tab_right {
   position: absolute;
    .bottom(58);
    .top(53);
    right: 0;
    overflow: hidden;
    .w(300);
    background: #fff;
    .warning {
      width: 100%;
      height: 100%;
      background: #EEE;
      color: pink;
      .fs(18);
      text-align: center;
      .lh(555);
    }
  }
}
</style>
