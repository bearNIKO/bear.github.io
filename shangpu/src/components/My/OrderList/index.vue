<template  lang="html">
  <div class="container">
    <header class="header">
      <router-link to="/my" class="back iconfont">&#xe618;</router-link>
      <p class="title">我的订单</p>
      <router-link to="/my/orderInfo" class="iconfont"><span>&#xe63c;</span></router-link>
    </header>
    <nav>
      <div class="hint" v-show="showText">
        <div class="swiper_group wrapper" ref="wrapper">
          <ul>
            <li>温馨提示：您4月份已确认收货的订单，相应积分会在本月25日左右，自动更新到您的积分账户，并显示在“我的积分”里。积分不会清零，请耐心等待哦  。感谢您的理解与支持！</li>
          </ul>
        </div>
        <div class="delete iconfont" @click="dTime">&#xe64b;</div>
      </div>
      <ul class="tab">
        <li :class="type == 1 ? 'active' : ''" @click="tabType(1)">全部</li>
        <li :class="type == -1 ? 'active' : ''" @click="tabType(-1)">待付款</li>
        <li :class="type == 2 ? 'active' : ''" @click="tabType(2)">已付款</li>
      </ul>
    </nav>
    <section class="orderList wrapper" ref="scrollY">
      <ul>
        <li v-for="(items, index) in orderList" :key=index>
          <div class="center" v-show="items.state == type||type == 1" @click="toOrderSearch(items.ID)">
            <div class="box">
              <h3 class="title">
                <img src="../images/lable-icon-02.png">自营店
                <span v-if="items.state == '-1'">待付款</span>
                <span v-if="items.state == '2'">已付款</span>
              </h3>
              <div class="good">
                <div class="img">
                  <img v-lazy="$LocalHost+items.images">
                </div>
                <div class="descs">
                  <div class="text">
                    <div class="title">
                      <span>
                        {{items.descs}}
                      </span>
                    </div>
                    <div class="type">
                      默认套餐
                    </div>
                  </div>
                </div>
                <div class="price">
                  <div class="price_money">￥{{items.price}}</div>
                  <div class="price_age">x{{items.allCount}}</div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <div class="error" v-if="!orderList.length">
          <img src="../images/download.png">
          <h3>你还没有相关的订单</h3>
          <p>可以去看看有哪些想买的</p>
          <router-link to="/odds" class="btn">随便逛逛</router-link>
        </div>
        <div class="like_lists" v-if="likeLists.length">
          <ul class="goods">
            <div class="head">
              <h3><img src="../images/like.png"></h3>
            </div>
            <li v-for="(item, index) in likeLists" :key=index @click="shopping(item.goodsID)">
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
        </div>
      </ul>
    </section>
  </div>
</template>

