<template  lang="html">
  <div class="container">
    <header class="header">
      <router-link to="/my" class="back iconfont">&#xe618;</router-link>
      <p class="title">设置</p>
    </header>
    <section class="banner">
      <div>
        <span>个人信息</span>
        <ul>
          <li>待完善</li>
          <li class="iconfont">&#xe63d;</li>
        </ul>
      </div>
      <span></span>
      <div>
        <span>账户安全</span>
        <ul>
          <li>待授权</li>
          <li class="iconfont">&#xe63d;</li>
        </ul>
      </div>
    </section>
    <router-link to="/my/feedBack" class="feed">
      <span>意见反馈</span>
      <ul>
        <li class="iconfont">&#xe63d;</li>
      </ul>
    </router-link>
    <div class="delete" @click='removeUser' v-show="users">
      退出登入
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: null
    }
  },
  methods: {
    message (msg) {
      this.toastInstanse = this.$toast({
        message: msg,
        position: 'middle',
        duration: 2000
      })
    },
    removeUser () {
      window.localStorage.removeItem('users')
      this.message('退出成功/返回登入页面')
      setTimeout(() => { this.$router.push({ path: '/login' }) }, 2000)
    }
  },
  created () {
    this.users = JSON.parse(window.localStorage.getItem('users'))
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/index.less';
.container {
  .header {
    width: 100%;
    .h(53);
    overflow: hidden;
    background: #fff;
    border-bottom-color: transparent;
    .back {
      display: inline-block;
      .w(53);
      .h(53);
      text-align: center;
      .lh(53);
      .fs(24);
      color: #999;
    }
    .title {
      display: inline-block;
      .h(53);
      .w(80);
      .lh(53);
      .fs(19);
      margin-left: 30%;
      color: #999;
    }
  }
  .banner {
    width: 100%;
    box-sizing: border-box;
    .h(82);
    .mt(10);
    background: #fff;
    span {
      display: block;
      width: 100%;
      .h(1);
      background: #eee;
    }
    div {
      width: 100%;
      .pl(20);
      margin: 0 auto;
      .h(40);
      .lh(40);
      .fs(14);
      font-weight: 360;
      ul {
        float: right;
        height: 100%;
        .mr(10);
        li {
          float: left;
          .ml(4);
          .fs(12);
        }
        li:last-child {
          .fs(20);
          color: #999;
        }
      }
    }
    div:active {
      background: #eee;
    }
  }
  .feed {
    width: 100%;
    display: block;
    .h(40);
    .pl(20);
    background: #fff;
    margin: 0 auto;
    .mt(10);
    .h(40);
    .lh(40);
    .fs(14);
    font-weight: 360;
    ul {
      float: right;
      height: 100%;
      .mr(10);
      li {
        float: left;
        .ml(4);
        .fs(12);
      }
      li:last-child {
        .fs(20);
        color: #999;
      }
    }
  }
  .feed:active {
    background: #eee;
  }
  .delete {
    .mt(10);
    width: 100%;
    .h(50);
    background: #fff;
    .fs(18);
    color: red;
    text-align: center;
    .lh(50);
  }
  .delete:active {
    background: #eee;
  }
}
</style>
