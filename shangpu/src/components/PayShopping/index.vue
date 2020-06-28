<template  lang="html">
  <div class="container">
    <div class="information" v-if="goods">
      <div class="information_box" @click="activePosition">
        <div class="position">
          <img src="./images/TB17gX2wYvpK1RjSZ_.webp">
        </div>
        <div class="text">
          <div class="users">
           <span class="name">{{username}}</span>
           <span class="phone">{{phone}}</span>
          </div>
          <div class="positions">
            <span>{{introduction}}</span>
          </div>
        </div>
        <div class="click iconfont">&#xe63d;</div>
      </div>
    </div>
    <div class="goods" v-if="goods">
      <div class="center">
        <div class="box">
          <h3 class="title"><img src="./images/lable-icon-02.png">自营店</h3>
          <div class="good">
            <div class="img">
              <img v-lazy="$LocalHost+goods.swiper[0]">
            </div>
            <div class="descs">
              <div class="text">
                <div class="title">
                  <span>
                    {{goods.title}}
                  </span>
                </div>
                <div class="type">
                  默认套餐
                </div>
              </div>
            </div>
            <div class="price">
              <div class="price_money">￥{{goods.oldprice}}</div>
              <div class="price_age">x{{allCount}}</div>
            </div>
          </div>
          <div class="describe">
            <ul>
              <li class="left">配送方式 <span>普通配送</span></li>
              <li class="right">快递 <span>免邮</span><i class="iconfont">&#xe63d;</i></li>
            </ul>
            <ul>
              <li class="left">店铺优惠 <span>省{{goods.juan}}元</span></li>
              <li class="right"><span>-￥{{goods.juan}}</span><i class="iconfont">&#xe63d;</i></li>
            </ul>
          </div>
          <div class="bottom">
            <ul>
              <li class="age">共{{allCount}}件</li>
              <li class="price">小计:<span>￥</span><i>{{goods.price}}</i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="desc" v-show="position">
      <div class="cent">
        <mt-field label="收件人" placeholder="请输入收件人" v-model="username"></mt-field>
        <mt-field label="联系方式" placeholder="+86" type="tel" v-model="phone"></mt-field>
        <mt-field label="收件地址" placeholder="请输收件地址" type="textarea" rows="4" v-model="introduction"></mt-field>
        <mt-button type="primary" size="small" class="left" @click="savePosition">保存</mt-button>
        <mt-button type="danger" size="small" @click="activePosition" class="right">取消</mt-button>
      </div>
    </div>
    <footer class="footer" v-if="goods">
      <div class="price">
        <a @click="hisBack" class="back iconfont">&#xe618;</a>
        <ul>
          <li class="age">共{{allCount}}件,</li>
          <li class="money">合计:<span>￥</span><i>{{goods.price}}</i></li>
        </ul>
      </div>
      <div class="btn" @click="submitOrder">
        提交订单
      </div>
    </footer>
    <div class="error" v-if="!goods">暂无数据请稍后重试!</div>
  </div>
</template>