<script>
import QS from 'qs'
export default {
  data () {
    return {
      move: 10,
      removeTime: null,
      showText: true,
      type: 1,
      orderList: [],
      users: '',
      likeLists: []
    }
  },
  watch: {
    move () {
      if (this.move < -650) {
        this.move = 0
      }
      this.scroll.scrollTo(this.move, 0, 600, 'swipe')
    }
  },
  methods: {
    message (msg) {
      this.$toast({
        message: msg,
        position: 'middle',
        duration: 1000
      })
    },
    shopping (goodsID) {
      this.$router.push({ path: `/shopping/${goodsID}` })
    },
    dTime () {
      window.clearInterval(this.removeTime)
      this.showText = false
    },
    tabType (state) {
      this.message('Loading...')
      this.type = state
      this.$indicator.close()
    },
    toOrderSearch (ID) {
      this.$router.push({ path: `/my/orderInfo/info/${ID}` })
    },
    getOrderList (users) {
      if (!users) {
        this.message('请登入后重新提交')
        return false
      }
      const user = JSON.parse(users)
      if (!user.token || !user.name) {
        this.message('登入失效请重新登入')
        return false
      }
      const datas = {
        state: this.type,
        user: user.user,
        uemail: user.email
      }
      const token = 'Bear' + user.token
      this.axios({
        method: 'post',
        url: this.$LocalHost + '/orders/userOrderInfo',
        data: QS.stringify(datas),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: token
        }
      }).then(async (res) => {
        const success = await res.data
        if (success.err !== 0) {
          this.message(`提交失败${success.msg}`, 1000)
        } else {
          this.message(`${success.msg}`, 1000)
          this.orderList = success.data[0]
        }
      }).catch(() => {
        this.orderList = []
        this.message('服务器未响应请稍后再试')
      })
    }
  },
  created () {
    this.users = window.localStorage.getItem('users')
    this.getOrderList(this.users)
    this.axios({
      method: 'get',
      url: this.$LocalHost + '/nineWap/all'
    }).then(async (res) => {
      const success = await res.data
      if (success.err !== 0) {
        this.likeLists = []
        this.message(`获取失败${success.msg}`)
      } else {
        if (!success.data) {
          this.likeLists = []
          this.message('数据获取失败')
          return false
        }
        this.likeLists = success.data
      }
    }).catch(() => {
      this.message('服务器未响应请稍后再试')
    })
  },
  mounted () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.scroll) {
        this.scroll = new this.$BScroll(this.$refs.wrapper, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          tap: true,
          scrollX: true,
          scrollY: false,
          mouseWheel: true,
          probeType: 2,
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
      if (!this.scrollY) {
        this.scrollY = new this.$BScroll(this.$refs.scrollY, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          tap: true,
          scrollX: false,
          scrollY: true,
          mouseWheel: true,
          probeType: 2,
          momentum: true
        })
      } else if (!this.$refs.scrollY) {
        return false
      } else {
        this.scrollY.refresh()
      }
    })
    this.removeTime = setInterval(() => {
      this.move -= 50
    }, 1000)
  }
}

</script>

