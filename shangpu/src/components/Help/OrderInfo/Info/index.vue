<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <p class="title">查询结果</p>
    </header>
    <section>
      <div class="order_null" style="display: block;">
        <div class="logo"><img src="../../images/download.png"></div>
        <div class="msg">未查到该订单</div>
        <div class="info">
          <p class="title">未查询到订单的可能原因：</p>
          <p class="step">
            1. 订单有延迟，建议下单后15分钟再查询<br>
            2. 非您购买的订单<br>
            3. 不是通过小咪购下的订单<br>
            4. 创建订单超过40分钟付费，次日才能同步<br>
            5. 超出7天的订单无法找回
          </p>
        </div>
        <button class="btn order_search_btn goback_search" @click="back">重新查询</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orederGoodID: null
    }
  },
  methods: {
    hisBack () {
      history.go(-1)
    },
    back () {
      this.$router.push({ path: '/my/orderInfo' })
    }
  },
  mounted () {
    this.orederGoodID = this.$route.params.id
    console.log(this.orederGoodID)
  }
}
</script>

<style lang="less" scoped>
@import '../../../../style/index.less';
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #eee;
  .header {
    width: 100%;
    .h(53);
    overflow: hidden;
    background: #fff;
    border-bottom-color: transparent;
    border-bottom: solid 1px #ddd;
    .back {
      display: inline-block;
      .w(53);
      .h(53);
      text-align: center;
      .lh(53);
      .fs(24);
      color: #333;
    }
    .title {
      display: inline-block;
      .h(53);
      .w(80);
      .lh(53);
      .fs(19);
      margin-left: 27%;
      color: #333;
    }
  }
  section {
    .mt(10);
    .mb(10);
    height: 88%;
    background: #fff;
    .order_null {
      display: none;
      .pt(20);
      .pm(20);
      .pl(10);
      .pr(10);
      .h(540);
      overflow: hidden;
      .logo {
        width: 150px;
        .w(150);
        .h(139);
        margin: 0 auto;
        .mt(21);
        .mb(10);
        box-sizing: border-box;
        img {
          .w(150);
          .h(139);
        }
      }
      .msg {
        margin: 0 auto;
        .mb(10);
        .w(108);
        .h(25);
        .lh(25);
        .fs(18);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #4a4a4a;
      }
      .info {
        .h(130);
        .pd(16);
        .pl(20);
        .pr(20);
        .border(10);
        background: #f6f6f6;
      }
      .order_search_btn {
        .w(320);
        .h(48);
        background: linear-gradient(to left, #ff4950 0%, #fb8d2c 100%);
        border: none;
        .border(4);
        display: block;
        margin: 20px auto auto;
        .mt(20);
        .fs(15);
        color: #fff;
        .lh(21);
      }
    }
  }
}
</style>
