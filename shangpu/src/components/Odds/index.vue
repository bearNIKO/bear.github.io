<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <p class="title">
        <img src="./images/nine_title.svg">
      </p>
      <span class="iconfont" @click="moveShow">&#xe611;</span>
    </header>
    <div class="head_box"></div>
    <nav>
      <transition name='arrow'>
        <div class="arrow" v-if="show"></div>
      </transition>
      <transition name='mask'>
        <ul class="mask" v-if="show">
          <router-link to="/index">
            <li>
              <span class="iconfont">&#xe637;</span>
              首页
            </li>
          </router-link>
          <router-link to="/search">
            <li>
              <span class="iconfont">&#xe639;</span>
              搜索
            </li>
          </router-link>
          <router-link to="/my/customer">
            <li>
              <span class="iconfont">&#xe723;</span>
              客服
            </li>
          </router-link>
          <router-link to="/my/feedBack">
            <li>
              <span class="iconfont">&#xe60c;</span>
              反馈
            </li>
          </router-link>
          <router-link to="/my">
            <li>
              <span class="iconfont">&#xe631;</span>
              我的
            </li>
          </router-link>
        </ul>
      </transition>
    </nav>
    <div class="nine_tab">
      <ul v-for="(item, index) in nine_tab" :key=index>
        <li v-for="(items, index) in item.data" :key=index @click="goHot">
          <h3 :class="items.class">{{items.title}}</h3>
          <p>{{items.text}}</p>
          <img v-lazy="items.imgUrl">
        </li>
      </ul>
    </div>
    <section class="product" ref="goodsReco">
      <div :class="fixed?'nav_tab_box':''"></div>
      <ul class="nav_tab wrapper" ref="navTab" :class="fixed ? 'tab_fixed' : ''">
        <div>
          <li v-for="(item, index) in nav_tab" :key=index>
            <span :class="code == item.code ? 'active' : ''" :data-code=item.code @click="search">
              {{item.title}}
              <a></a>
            </span>
          </li>
        </div>
      </ul>
      <ul class="hot" v-if='hots.length'>
        <li class="hot_items" v-for="(item, index) in hots" :key=index>
          <h3 class="nine_h3bt">
            <a></a>
            <span>{{item.title}}</span>
            <a></a>
          </h3>
          <div class="slide wrapper" ref="hotTab">
            <ul>
              <li v-for="(items, index) in item.datas" :key=index @click="goHot">
                <div class="swiper_cent">
                  <img v-lazy="$LocalHost+items.imgUrl">
                  <p class="text" v-show='items.age'>疯抢 {{items.age}} 件</p>
                </div>
                <p class="name">{{items.text}}</p>
                <p class="money">¥{{items.money}}</p>
              </li>
              <li class="shoppingbag" @click="goHot">
                <i></i>
                <span>共50件商品</span>
                <p></p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="goods" v-if='goods.length'>
        <div class="head">
          <h3>精品推荐</h3>
        </div>
        <li v-for="(item, index) in goods" :key=index @click="shopping(item.goodsID)">
          <div class="cent">
            <img v-lazy="$LocalHost+item.imgUrl">
            <div class="mar">
              <div>
                <h3 class="product_title">
                  <span class="labelTop tm"></span>
                  <span class="title_text">{{item.title}}</span>
                </h3>
              </div>
              <div class="product_info">
                <div class="price">
                  <span class="ju"></span>
                  <span>券后&nbsp;</span>
                  <span class="RMB">¥</span>
                  <span class="price_num">{{item.price}}</span>
                  <span class="red_bubble" v-if="item.limit">限时价<span class="triangle"></span></span>
                </div>
                <div class="label_box">
                  <span class="icon" v-if="item.label">{{item.label}}</span>
                  <span class="juan"><span>劵</span>{{item.juan}}元</span>
                </div>
                <div class="salse">
                  <span>已售{{item.oldsell}}万</span>
                  <a></a>
                  <span>评论{{item.comment}}万</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="error" v-if='!hots.length&&!goods.length'>
        404服务器数据获取失败请稍后从试！
      </div>
    </section>
    <transition name='back'>
    <div class="backTop iconfont" @click="backTop" v-show='backBox'>&#xe68a;</div>
    </transition>
    <Footer class='footer'/>
    <div class="bottom_box"></div>
  </div>
