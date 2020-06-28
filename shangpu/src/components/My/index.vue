<template  lang="html">
  <div class="container">
    <div class="user">
      <div class="user_img">
        <img src='./images/user.png' v-if="!users">
        <img v-lazy='$LocalHost+`/${users.head}`' v-if="users">
      </div>
      <div class="username" v-if="users">
        <span>{{users.name}}</span>
      </div>
      <div class="login" v-if="!users">
        <router-link to="/login">登入</router-link>
        <span>/</span>
        <router-link to="/reg">注册</router-link>
      </div>
      <router-link to="/my/setMy" class="icon">
        <img src="./images/user_icon_set.svg">
      </router-link>
    </div>
    <div class="info">
      <div class="help">
        <router-link to="/my/OrderList" class="list">
          <img src="./images/list.png">
          <span>我的订单</span>
        </router-link>
        <router-link to="/like" class="like">
          <img src="./images/love2.png">
          <span>我的收藏</span>
        </router-link>
        <router-link to="/my/footPrint" class="point">
          <img src="./images/foot.png">
          <span>我的足迹</span>
        </router-link>
      </div>
      <div class="card">
        <div class="title">常用工具</div>
        <ul class="list">
          <router-link to="/my/orderInfo" class="item">
            <img src="./images/tools6.png">
            <p>订单查询</p>
          </router-link>
          <router-link to="/my/couponHelp" class="item">
            <img src="./images/tools1.png">
            <p>新手帮助</p>
          </router-link>
          <router-link to="/my/customer" class="item">
            <img src="./images/tools2.png">
            <p>专属客服</p>
          </router-link>
          <router-link to="/my/feedBack" class="item">
            <img src="./images/tools4.png">
            <p>意见反馈</p>
          </router-link>
        </ul>
      </div>
    </div>
    <Footer class='footer'/>
  </div>
</template>

<script>
import Footer from '@/components/Footer/'
export default {
  data () {
    return {
      users: null,
      headImg: './images/user.png'
    }
  },
  name: 'my',
  components: { Footer },
  methods: {
  },
  created () {
    this.users = JSON.parse(window.localStorage.getItem('users'))
  },
  mounted () {

  }
}

</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container {
  width: 100%;
  .h(600);
  padding-top: 1px;
  background: url(./images/user_bg.png)no-repeat #f6f6f6;
  .b_s1(375);
  .user {
    width: 90%;
    .h(80);
    margin: 0 auto;
    .mt(20);
    div {
      display: inline-block;
    }
    .user_img {
      float: left;
      .w(80);
      .h(80);
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .login {
      display: inline-block;
      width: 50%;
      height: 100%;
      .fs(20);
      text-align: center;
      .lh(80);
      color: #fff;
      a {
        color: #fff;
      }
      span {
        .fs(24);
        .mr(5);
        .ml(5);
      }
    }
    .username {
      display: inline-block;
      width: 50%;
      overflow: hidden;
      height: 100%;
      .fs(20);
      .ml(10);
      .lh(80);
      color: #fff;
      span {
        .fs(24);
        .mr(5);
      }
    }
    .icon {
      float: right;
      .w(30);
      .h(30);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .info {
    width: 90%;
    margin: 0 auto;
    .mt(30);
    .help {
      position: relative;
      width: 100%;
      .h(110);
      .border(15);
      background: #fff;
      .list {
        position: absolute;
        .top(20);
        .left(30);
        .w(70);
        .h(60);
        font-size: 0;
        text-align: center;
        img {
          display: block;
          .w(40);
          .h(40);
          margin: 0 auto;
        }
        span {
          .fs(16);
          color: #666;
          font-family: PingFangSC-Light;
          font-weight: 300;
        }
      }
      .like {
        position: absolute;
        .top(20);
        .left(130);
        .w(70);
        .h(60);
        font-size: 0;
        text-align: center;
        img {
          display: block;
          .w(40);
          .h(40);
          margin: 0 auto;
        }
        span {
          .fs(16);
          color: #666;
          font-family: PingFangSC-Light;
          font-weight: 300;
        }
      }
      .point {
        position: absolute;
        .top(20);
        .right(30);
        .w(70);
        .h(60);
        font-size: 0;
        text-align: center;
        img {
          display: block;
          .w(40);
          .h(40);
          margin: 0 auto;
        }
        span {
          .fs(16);
          color: #666;
          font-family: PingFangSC-Light;
          font-weight: 300;
        }
      }
    }
    .card {
      width: 100%;
      .h(150);
      .border(8);
      .mt(18);
      background: #fff;
      .title {
        .h(45);
        border-bottom: 1px solid #eee;
        .lh(45);
        .pl(16);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        .fs(16);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #333;
      }
      .list{
        width: 100%;
        .pt(20);
        .item {
          float: left;
          .w(80);
          .h(80);
          text-align: center;
          img {
            .w(40);
            .h(40);
          }
          p {
            .fs(14);
            font-family: PingFangSC-Light;
            font-weight: 300;
            color: #666;
            .mt(2);
          }
        }
      }
    }
  }
}
</style>
