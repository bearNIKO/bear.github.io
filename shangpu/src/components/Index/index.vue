<template  lang="html">
  <div class="container">
    <header class="header">
      <div class="search" @click="toSearch">
        <a class="iconfont">&#xe63c;</a>
        <span>好宝贝 等你搜</span>
      </div>
      <div class="msg" @click="alertMsg">
         <div class="sigin">
           <img src="./images/sigin.gif">
         </div>
         <div class="header_info" @click="alertMsg">
           <i class="iconfont">&#xe614;</i>
           <p>消息</p>
         </div>
      </div>
    </header>
    <nav class="tab">
      <div class="tab_box">
        <div class="hot" @click="navTap(0)"><a :class="type == 0 ? 'active' : ''">精选</a></div>
        <div class="nav_box Wrapper" ref="navWrapper">
          <ul>
            <li v-for="(items, index) in navTitle" :key=index :class="type==items.type?'active':''" @click="navTap(items.type)">{{items.text}}</li>
          </ul>
        </div>
        <div class="classify iconfont">&#xe62c;</div>
      </div>
    </nav>
    <div class="head_box"></div>
    <div class="swiper_box">
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(items, index) in swiper" :key=index>
          <router-link :to="`/shopping/${items.goodsID}`">
            <img v-lazy="$LocalHost+items.images" class="images">
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <transition name='like_op'>
    <div class="like_option" v-if="loveShow">
      <div class="info" @click="changeLikes(1)"><span :class="loveType==1 ? 'active':''">发现</span></div>
      <div class="like" @click="changeLikes(2)"><span :class="loveType==2 ? 'active':''">精选</span></div>
    </div>
    </transition>
    <div class="main_module_layout">
      <ul>
        <li @click="alertMsg">
          <img src="./images/rank.gif">
          <p>疯抢排行</p>
        </li>
        <li @click="alertMsg">
          <img src="./images/nine.png">
          <p>9.9包邮</p>
        </li>
        <li @click="alertMsg">
          <img src="./images/brand.gif">
          <p>品牌特卖</p>
        </li>
        <li @click="alertMsg">
          <img src="./images/every.gif">
          <p>没日半价</p>
        </li>
        <li @click="alertMsg">
          <img src="./images/realtime.png">
          <p>折上折</p>
        </li>
        <li @click="alertMsg">
          <img src="./images/partEvent.png">
          <p>今日秒杀</p>
        </li>
        <li @click="alertMsg">
          <img src="./images/productSpa.png">
          <p>大额神卷</p>
        </li>
        <li @click="alertMsg">
          <img src="./images/jusan.png">
          <p>限时爆品</p>
        </li>
      </ul>
    </div>
    <div class="good_like">
      <div class="tab_op" ref='goodsReco'>
        <div class="table_find_left" @click="changeLikes(1)">
          <p>发现</p>
          <p :class="loveType==1 ? 'active':''">推荐好人</p>
        </div>
        <div class="table_find_span"></div>
        <div class="table_find_right" @click="changeLikes(2)">
          <p>精选</p>
          <p :class="loveType==2 ? 'active':''">猜你喜欢</p>
        </div>
      </div>
      <div v-if="loveType==1">
        <ul class="goods" v-if="likeLists.length">
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
        <div class="error" v-if="!likeLists.length">
          暂无
        </div>
      </div>
      <div v-if="loveType==2">
        <ul class="goods" v-if="Likes.length">
          <li v-for="(item, index) in Likes" :key=index @click="shopping(item.goodsID)">
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
        <div class="error" v-if="!Likes.length">
          暂无
        </div>
      </div>
    </div>
    <div class="bottom_box"></div>
    <transition name='back'>
    <div class="backTop iconfont" @click.stop="backTop" v-show='backBox'>&#xe68a;</div>
    </transition>
    <Footer class='footer'/>
  </div>
</template>

