<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <ul>
        <li @click="select(1)" >商品<a :class="type==1?'active':''"></a></li>
        <li @click="select(2)" >详情<a :class="type==2?'active':''"></a></li>
      </ul>
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
    <mt-swipe :auto="3000" :speed='1000' class='banner' v-if="goods">
      <mt-swipe-item v-for="(items, index) in goods.swiper" class='banner_img' :key=index>
        <img v-lazy="$LocalHost+items">
      </mt-swipe-item>
    </mt-swipe>
    <section class="good" v-if="goods">
      <div class="info">
        <div class="title-top-info">
          <div class="goods_price">
            卷后价
            <span class="after-volume-price"><i>￥</i>{{goods.price}}</span>
            <span class="original-price">原价 <i>¥{{goods.oldprice}}</i></span>
          </div>
        </div>
        <h1 class="col-mar">
          <img src="./images/lable-icon-02.png" class="tm"><span>【北极绒】儿童卡通刺绣纯棉防蚊裤</span>
        </h1>
        <div class="service_sell">
          <div class="text_right">已售<span>{{goods.oldsell}}万</span>件</div>
        </div>
        <div class="coupon">
          <div class="div_left">
            <span><i>{{goods.juan}}</i> 元优惠券</span>
            <div>2020.05.25-2020.05.28</div>
          </div>
          <div class="div_right" @click="collarJuan">
            立即领取
          </div>
        </div>
        <div class="goods_desc ">
          原版正品&nbsp;&nbsp;热销50万&nbsp;
          超级爆品，纯棉牛仔材质
          轻薄舒适不褪色，不起球，春夏天小朋友必备哦。
        </div>
      </div>
      <div class="comment">
        <div class="nav_text">
          <div class="div_left">评论 <span>({{goods.comment}}w+)</span></div>
          <div class="div_right iconfont" @click="commentAll">
            查看全部 &#xe63d;
          </div>
        </div>
      </div>
      <div class="goodsReco" ref="goodsReco" >
        <h3><span class="goods_reco_span1"></span>商品详情<span class="goods_reco_span2"></span></h3>
        <div class="imglist">
          <img v-lazy="$LocalHost+items" v-for="(items, index) in goods.desc" :key=index>
        </div>
      </div>
    </section>
    <div class="bot_box"></div>
    <transition name='back'>
    <div class="backTop iconfont" @click="backTop" v-show='backBox'>&#xe68a;</div>
    </transition>
    <footer class="cart" v-if="goods">
      <div class="like" @click="like(goods.goodsID)">
        <span class="iconfont" :class="loveShow ? 'active' : ''">&#xe60a;</span>
        <p>收藏</p>
      </div>
      <div class="ok" @click="payShopping(goods.goodsID)">
        <p class="moneycx search_type_one_true_p"><span> ¥ </span>{{goods.price}} <del> ¥ {{goods.oldprice}}</del></p>
        <p class="rightbutton"> 领券购买</p>
      </div>
    </footer>
    <div class="error" v-if="!goods">
      暂无此数据建议稍后重试
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      type: 1,
      backBox: false,
      imgIndex: 1,
      goodsReco: 0,
      goods: null,
      loveShow: false,
      likeList: []
    }
  },
  methods: {
    message (msg, time) {
      this.$toast({
        message: msg,
        position: 'middle',
        duration: time
      })
    },
    hisBack () {
      history.go(-1)
    },
    select (type) {
      this.type = type
      if (type === 1) {
        window.scrollTo(0, 0)
      }
      if (type === 2) {
        window.scrollTo(0, this.goodsReco)
      }
    },
    moveShow () {
      this.show = !this.show
    },
    backTop () {
      const nowTop = document.body.scrollTop || document.documentElement.scrollTop
      if (nowTop > 0) {
        window.requestAnimationFrame(this.backTop)
        window.scrollTo(0, nowTop - (nowTop / 5))
      }
    },
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const Y = this.goodsReco
      if (scrollTop >= Y) {
        this.backBox = true
        this.type = 2
      } else {
        this.backBox = false
        this.type = 1
      }
    },
    collarJuan () {
      this.message('暂无', 1000)
    },
    commentAll () {
      this.message('暂无', 1000)
    },
    checkingID (goodsID, likeList) {
      let isOK = false
      let index = null
      for (let i = 0; i < likeList.length; i++) {
        const id = JSON.parse(likeList[i]).likeID
        if (goodsID === id) {
          index = i
          isOK = true
          break
        }
      }
      return { isOK, index, goodsID }
    },
    likeReg (likeLists) {
      const likeArr = likeLists.split('||')
      const likes = []
      for (let i = 0; i < likeArr.length; i++) {
        likes.push(JSON.parse(likeArr[i]))
      }
      return { likes }
    },
    removeLikeList (index) {
      this.likeList.splice(index, 1)
      const newslikeList = this.likeList
      let datas = ''
      for (let i = 0; i < newslikeList.length; i++) {
        const string = JSON.stringify(newslikeList[i])
        if (!datas) {
          datas = string
        } else if (this.likeList.length === 1) {
          datas = string
        } else {
          datas += '||' + string
        }
      }
      window.localStorage.setItem('LikeList', datas)
    },
    LikeIsok (likeLists, goodsID) {
      const likeArr = likeLists.split('||')
      let index = null
      let isOK = false
      for (let i = 0; i < likeArr.length; i++) {
        if (goodsID === JSON.parse(likeArr[i]).goodsID) {
          index = i
          isOK = true
          break
        }
      }
      return { isOK, index }
    },
    like (ID) {
      const times = Date.parse(new Date())
      const data = {
        goodsID: this.goods.goodsID,
        name: this.goods.title,
        price: this.goods.price,
        oldsell: this.goods.oldsell,
        juan: this.goods.juan,
        imgUrl: this.goods.swiper[0],
        date: times
      }
      const Datas = JSON.stringify(data)
      const oldList = window.localStorage.getItem('LikeList')
      if (!oldList) {
        window.localStorage.setItem('LikeList', Datas)
        this.goodsID = ID
        console.log('新纪录')
        this.loveShow = true
        return false
      }
      this.likeList = this.likeReg(oldList).likes
      const isOK = this.LikeIsok(oldList, ID)
      if (isOK.isOK) {
        this.removeLikeList(isOK.index)
        this.loveShow = false
        return false
      }
      window.localStorage.setItem('LikeList', oldList + '||' + Datas)
      this.loveShow = true
    },
    payShopping (ID) {
      if (!ID) {
        return this.message('无法使用', 1000)
      }
      this.$router.push({ path: `/payShopping/${ID}` })
    }
  },
  watch: {
    goods () {
      if (this.goods) {
        const times = Date.parse(new Date())
        const data = {
          goodsID: this.goods.goodsID,
          name: this.goods.title,
          price: this.goods.price,
          oldsell: this.goods.oldsell,
          juan: this.goods.juan,
          imgUrl: this.goods.swiper[0],
          date: times
        }
        if (!window.localStorage.getItem('prointList')) {
          const datas = JSON.stringify(data)
          window.localStorage.setItem('prointList', datas)
          return false
        }
        const oldData = window.localStorage.getItem('prointList')
        const datas = JSON.stringify(data)
        window.localStorage.setItem('prointList', oldData + '||' + datas)
      }
    }
  },
  created () {
    const goodsID = this.$route.params.id
    this.axios({
      method: 'get',
      url: this.$LocalHost + `/goods/${goodsID}`
    }).then(async (res) => {
      const success = await res.data
      if (success.err !== 0) {
        this.goods = null
        this.message(`获取失败${success.msg}`)
      } else {
        this.goods = success.data
      }
    }).catch(() => {
      this.message('服务器未响应请稍后再试')
    })
  },
  mounted () {
    document.documentElement.scrollTop = 0
    setTimeout(() => {
      if (this.goods.goodsID) {
        const oldList = window.localStorage.getItem('LikeList')
        if (oldList) {
          const isOK = this.LikeIsok(oldList, this.goods.goodsID)
          if (isOK.isOK) {
            this.loveShow = true
          } else {
            this.loveShow = false
          }
        }
        // const oldLike = this.likeReg(oldList).likes
        this.goodsReco = this.$refs.goodsReco.getBoundingClientRect().top - 60
        window.addEventListener('scroll', this.handleScroll)
      }
    }, 800)
  }
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container {
  position: relative;
  width: 100%;
  .header {
    position: fixed;
    width: 100%;
    .h(53);
    z-index: 1000;
    overflow: hidden;
    background: #fff;
    border-bottom-color: transparent;
    .back {
      float: left;
      display: inline-block;
      .w(53);
      .h(53);
      text-align: center;
      .lh(53);
      .fs(24);
      color: #333;
    }
    ul {
      display: inline-block;
      float: left;
      .h(53);
      .w(286);
      text-align: center;
      li {
        position: relative;
        display: inline-block;
        .w(63);
        .h(53);
        .lh(53);
        .ml(10);
        .mr(20);
        .fs(16);
        a {
          position: absolute;
          display: block;
          .w(43);
          .h(3);
          bottom: 0;
          .ml(10);
          .border(10);
          background: none;
        }
        .active {
          background: #FC3F78;
        }
      }
    }
    span {
      float: right;
      color: #333;
      .mt(13);
      .mr(12);
      .fs(24);
    }
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
  .head_box {
    width: 100%;
    .h(53);
  }
  .banner {
    .w(375);
    .h(375);
    .banner_img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .good {
    position: relative;
    border-top: 1px solid #eee;
    width: 100%;
    height: 100%;
    .info {
      width: 100%;
      .h(266);
      overflow: hidden;
      background: #fff;
      .title-top-info {
        .pt(15);
        .h(61);
        background: #fff;
        .mr(10);
        .ml(10);
        .goods_price {
          .fs(12);
          color: #FC4D52;
          .after-volume-price {
            .fs(22);
            i {
              font-style: normal;
              .fs(16);
            }
          }
          .original-price {
            display: block;
            .w(116);
            .h(21);
            color: #888;
            i {
              font-style: normal;
              text-decoration: line-through;
            }
          }
        }
      }
      .col-mar {
        .fs(15);
        font-weight: 400;
        .pt(7);
        .pm(6);
        .ml(10);
        .mr(10);
        white-space: nowrap;
        align-items: center;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        .tm {
          display: inline-block;
          .w(26);
          .h(15);
          .mr(5);
          vertical-align: middle;
        }
      }
      .service_sell {
        .h(28);
        .fs(13);
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: #888;
        .lh(28);
        .mb(5);
        .text_right {
          float: right;
          .mr(10);
          span {
            color: #F72239;
          }
        }
      }
      .coupon {
        .h(70);
        background: url(./images/icon-bg-001.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        color: #fff;
        .ml(10);
        .mr(10);
        align-content: center;
        .mb(5);
        .div_left {
          flex: 1;
          .pl(30);
          .pt(14);
          span {
            .fs(14);
            font-weight: 600;
            i {
              .fs(20);
              font-style: normal;
            }
          }
          div {
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            color: rgba(255,255,255,.8);
            .fs(10);
          }
        }
        .div_right {
          .h(70);
          .lh(70);
          .w(120);
          background-size: auto 100%;
          text-align: center;
          color: #FE3738;
        }
      }
      .goods_desc {
        .fs(14);
        .pt(8);
        .pl(10);
        .pr(10);
        color: #888;
      }
    }
    .comment {
      .mt(10);
      width: 100%;
      background: #fff;
      .nav_text {
        .ml(10);
        .mr(10);
        .h(42);
        .div_left {
          display: inline-block;
          .fs(15);
          .lh(42);
          font-weight: 400;
          color: #333;
        }
        .div_right {
          display: inline-block;
          .lh(42);
          float: right;
          .h(42);
          .fs(14);
          font-weight: 400;
          color: #fe3738;
        }
      }
    }
    .goodsReco {
      .mt(10);
      width: 100%;
      background: #fff;
      h3 {
        position: relative;
        .fs(13);
        text-align: center;
        .h(50);
        .lh(50);
        color: #888;
        .goods_reco_span1{
          .w(47);
          .h(2);
          background-color: #e4e4e4;
          position: absolute;
          top: 50%;
          display: block;
          left: 25%;
        }
        .goods_reco_span2{
          .w(50);
          .h(2);
          background-color: #e4e4e4;
          position: absolute;
          top: 50%;
          display: block;
          right: 25%;
        }
      }
      .imglist {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
  .cart {
    position: fixed;
    bottom: 0;
    z-index: 20;
    width: 100%;
    background: #fff;
    .h(56);
    .like {
      display: inline-block;
      text-align: center;
      .mt(5);
      .w(62.5);
      .ml(30);
      span {
        .fs(22);
      }
      .active {
        color: #FE3C35;
      }
      p {
        .fs(14);
        color: #333;
      }
    }
    .ok {
      float: right;
      .mt(8);
      .w(150);
      .h(40);
      text-align: center;
      .mr(10);
      background: linear-gradient(to left,#FE3C35 0,#FF1F4C 100%);
      .border(20);
      .moneycx {
        text-align: center;
        .fs(15);
        top: 3px;
        color: #fff;
        span {
          color: #fff!important;
        }
        del {
          .fs(12);
          color: rgba(255,255,255,.6)!important;
        }
      }
      .rightbutton {
        .fs(12);
        color: #fff!important;
      }
    }
  }
  .bot_box {
    width: 100%;
    .h(56);
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
  .error {
    width: 100%;
    height: 100%;
    .fs(20);
    text-align: center;
    color: red;
  }
}
.mint-swipe-indicator {
  background: #333;
  opacity: 1 ！important;
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