<script>
import QS from 'qs'
export default {
  data () {
    return {
      goodsID: null,
      position: false,
      username: '',
      phone: '',
      introduction: '',
      goods: null,
      allCount: 1,
      users: '',
      uemail: ''
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
    activePosition () {
      this.position = !this.position
    },
    hisBack () {
      history.go(-1)
    },
    savePosition () {
      if (!this.username) {
        this.message('请输入收件人', 1000)
        return
      }
      if (!this.phone) {
        this.message('请输入联系方式', 1000)
        return
      }
      if (!this.introduction) {
        this.message('请输入收件地址', 1000)
        return
      }
      const data = {
        username: this.username,
        phone: this.phone,
        introduction: this.introduction
      }
      const datas = JSON.stringify(data)
      window.localStorage.setItem('UserPosition', datas)
      this.message('保存成功', 1000)
      this.position = !this.position
    },
    submitOrder () {
      const users = window.localStorage.getItem('users')
      if (!users) {
        this.message('请登入后重新提交')
        setTimeout(() => {
          this.$router.push({ path: '/login' })
        }, 1500)
        return false
      }
      const user = JSON.parse(users)
      if (!user.token || !user.name) {
        this.message('登入失效请重新登入')
        setTimeout(() => {
          this.$router.push({ path: '/login' })
        }, 1500)
        return false
      }
      const datas = {
        goodsID: this.goods.goodsID,
        price: this.goods.price,
        allCount: this.allCount,
        state: 2,
        descs: this.goods.title,
        userName: this.username,
        phone: this.phone,
        address: this.introduction,
        images: this.goods.swiper[0],
        user: user.user,
        uemail: user.email
      }
      const token = 'Bear' + user.token
      this.axios({
        method: 'post',
        url: this.$LocalHost + '/orders/save',
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
          this.message(`${success.msg}/即将返回个人页面`, 1000)
          setTimeout(() => { this.$router.push({ path: '/my' }) }, 2000)
        }
      }).catch(() => {
        this.message('服务器未响应请稍后再试')
      })
    }
  },
  created () {
    this.goodsID = this.$route.params.id
    const ID = this.goodsID
    this.axios({
      method: 'get',
      url: this.$LocalHost + `/goods/${ID}`
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
    const users = window.localStorage.getItem('UserPosition')
    const userPosition = window.localStorage.getItem('UserPosition')
    if (users && userPosition) {
      setTimeout(() => {
        if (this.goodsID) {
          const userInfo = JSON.parse(userPosition)
          this.username = userInfo.username
          this.phone = userInfo.phone
          this.introduction = userInfo.introduction
        }
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container{
  width: 100%;
  .information {
    width: 100%;
    .h(91);
    .mt(10);
    .information_box {
      display: flex;
      .border(10);
      height: 100%;
      .ml(10);
      .mr(10);
      background: #fff;
      .position {
        position: relative;
        display: flex;
        place-self: center;
        .w(32);
        .h(32);
        .ml(12);
        .mr(12);
        flex-shrink: 0;
        overflow: hidden;
        img {
          place-self: center;
          .w(32);
          .h(32);
          margin: 0 auto;
          .lh(91);
        }
      }
      .text {
        position: relative;
        display: flex;
        flex: 1 1 0%;
        overflow: hidden;
        -webkit-box-flex: 1;
        .mt(16);
        .mb(16);
        height: auto;
        flex-direction: column;
        -webkit-box-orient: vertical;
        width: 0px;
        -webkit-box-direction: normal;
        .users {
          position: relative;
          display: flex;
          flex-shrink: 0;
          flex-grow: 0;
          overflow: hidden;
          height: 19px;
          width: 264px;
          place-self: flex-start;
          .name {
            position: relative;
            display: flex;
            flex-shrink: 0;
            flex-grow: 0;
            margin-top: 1px;
            height: auto;
            .fs(15);
            overflow: hidden;
            max-width: 106px;
            justify-content: flex-start;
            -webkit-box-pack: start;
            align-items: center;
            -webkit-box-align: center;
            color: rgb(51, 51, 51);
            width: fit-content;
          }
          .phone {
            position: relative;
            display: flex;
            flex-shrink: 0;
            flex-grow: 0;
            place-self: flex-end flex-start;
            .ml(6);
            height: auto;
            color: rgb(153, 153, 153);
            .fs(13);
            width: fit-content;
            justify-content: flex-start;
            -webkit-box-pack: start;
            align-items: center;
            -webkit-box-align: center;
            overflow: hidden;
            max-width: none;
          }
        }
        .positions {
          position: relative;
          display: flex;
          flex-shrink: 0;
          flex-grow: 0;
          .mt(6);
          height: auto;
          .fs(14);
          overflow: hidden;
          color: rgb(51, 51, 51);
          width: 100%;
          justify-content: flex-start;
          -webkit-box-pack: start;
          align-items: center;
          -webkit-box-align: center;
          max-width: 264px;
          span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            .lh(14);
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .click {
        position: relative;
        display: flex;
        flex-shrink: 0;
        flex-grow: 0;
        overflow: hidden;
        place-self: center flex-start;
        .h(20);
        .ml(8);
        .mr(9);
        .w(14);
        visibility: visible;
        .fs(20);
        color: #CCC;
        font-weight: 500;
      }
    }
  }
  .goods {
    position: relative;
    .mt(10);
    width: 100%;
    .h(300);
    .center {
      .ml(10);
      .mr(10);
      .h(300);
      background: #fff;
      .border(10);
      .box {
        .ml(10);
        .mr(10);
        h3 {
          .h(44);
          .fs(14);
          .lh(44);
          color: rgb(51, 51, 51);
          font-weight: 380;
          vertical-align: middle;
          img {
            .w(28);
            .h(14);
            .mr(10);
            vertical-align:middle;
          }
        }
        .good {
          position: relative;
          display: block;
          .mt(5);
          .h(100);
          .img {
            position: relative;
            display: inline-block;
            flex-shrink: 0;
            flex-grow: 0;
            overflow: hidden;
            .h(100);
            .mr(12);
            .w(100);
            .border(5);
            background: #fff;
            place-self: flex-start;
            img {
              .w(100);
              .h(100);
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
        .bottom {
          .h(48);
          .lh(48);
          ul {
            float: right;
            li {
              float: left;
            }
            .age {
              .fs(12);
              color: rgb(153, 153, 153);
            }
            .price {
              .ml(5);
              color: rgb(21, 21, 21);
              .fs(12);
              span {
                color: rgb(255, 80, 0);
                .fs(13);
              }
              i {
                font-style: normal;
                .ml(2);
                color: rgb(255, 80, 0);
              }
            }
          }
        }
      }
    }
  }
  .desc {
    position: fixed;
    top: 0;
    width: 100%;
    height:100vh;
    background: #eee;
    z-index: 100;
    div {
      width: 80%;
      margin: 0 auto;
      .mt(100);
      .pt(20);
      .border(20);
      background: #fff;
      .h(300);
      .left {
        float: left;
        .ml(50);
        .mt(20);
      }
      .right {
        float: right;
        .mr(50);
        .mt(20);
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    z-index: 5;
    width: 100%;
    .h(54);
    background: #fff;
    .price {
      display: inline-block;
      .w(241);
      .h(54);
      .ml(15);
      .mr(10);
      .lh(54);
      a {
        .fs(30);
      }
      ul {
        float: right;
        li {
          float: left;
        }
        .age {
          .fs(12);
          color: #999;
        }
        .money {
          .ml(10);
          .fs(14);
          span {
            .fs(13);
            color: red;
          }
          i {
            font-style: normal;
            .fs(18);
            color: rgb(255, 80, 0);
            white-space: nowrap;
            line-height: 21px;
          }
        }
      }
    }
    .btn {
      position: absolute;
      top: 0;
      display: inline-block;
      .mt(6);
      .w(95);
      .h(40);
      .lh(40);
      text-align: center;
      color: #fff;
      .border(20);
      background: -webkit-linear-gradient(left, #FE3C35 0%, #FF1F4C 100%);
      background: -o-linear-gradient(left, #FE3C35 0%, #FF1F4C 100%);
      background: linear-gradient(to right, #FE3C35 0%, #FF1F4C 100%);
    }
  }
  .error {
    width: 100%;
    height: 100vh;
    background: pink;
    text-align: center;
    line-height: 100vh;
    color: red;
    .fs(20);
  }
}
</style>