<script>
import Footer from '@/components/Footer/'
export default {
  data () {
    return {
      backBox: false,
      navTitle: [
        { type: 1, text: '6.18预售' },
        { type: 2, text: '美食' },
        { type: 3, text: '女装' },
        { type: 4, text: '美妆' },
        { type: 5, text: '居家日用' },
        { type: 6, text: '鞋品' },
        { type: 7, text: '数码家电' },
        { type: 8, text: '男装 ' },
        { type: 9, text: '内衣' },
        { type: 10, text: '母婴' },
        { type: 11, text: '家装家纺' },
        { type: 12, text: '文娱车品' },
        { type: 13, text: '配饰' },
        { type: 14, text: ' 箱包' }
      ],
      type: 0,
      swiper: [
        { goodsID: 123455, images: '/static/ninewap/21/01.jpg' },
        { goodsID: 123456, images: '/static/ninewap/22/01.jpg' },
        { goodsID: 123457, images: '/static/ninewap/21/03.jpg' },
        { goodsID: 223456, images: '/static/ninewap/22/02.jpg' },
        { goodsID: 223457, images: '/static/ninewap/22/03.jpg' }
      ],
      likeLists: [],
      Likes: [],
      loveShow: false,
      loveType: 1,
      goodsReco: 0
    }
  },
  name: 'index',
  components: { Footer },
  methods: {
    toSearch () {
      this.$router.push({ path: '/search' })
    },
    message (msg, time) {
      this.toastInstanse = this.$toast({
        message: msg,
        position: 'middle',
        duration: time
      })
    },
    // goUp () {
    //   window.addEventListener('scroll', this.handleScroll)
    // },
    backTop () {
      const nowTop = document.body.scrollTop || document.documentElement.scrollTop
      if (nowTop > 0) {
        window.requestAnimationFrame(this.backTop)
        window.scrollTo(0, nowTop - (nowTop / 5))
      }
    },
    alertMsg () {
      this.message('暂无', 1000)
    },
    likeReg (likeLists) {
      const likeArr = likeLists.split('||')
      const likes = []
      for (let i = 0; i < likeArr.length; i++) {
        likes.push(JSON.parse(likeArr[i]))
      }
      return { likes }
    },
    changeLikes (type) {
      this.loveType = type
      window.scrollTo(0, this.goodsReco - 40)
    },
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const Y = this.goodsReco - 40
      if (scrollTop > Y) {
        this.backBox = true
        this.loveShow = true
      } else {
        this.backBox = false
        this.loveShow = false
      }
    },
    shopping (goodsID) {
      this.$router.push({ path: `/shopping/${goodsID}` })
    },
    navTap (index) {
      this.type = index
      this.message('暂无', 1000)
    }
  },
  created () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.navWrapper) {
        this.navWrapper = new this.$BScroll(this.$refs.navWrapper, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          scrollX: true,
          scrollY: false,
          tap: true,
          mouseWheel: true
        })
      // console.log(this.scroll)
      } else if (!this.$refs.navWrapper) {
        return false
      } else {
        this.navWrapper.refresh()
      }
    })
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
    document.documentElement.scrollTop = 0
    this.goodsReco = this.$refs.goodsReco.getBoundingClientRect().top
    window.addEventListener('scroll', this.handleScroll)
    setTimeout(() => {
      const oldList = window.localStorage.getItem('LikeList')
      if (oldList) {
        const likes = this.likeReg(oldList).likes
        if (likes) {
          this.Likes = likes
        } else {
          this.Likes = []
        }
        // const oldLike = this.likeReg(oldList).likes
      }
    }, 800)
  }
}

