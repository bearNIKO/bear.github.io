<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <p class="title">我的收藏</p>
      <span class="iconfont" @click='alertMessage'>&#xe673;</span>
    </header>
    <div class="head_box"></div>
    <section class="banner" v-if="!users">
      <div class="bg_box">
        <img src="./images/user_sc.svg" alt="">
      </div>
      <div class="desc">
        <p>登录后添加收藏</p>
        <p>收藏云端同步，不错过任何优惠哦</p>
      </div>
      <router-link to="/login" class="login">
        <span>登入/注册</span>
      </router-link>
    </section>
    <section class="banner_box" v-if="!likeList.length && users">
      <div class="print">
        <img src="./images/bear.png">
        <div>暂无收藏</div>
        <router-link to="/index" class="index">
          <span>去逛逛首页吧</span>
        </router-link>
      </div>
    </section>
    <div class="proint" v-if="likeList.length && users">
      <ul>
        <li v-for="(items, index) in this.likeList" :key=index @click="toGoods(items.goodsID)">
          <div class="img">
            <img v-lazy="$LocalHost+`${items.imgUrl}`">
          </div>
          <div class="cent">
            <h3>
              <img src="./images/lable-icon-02.png">
              <span>{{items.name}}</span>
            </h3>
            <div class="product_info">
              <div class="price">
                <span>券后&nbsp;</span>
                <span class="RMB">¥</span>
                <span class="price_num">{{items.price}}</span>
              </div>
              <div class="label_box">
                <span ><span class="juan"><span>劵</span>{{items.juan}}元</span></span>
              </div>
              <div class="salse"><span>已售{{items.oldsell}}万</span></div>
            </div>
          </div>
          <mt-button type="primary" class="danger" @click.stop="alertRemoveLikes(index)">删除</mt-button>
        </li>
      </ul>
    </div>
    <transition name='back'>
    <div class="backTop iconfont" @click="backTop" v-show='backBox'>&#xe68a;</div>
    </transition>
    <div class="bottom_box" v-if="!users || likeList.length"></div>
    <Footer class='footer'/>
  </div>
</template>