<style lang="less" scoped>
@import '../../../style/index.less';
.container {
  position: relative;
  .h(620);
  width: 100%;
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
    span {
      float: right;
      color: #fff;
      .mt(13);
      .mr(12);
      .fs(24);
    }
  }
  nav {
    .mb(20);
    background: #fff;
   .hint {
      width: 100%;
      .h(38);
      background: #ffefea;
      .pt(11);
      .pm(13);
      .pl(10);
      box-sizing: border-box;
      display: block;
      position: relative;
      z-index: 1;
      .delete {
        position: absolute;
        top: 25%;
        right: 4%;
        .fs(13);
        color: #999;
      }
      .swiper_group {
        width: 88%;
        .h(17);
        .fs(12);
        font-weight: 400;
        position: relative;
        z-index: 1;
        zoom: 1;
        color: #fe3a33;
        display: inline-block;
        overflow: hidden;
        ul {
          position: absolute;
          .h(17);
          li {
            display: inline-block;
            float: left;
            .h(17);
            white-space: nowrap;
            .mr(50);
          }
        }
      }
    }
    .tab {
      .h(40);
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        .h(40);
        .lh(40);
        box-sizing: border-box;
        .fs(14);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #9b9b9b;
      }
      .active {
        border-bottom: 2px solid #f9642b;
        color: #FE3A33;
        font-weight: 500;
      }
    }
  }
  .orderList {
    width: 95%;
    .h(500);
    .border(10);
    overflow: hidden;
    margin: 0 auto;
    background: #eee;
    ul {
      .pt(10);
      li {
        .center {
          .mb(10);
          .ml(10);
          .mr(10);
          .h(130);
          background: #fff;
          .border(10);
          .box {
            .ml(10);
            .mr(10);
            h3 {
              .h(30);
              .fs(14);
              .lh(30);
              color: rgb(51, 51, 51);
              font-weight: 380;
              vertical-align: middle;
              img {
                .w(28);
                .h(14);
                .mr(10);
                vertical-align:middle;
              }
              span {
                display: inline-block;
                float: right;
                color: red;
              }
            }
            .good {
              position: relative;
              display: block;
              .mt(5);
              .h(80);
              .img {
                position: relative;
                display: inline-block;
                flex-shrink: 0;
                flex-grow: 0;
                overflow: hidden;
                .h(80);
                .mr(12);
                .w(80);
                .border(5);
                background: #fff;
                place-self: flex-start;
                img {
                  .w(80);
                  .h(80);
                }
              }
              .descs {
                position: absolute;
                right: 0;
                top: 0;
                .w(225);
                height: 100%;
                .title {
                  .w(160);
                  .h(30);
                  color: rgb(51, 51, 51);
                  span {
                    .fs(12);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                }
                .type {
                  .w(160);
                  .h(32);
                  .lh(14);
                  background-color: rgb(250, 250, 250);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  .mt(5);
                  .pt(8);
                  .pl(8);
                  .mb(2);
                  .mr(3);
                  .fs(12);
                  overflow: hidden;
                  color: rgb(156, 156, 156);
                }
              }
              .price {
                float: right;
                .w(54);
                .h(90);
                .price_money {
                text-align: right;
                .fs(13);
                overflow: hidden;
                text-overflow: ellipsis;
                display:-webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color: rgb(51, 51, 51);
                }
                .price_age {
                  float: right;
                  color: rgb(153, 153, 153);
                  .fs(12);
                }
              }
            }
            .describe {
              .mt(10);
              ul {
                .ml(35);
                .h(44);
                .lh(44);
                color: rgb(51, 51, 51);
                .left {
                  float: left;
                  .fs(13);
                  span {
                    .ml(5);
                    color: rgb(153, 153, 153);
                  }
                }
                .right {
                  position: absolute;
                  .right(10);
                  vertical-align: middle;
                  span{
                    .mr(10);
                    vertical-align: middle;
                  }
                  i {
                    .fs(20);
                    color: #CCC;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
      .error {
        position: relative;
        width: 100%;
        .h(200);
        .mt(60);
        text-align: center;
        color: #333333;
        img {
          .w(80);
          .h(80);
        }
        h3 {
          .mt(10);
          .fs(16);
          font-weight: 350;
        }
        p {
          .mt(6);
          color: #999999;
          .fs(12);
        }
        .btn {
          position: absolute;
          .w(92);
          .h(32);
          .lh(32);
          background: red;
          bottom: 0;
          .right(130);
          .border(16);
          color: #ffffff;
          background-image: -webkit-linear-gradient(left, #fd9126, #ff5000);
          background-image: -o-linear-gradient(left, #fd9126, #ff5000);
          background-image: linear-gradient(to right, #fd9126, #ff5000);
        }
      }
      .like_lists {
        .mt(50);
        background: #fff;
        width: 100%;
        .border(10);
        .goods {
          width: 100%;
          .head {
            width: 100%;
            .h(40);
            text-align: center;
            background: url(../images/nine_tab_bg.svg) center center no-repeat #fff;
            h3 {
              width: 100%;
              height: 100%;
              img {
                .mt(5);
                .h(20);
              }
            }
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
                .h(170);
                width: 100%;
                display: block;
                overflow: hidden;
                position: relative;
                background: rgb(245, 245, 245);
                z-index: 1;
                zoom: 1;
              }
              .mar {
                .pt(20);
                .pm(10);
                .pl(6);
                .pr(6);
                box-sizing: border-box;
                .h(120);
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
                    background-image: url(../images/lable-icon-02.png);
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
                  .mt(12);
                  .price {
                    .fs(10);
                    margin-bottom: -1px;
                    font-weight: 400;
                    color: #666;
                    display: flex;
                    align-items: baseline;
                    vertical-align: text-bottom;
                    .ju {
                      background: url(../images/juhuasuan.png) center no-repeat;
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
                      .fs(16);
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
                  .label_box {
                    margin-right: 2px;
                    font-size: 14px;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    .h(20);
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
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    .h(20);
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
      }
    }
  }
}
</style>