</template>

<script>
import Footer from '@/components/Footer/'
export default {
  data () {
    return {
      show: false,
      nine_tab: [
        {
          data: [
            { title: '9块9每日精选', class: 'Pink', text: '十元封顶', imgUrl: require('./images/01.jpg') },
            { title: '粽香四溢', class: 'Cyan', text: '传统味道', imgUrl: require('./images/02.jpg') },
            { title: '美妆必备', class: 'Purple', text: '"妆"出精致', imgUrl: require('./images/03.jpg') }
          ]
        },
        {
          data: [
            { title: '19.9元专区', class: 'red', text: '半价抢不停', imgUrl: require('./images/04.jpg') },
            { title: '驱蚊止痒', class: 'green', text: '不怕蚊虫', imgUrl: require('./images/05.jpg') },
            { title: '潮流T恤', class: 'Red', text: '清凉一夏', imgUrl: require('./images/06.jpg') }
          ]
        }
      ],
      code: 21,
      nav_tab: [
        { title: '精选', code: 21 },
        { title: '美食', code: 22 },
        { title: '居家百货', code: 23 },
        { title: '服装', code: 24 },
        { title: '美妆', code: 25 },
        { title: '配饰', code: 26 },
        { title: '数码配件', code: 27 },
        { title: '内衣', code: 28 },
        { title: '文品', code: 29 },
        { title: '箱包', code: 30 },
        { title: '母婴', code: 31 }
      ],
      hots: [],
      fixed: false,
      backBox: false,
      goods: [],
      goodsReco: 0
    }
  },
  components: { Footer },
  methods: {
    message (msg, time) {
      this.$toast({
        message: msg,
        position: 'middle',
        duration: time
      })
    },
    moveShow () {
      this.show = !this.show
    },
    search (e) {
      if (this.code === e.target.dataset.code) {
        this.message('请勿重复操作', 1000)
        return
      }
      window.scrollTo(0, this.goodsReco)
      this.code = e.target.dataset.code
      this.axios({
        method: 'get',
        url: this.$LocalHost + `/nineWap/${this.code}`
      }).then(async (res) => {
        const success = await res.data
        if (success.err !== 0) {
          this.hots = []
          this.goods = []
          this.message(`获取失败${success.msg}`, 1000)
        } else {
          if (!success.data.hots) {
            this.hots = []
          } else {
            this.hots = success.data.hots
          }
          if (!success.data.goods) {
            this.goods = []
            return false
          } else {
            this.goods = success.data.goods
          }
        }
      }).catch(() => {
        this.message('服务器未响应请稍后再试')
      })
    },
    goHot () {
      this.message('暂无', 1000)
    },
    backTop () {
      const nowTop = document.body.scrollTop || document.documentElement.scrollTop
      if (nowTop > 0) {
        window.requestAnimationFrame(this.backTop)
        window.scrollTo(0, nowTop - (nowTop / 5))
      }
    },
    hisBack () {
      history.go(-1)
    },
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 200) {
        this.fixed = true
      } else {
        this.fixed = false
      }
      if (scrollTop > 450) {
        this.backBox = true
      } else {
        this.backBox = false
      }
    },
    shopping (goodsID) {
      this.$router.push({ path: `/shopping/${goodsID}` })
    }
  },
  created () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.navTabs) {
        this.navTabs = new this.$BScroll(this.$refs.navTab, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          tap: true,
          scrollX: true,
          scrollY: false,
          mouseWheel: true,
          probeType: 3,
          momentum: true
        })
      // console.log(this.scroll)
      } else if (!this.$refs.navTab) {
        return false
      } else {
        this.navTabs.refresh()
      }
    })
    this.axios({
      method: 'get',
      url: this.$LocalHost + `/nineWap/${this.code}`
    }).then(async (res) => {
      const success = await res.data
      if (success.err !== 0) {
        this.hots = []
        this.message(`获取失败${success.msg}`)
      } else {
        if (!success.data.hots) {
          this.hots = []
          this.message('数据获取失败')
          return false
        } else {
          this.hots = success.data.hots
        }
        this.goods = success.data.goods
      }
    }).catch(() => {
      this.message('服务器未响应请稍后再试')
    })
  },
  mounted () {
    setTimeout(() => {
      this.goodsReco = this.$refs.goodsReco.getBoundingClientRect().top - 50
      window.addEventListener('scroll', this.handleScroll)
    }, 500)
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container {
  position: relative;
  width: 100%;
  background: #eee;
  .header {
    position: fixed;
    width: 100%;
    .h(53);
    z-index: 1000;
    overflow: hidden;
    background: linear-gradient(270deg,#fe3c35 0,#ff1f4c 100%);
    border-bottom-color: transparent;
    .back {
      float: left;
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
      float: left;
      .h(53);
      .w(80);
      .lh(53);
      .fs(19);
      margin-left: 30%;
      color: #fff;
      img {
        display: inlien-block;
        .w(60);
        .h(37);
        .mt(8);
      }
    }
    span {
      float: right;
      color: #fff;
      .mt(13);
      .mr(12);
      .fs(24);
    }
  }
  .head_box {
    width: 100%;
    .h(53);
  }
  .bottom_box {
    width: 100%;
    .h(58);
  }
  nav {
    position: fixed;
    z-index: 1111;
    right: 0;
    .arrow {
      position: absolute;
      .right(18);
      width: 0;
      height: 0;
      .arrow(7);
      border-top: none;
      top: 0;
      z-index: 9999;
    }
    .mask {
      position: absolute;
      z-index: 9999;
      .top(7);
      .right(5);
      .w(120);
      .h(230);
      .border(6);
      background: rgba(51,51,51,.9);
      li:active {
        background: rgba(100,255,255,.3);
      }
      li {
        width: 90%;
        .h(46);
        margin: 0 auto;
        text-align: center;
        .lh(46);
        color: #fff;
        .fs(15);
        border-bottom: solid 1px rgba(102,102,102,.9);
        span{
          .fs(18);
          .mr(5);
        }
      }
    }
  }
  .nine_tab {
    width: 100%;
    .mb(10);
    ul {
      display: flex;
      width: 100%;
      .h(95);
      background: red;
      li {
        flex: 1;
        position: relative;
        .h(95);
        background: #fff;
        h3 {
          position: relative;
          .pt(5);
          .pl(10);
          .pm(5);
          overflow: hidden;
          .h(22);
          .lh(21);
          .fs(15);
          .h(31);
          font-weight: 400;
          color: #FC4073;
          z-index: 10;
        }
        .Pink {
          background-image: -webkit-gradient(linear, left 20, right 0, from(#FF1493), to( #FF1493));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .Cyan {
          background-image: -webkit-gradient(linear, left 20, right 0, from( #4169E1), to(#6495ED));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .Purple {
          color: rgb(114, 11, 252);
        }
        .green {
          background-image: -webkit-gradient(linear, left 20, right 0, from(#8FBC8F), to( #8FBC8F));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .Red {
          background-image: -webkit-gradient(linear, left 20, right 0, from(#DC143C), to( #FF0000));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .red {
          color: rgb(253, 87, 92);
        }
        p {
          position: relative;
          z-index: 10;
          .top(5);
          color: #888;
          .fs(12);
          .pl(10);
          .lh(18);
          width: 100%;
          overflow: hidden;
          background-image: -webkit-gradient(linear, left 20, right 0, from(#A9A9A9), to( #A9A9A9));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        img {
          position: absolute;
          top: 0;
          width: 100%;
          .h(95);
        }
      }
      li:first-child {
        flex: 2
      }
    }
  }
  .nav_tab_box {
    width: 100%;
    .h(54);
  }
  .product {
    width: 100%;
    .nav_tab {
      .h(54);
      width: 100%;
      overflow: hidden;
      .lh(54);
      background: #fff;
      div {
        .w(700);
        height: 100%;
        li {
          float: left;
          display: inline-block;
          span {
            display: block;
            position: relative;
            z-index: 1;
            zoom: 1;
            .ml(15);
            .mr(15);
            .fs(14);
            text-align: center;
            .h(54);
            .lh(54);
            color: #333;
          }
          .active {
            color: #FC3F78;
            font-weight: 600;
            a{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              .h(3);
              .border(3);
              overflow: hidden;
              background: #FC3F78;
            }
          }
        }
      }
    }
    .tab_fixed {
      position: fixed;
      .top(53);
      z-index: 100;
    }
    .hot {
      width: 100%;
      .hot_items {
        width: 100%;
        .h(212);
        .mt(1);
        .nine_h3bt {
          .h(40);
          .lh(40);
          font-weight: 400;
          text-align: center;
          background: #fff;
          span {
            .top(-2);
            .pl(5);
            .pr(5);
            .fs(15);
            color: #FC436D;
          }
          a {
            display: inline-block;
            .w(20);
            .h(20);
            background: url(./images/nine_tab_left.svg) no-repeat;
          }
          a:first-child {
            background: url(./images/nine_tab_right.svg) no-repeat;
          }
        }
        .slide {
          width: 100%;
          .h(172);
          background: #fff;
          overflow: hidden;
          overflow-x: auto;
          ul {
            .h(166);
            padding-left: 10px;
            display: block;
            .w(1220);
            overflow-y: hidden;
            li {
              display: inline-block;
              float: none;
              margin-right: 10px;
              .h(166);
              .w(99.5);
              .swiper_cent {
                .h(116);
                width: 100%;
                .fs(0);
                img {
                  width: 100%;
                  .h(100);
                }
                p {
                  .border(2);
                  text-align: center;
                  background: #FFF3F3;
                  border: 1px solid #ffbdbf;
                  color: #fc4d52;
                  .fs(10);
                  .h(15);
                  .lh(14);
                  overflow: hidden;
                }
              }
              .name {
                font-size: 11px;
                .fs(11);
                .pt(5);
                .mb(5);
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                color: #666;
              }
              .money {
                color: #FF2B22;
                .fs(14);
                overflow: hidden;
                .mr(5);
                width: 100px;
                .w(100);
              }
            }
            .shoppingbag {
              position: relative;
              background: #FFF3F3;
              i {
                position: absolute;
                display: block;
                left: 25%;
                background: url(./images/nine_more_bag.png) center center no-repeat;
                background-size: auto 100%;
                .w(50);
                .h(40);
                .mt(45);
                .mb(25);
              }
              span {
                display: block;
                position: absolute;
                height: 22px;
                line-height: 22px;
                left: 10%;
                overflow: hidden;
                .top(90);
                .fs(12);
                text-align: center;
                color: #FC7D7D;
                width: 80%;
              }
              p {
                position: absolute;
                .w(26);
                .h(26);
                background: url(./images/nine_new.png) center center no-repeat;
                background-size: 100% auto;
                .top(115);
                left: 36%;
              }
            }
          }
        }
      }
    }
    .error {
      width: 100%;
      .h(300);
      text-align: center;
      .lh(300);
      .fs(16);
      background: #EEE;
      color: pink;
    }
    .goods {
      .mt(5);
      width: 100%;
      .head {
        width: 100%;
        .h(40);
        .lh(40);
        text-align: center;
        background: url(./images/nine_tab_bg.svg) center center no-repeat #fff;;
      }
      li {
        display: inline-block;
        width: 50%;
        .h(296);
        .cent {
          .ml(4);
          .mr(4);
          .mb(5);
          .border(5);
          background: #fff;
          overflow: hidden;
          img {
            .h(180);
            width: 100%;
            display: block;
            overflow: hidden;
            position: relative;
            background: rgb(245, 245, 245);
            z-index: 1;
            zoom: 1;
          }
          .mar {
            .pt(15);
            .pm(10);
            .pl(9);
            .pr(9);
            box-sizing: border-box;
            .h(111);
            margin: 0!important;
            display: flex;
            flex-direction: column;
            .product_title {
              .fs(13);
              font-weight: 400;
              color: #333;
              display: flex;
              white-space: nowrap;
              align-items: center;
              word-break: break-all;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              line-height: 1;
              .labelTop {
                .w(24);
                height: 13px;
                .h(13);
                .border(2);
                background-image: url(./images/lable-icon-02.png);
                display: inline-block;
                background-size: 23px 13px;
                background-repeat: no-repeat;
                background-position: center;
                margin-right: 2px;
              }
              .title_text {
                .w(110);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .product_info {
              .mt(20);
              .price {
                .fs(10);
                margin-bottom: -1px;
                font-weight: 400;
                color: #666;
                display: flex;
                align-items: baseline;
                vertical-align: text-bottom;
                .ju {
                  background: url(./images/juhuasuan.png) center no-repeat;
                  background-size: 100%;
                  .top(2);
                  .w(12);
                  .mr(3);
                  .h(12);
                  position: relative;
                  z-index: 1;
                  zoom: 1;
                }
                .RMB {
                  .fs(12);
                  .ml(1);
                  font-weight: 500;
                  color: #FF2B22;
                  margin-left: 1px;
                }
                .price_num {
                  .fs(19);
                  font-weight: 500;
                  color: #FF2B22;
                }
                .red_bubble {
                  position: relative;
                  z-index: 1;
                  zoom: 1;
                  .fs(9);
                  font-weight: 400;
                  color: #fff;
                  background: -webkit-linear-gradient(60deg, #fe3a33 0%, #fb8d2c 100%);
                  background: -o-linear-gradient(60deg, #fe3a33 0%, #fb8d2c 100%);
                  background: linear-gradient(150deg, #fe3a33 0%, #fb8d2c 100%);
                  line-height: 12px;
                  .lh(12);
                  .pl(3);
                  .pr(3);
                  .ml(5);
                  .h(12);
                  top: -2px;
                  display: inline-block;
                }
              }
            }
            .label_box {
              margin-right: 2px;
              font-size: 14px;
              .icon {
                .h(16);
                .border(2);
                border: 1px solid;
                .fs(9);
                font-weight: 400;
                color: #ff0137;
                .pl(3);
                .pr(3);
                .mr(5);
                display: inline-block;
                .lh(14);
                vertical-align: middle;
                border-color: rgba(245,114,36,.7);
                color: #F57223;
              }
              .juan {
                .h(14);
                background: -webkit-linear-gradient(left, #ff8873 0%, #ff4f4f 100%);
                background: -o-linear-gradient(left, #ff8873 0%, #ff4f4f 100%);
                background: linear-gradient(to right, #ff8873 0%, #ff4f4f 100%);
                .border(2);
                .pl(1);
                .pr(5);
                .fs(10);
                .lh(14);
                font-weight: 400;
                color: #fff;
                display: inline-block;
                vertical-align: middle;
                span {
                  background: #fff;
                  .border(2);
                  .fs(10);
                  color: #FE3A33;
                  .w(12);
                  .h(12);
                  .mr(5);
                  display: inline-block;
                  .lh(12);
                  text-align: center;
                }
              }
            }
            .salse {
              .fs(14);
              span {
                font-size: 10px;
                font-weight: 400;
                color: #888;
              }
              a {
                content: '';
                .w(1);
                background: #888;
                .mr(5);
                .ml(5);
                .h(8);
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
  .backTop {
    .w(30);
    .h(30);
    border-radius: 50%;
    position: fixed;
    .fs(16);
    color: #999;
    .lh(30);
    text-align: center;
    bottom: 10%;
    right: 3%;
    z-index: 1222;
    background: rgba(51,51,51,.8);
  }
}
.arrow-enter{
  opacity: 0;
  transform: translateX(100px);
}
.arrow-enter-to{
  opacity: 1;
  transform: translateX(0);
}
.arrow-enter-active{
  transition: all 0.8s;
}
.arrow-leave{
  opacity: 1;
}
.arrow-leave-to{
  opacity: 0;
}
.arrow-leave-active{
  transition: all 0.5s;
}
.mask-enter{
  opacity: 0;
  transform: translateX(150px);
}
.mask-enter-to{
  opacity: 1;
  transform: translateX(0);
}
.mask-enter-active{
  transition: all 1s;
}
.mask-leave{
  opacity: 1;
}
.mask-leave-to{
  opacity: 0;
}
.mask-leave-active{
  transition: all 0.5s;
}
.back-enter{
  opacity: 0;
  transform: translateY(200px);
}
.back-enter-to{
  opacity: 1;
  transform: translateY(0);
}
.back-enter-active{
  transition: all 1s;
}
.back-leave{
  opacity: 1;
}
.back-leave-to{
  opacity: 0;
  transform: translateY(0);
}
.back-leave-active{
  transition: all 1s;
  transform: translateY(200px);
}
</style>