<script>
import Footer from '@/components/Footer/'
export default {
  data () {
    return {
      users: null,
      backBox: false,
      likeList: []
    }
  },
  name: 'like',
  components: { Footer },
  methods: {
    backTop () {
      const nowTop = document.body.scrollTop || document.documentElement.scrollTop
      if (nowTop > 0) {
        window.requestAnimationFrame(this.backTop)
        window.scrollTo(0, nowTop - (nowTop / 5))
      }
    },
    toGoods (id) {
      this.$router.push({ path: `/shopping/${id}` })
    },
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 350) {
        this.backBox = true
      } else {
        this.backBox = false
      }
    },
    alertMessage () {
      this.$messagebox({
        message: '确定清收藏空记录吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.removeLikeLists()
        } else {
        }
      })
    },
    alertRemoveLikes (index) {
      this.$messagebox({
        message: '确定取消此项商品收藏吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.removeLikeItem(index)
        } else {
        }
      })
    },
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
    removeLikeLists () {
      this.likeList = []
    },
    likeReg (likeLists) {
      const likeArr = likeLists.split('||')
      const likes = []
      for (let i = 0; i < likeArr.length; i++) {
        likes.push(JSON.parse(likeArr[i]))
      }
      return { likes }
    },
    removeLikeItem (index) {
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
    }
  },
  created () {
    this.users = window.localStorage.getItem('users')
    const likeLists = window.localStorage.getItem('LikeList')
    if (!likeLists) {
      this.message('暂无收藏哦！', 1000)
      this.likeList = []
      return false
    }
    this.likeList = this.likeReg(likeLists).likes
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container {
  position: relative;
  width: 100%;
  background: #fff;
  .header {
    position: fixed;
    z-index: 10;
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
  .head_box {
    width: 100%;
    .h(53);
  }
  .banner {
    display: block;
    width: 100%;
    .h(555);
    background: #fff;
    .bg_box {
      position: relative;
      width: 100%;
      .h(230);
      text-align: center;
      img {
        position: absolute;
        .w(180);
        bottom: 0;
        left: 28%;
      }
    }
    .desc {
      width: 100%;
      .mt(30);
      text-align: center;
      .fs(19);
      p {
        .mb(10);
      }
      p:last-child {
        color: #999;
      }
    }
    .login {
      display: block;
      .w(200);
      .h(50);
      margin: 0 auto;
      border-radius: 5rem;
      -webkit-box-shadow: 0 2px 6px 0 rgba(255,135,135,.5);
      box-shadow: 0 2px 6px 0 rgba(255,135,135,.5);
      background: -webkit-linear-gradient(right, #ff5e90 0%, #ff927c);
      background: -o-linear-gradient(right, #ff5e90 0%, #ff927c);
      background: linear-gradient(to left, #ff5e90 0%, #ff927c);
      text-align: center;
      span {
        .fs(20);
        .lh(50);
        color: #fff;
      }
    }
  }
  .banner_box {
    position: relative;
    width: 100%;
    .h(614);
    text-align: center;
    .print {
      position: absolute;
      bottom: 40%;
      width: 100%;
      img {
        .w(200);
        .h(200);
        margin: 0 auto;
      }
      div {
        .fs(16);
        font-weight: 350;
      }
      .index {
        display: block;
        .w(136);
        .h(35);
        .border(20);
        margin: 0 auto;
        .lh(35);
        color: #fff;
        .fs(16);
        .mt(20);
        background: linear-gradient(to left,#FBAA58 0,#FA4DBE 100%);
      }
    }
  }
  .like_no {
    position: relative;
    width: 100%;
    .h(614);
    text-align: center;
    .print {
      position: absolute;
      bottom: 40%;
      width: 100%;
      img {
        .w(200);
        .h(200);
        margin: 0 auto;
      }
      div {
        .fs(16);
        font-weight: 350;
      }
    }
  }
  .bottom_box {
    width: 100%;
    .h(58);
    position: absolute;
    bottom: 0;
  }
  .proint {
    width: 100%;
    .pm(58);
    ul {
      width: 100%;
      li {
        position: relative;
        .pt(10);
        .pl(10);
        .pm(10);
        .h(146);
        border-bottom: 1px solid #eee;
        background: #fff;
        .img {
          display: inline-block;
          .w(126);
          .h(126);
          img {
            width: 100%;
            height: 100%;
            .border(8);
          }
        }
        .cent {
          position: relative;
          display: inline-block;
          float: right;
          .w(228);
          .h(126);
          .pr(10);
          h3 {
            position: absolute;
            .h(20);
            .w(218);
            top: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            .fs(14);
            font-weight: 400;
            color: #333;
            vertical-align: middle;
            .lh(20);
            img {
              .h(13);
              .w(23);
              vertical-align: middle;
            }
            span {
              .ml(10);
              vertical-align: middle;
            }
          }
          .product_info {
            position: absolute;
            .bottom(6);
            .w(218);
            .h(63);
            .price {
              .fs(10);
              .mb(4);
              font-weight: 400;
              color: #666;
              display: flex;
              align-items: baseline;
              .RMB {
                .fs(14);
                font-weight: 500;
                color: #FF2B22;
                .ml(4);
              }
              .price_num {
                .fs(20);
                font-weight: 500;
                color: #FF2B22;
              }
            }
          }
          .label_box {
            .mr(2);
            span {
              .juan {
                .h(14);
                background: -webkit-linear-gradient(left, #ff8873 0%, #ff4f4f 100%);
                background: -o-linear-gradient(left, #ff8873 0%, #ff4f4f 100%);
                background: linear-gradient(to right, #ff8873 0%, #ff4f4f 100%);
                .border(2);
                .pr(5);
                .pl(1);
                .fs(9.5);
                .lh(12);
                font-weight: 400;
                color: #fff;
                display: inline-block;
                position: relative;
                z-index: 1;
                zoom: 1;
                top: 0;
                vertical-align: middle;
                span {
                  background: #fff;
                  .border(1);
                  .fs(10);
                  color: #FE3A33;
                  .mb(1);
                  .w(12);
                  .h(12);
                  .mr(5);
                  display: inline-block;
                  .lh(12);
                  text-align: center;
                  vertical-align: middle;
                }
              }
            }
          }
          .salse {
            .mt(2);
            span {
              .fs(10);
              font-weight: 400;
              color: #888;
            }
          }
        }
        .danger {
          position: absolute;
          display: inline-block;
          .bottom(12);
          .right(12);
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