</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container {
  width: 100%;
  height: 100%;
  background: rgb(192, 0, 232);
  .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    background: rgb(192, 0, 232);
    .h(53);
    overflow: hidden;
    .search {
      position: relative;
      float: left;
      .mt(10);
      .ml(10);
      .w(270);
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
    .msg {
      display: flex;
      .w(90);
      .h(53);
      center: center;
      justify-content: center;
      align-items: center;
      .sigin {
        flex: 1;
        .ml(10);
        overflow: hidden;
        img {
          .w(32);
          .h(32);
        }
      }
      .header_info {
        flex: 1;
        .w(36);
        .h(38);
        color: #fff;
        overflow: hidden;
        text-align: center;
        i {
          .fs(20);
          font-weight: 600;
        }
        p {
          .fs(12);
        }
      }
    }
  }
  .tab {
    position: fixed;
    z-index: 999;
    .top(53);
    width: 100%;
    .h(30);
    background: rgb(192, 0, 232);
    .tab_box {
      position: relative;
      width: 100%;
      .h(30);
      .hot {
        position: absolute;
        left: 0;
        .w(50);
        .h(30);
        text-align: center;
        z-index: 100;
        background: rgb(192, 0, 232);
        .fs(14);
        a {
          display: block;
          color: #fff;
          .w(31);
          .h(25);
          .lh(25);
          .ml(8);
          .pm(2);
        }
        .active {
          color: #fff;
          border-bottom: 2px solid #fff;
        }
      }
      .nav_box {
        position: relative;
        width: 100%;
        .h(30);
        .pl(50);
        .pr(28);
        overflow: hidden;
        ul {
          display: inline-block;
          .pl(50);
          .pr(30);
          white-space: nowrap;
          height: 100%;
          li {
            display: inline-block;
            .ml(5);
            .mr(5);
            .lh(25);
            .fs(14);
            color: rgba(255,255,255,.65);
          }
          .active {
            color: #fff;
            border-bottom: 2px solid #fff;
          }
        }
      }
      .classify {
        position: absolute;
        right: 0;
        top: 0;
        overflow: hidden;
        text-align: center;
        color: #fff;
        .fs(22);
        .w(30);
        .h(30);
        background: rgb(192, 0, 232);
      }
    }
  }
  .head_box {
    .h(83);
  }
  .like_option {
    position: fixed;
    z-index: 998;
    .top(83);
    width: 100%;
    .h(45);
    background: #fff;
    text-align: center;
    .lh(45);
    .fs(18);
    color: #666;
    .info {
      display: inline-block;
      width: 50%;
      .active {
        .pm(8);
        border-bottom: 2px solid red;
      }
    }
    .like {
      display: inline-block;
      width: 50%;
      .active {
        .pm(8);
        border-bottom: 2px solid red;
      }
    }
  }
  .bottom_box {
    .h(53);
    width: 100%;
  }
  .swiper_box {
    .pl(10);
    .pr(10);
    .h(140);
    .swiper {
      width: 100%;
      .mt(10);
      .h(140);
      background: rgb(192, 0, 232);
      .border(10);
      div {
        width: 100%;
        height: 100%;
        .border(10);
        .images {
           width: 100%;
           height: 100%;
        }
      }
    }
  }
  .main_module_layout {
    .mt(20);
    width: 100%;
    .h(165);
    background: rgb(192, 0, 232);
    ul {
      .ml(10);
      .mr(10);
      .h(165);
      .border(10);
      background: #fff;
      li {
        display: inline-block;
        width: 20%;
        overflow: hidden;
        .h(80);
        .pt(5);
        text-align: center;
        .ml(8);
        .mr(8);
        img {
          .w(50);
        }
        p {
          .fs(12);
        }
      }
    }
  }
  .good_like {
    .mt(20);
    .mb(5);
    width: 100%;
    background: rgb(192, 0, 232);
    .tab_op {
      position: relative;
      .h(40);
      .table_find_left {
        display: inline-block;
        width: 49%;
        .h(40);
        text-align: center;
        color: #fff;
        p:first-child {
          width: 100%;
          .h(24);
          .lh(24);
          .fs(18);
        }
        p:last-child {
          .w(65);
          margin: 0 auto;
          .h(16);
          .lh(16);
          .border(20);
          .fs(12);
        }
        .active {
          color: #FE3738!important;
          background-color: #fff;
        }
      }
      .table_find_span {
        position: absolute;
        .w(1);
        .h(26);
        background-color: #c3c3c3;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      .table_find_right {
        display: inline-block;
        width: 49%;
        .h(40);
        text-align: center;
        color: #fff;
        p:first-child {
          width: 100%;
          .h(24);
          .lh(24);
          .fs(18);
        }
        p:last-child {
          .w(65);
          margin: 0 auto;
          .h(16);
          .lh(16);
          .border(20);
          .fs(12);
        }
        .active {
          color: #FE3738!important;
          background-color: #fff;
        }
      }
    }
    .goods {
      width: 100%;
      .mt(10);
      background: rgb(192, 0, 232);
      li {
        display: inline-block;
        width: 50%;
        .h(296);
        .cent {
          .ml(5);
          .mr(5);
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
    .error {
      .h(200);
      .mt(20);
      background: rgba(255,255,255,0.3);
      .border(5);
      .ml(10);
      .mr(10);
      .fs(16);
      color: #fff;
      text-align: center;
      .lh(100);
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
.like_op-enter{
  opacity: 0;
  transform: translateY(-50px);
}
.like_op-enter-to{
  opacity: 1;
  transform: translateY(0);
}
.like_op-enter-active{
  transition: all 1s;
}
.like_op-leave{
  opacity: 1;
}
.like_op-leave-to{
  opacity: 0;
  transform: translateY(0);
}
.like_op-leave-active{
  transition: all 1s;
  transform: translateY(-50px);
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
