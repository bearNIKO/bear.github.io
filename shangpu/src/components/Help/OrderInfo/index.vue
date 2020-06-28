<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <p class="title">订单查询</p>
    </header>
    <section>
      <div class="nav">
        <div class="iconfont icon">
          <i class="iconfont">&#xe63c;</i>
        </div>
        <div class="search">
          <input name="search" type="text" v-model="numbers" placeholder="请输入淘宝订单编号">
          <i style="display: none;"></i>
          <button id="search" class="btn" @click="toInfo">查询</button>
        </div>
      </div>
      <div class="order_num wrapper" ref="wrapper">
        <div>
          <div class="title">如何获取订单编号？</div>
          <p class="step"><span>1.&nbsp;</span>打开手机“淘宝”<br>&nbsp;&nbsp;&nbsp;淘宝APP-我的淘宝-查看全部订单</p>
          <div class="rule_img">
            <img src="../images/rule-msg.png">
          </div>
          <p class="step"><span>2.&nbsp;</span>找到需要查询的订单，进入详情页复制订单编号<br>&nbsp;&nbsp;  订单详情页内找到订单信息，点击【复制】订单编号</p>
          <div class="rule_img">
            <img src="../images/rule-msg2.png">
          </div>
          <div class="rule_msg">
            <p class="title">查询规则说明：</p>
            <p class="msg"> 1. 购买人没同步的订单可通过订单查询找回<br>
                2. 当有多个用户同时查询同一订单编号时，以第一个输入人为准<br>
                3. 已归属的订单不支持查询。如查询，则会反馈查找不到该订单的提示<br>
                4. 奖励积分会按查找人的当前用户关系进行归属。建议购买人自查，不帮别人查询，避免误操作
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numbers: ''
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
    hisBack () {
      history.go(-1)
    },
    toInfo () {
      const Ynum = /^([+-]?)\d*\.?\d+$/
      if (!this.numbers) { return this.message('请输入订单号') }
      if (!Ynum.test(this.numbers)) { return this.message('请输入正确订单号!') }
      this.$router.push({ path: `/my/orderInfo/info/${this.numbers}` })
    }
  },
  created () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.scroll) {
        this.scroll = new this.$BScroll(this.$refs.wrapper, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          tap: true,
          mouseWheel: true
        })
      // console.log(this.scroll)
      } else if (!this.$refs.wrapper) {
        return false
      } else {
        this.scroll.refresh()
      }
    })
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/index.less';
.container {
  position: relative;
  width: 100%;
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
    position: relative;
    width: 100%;
    .nav {
      position: relative;
      width: 100%;
      .h(180);
      .pl(15);
      .pr(15);
      background: #fff;
      margin: 0 auto;
      .icon {
        position: absolute;
        .w(72);
        .h(72);
        .border(72);
        background: linear-gradient(133deg,#f9642b 0,rgba(255,52,52,.99) 100%);
        border-radius: 50%;
        top: 15%;
        left: 40%;
        i {
          position: absolute;
          display: block;
          top: 15%;
          left: 15%;
          .fs(50);
          margin: 0 auto;
          color: #fff;
        }
      }
      .search {
        .h(36);
        border-radius: 2px;
        position: absolute;
        .bottom(20);
        input {
          .h(36);
          .w(285);
          border: 1px solid #ccc;
          border-right: 0;
          .fs(14);
          .pl(6);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #4a4a4a;
          .lh(20);
        }
        .btn {
          .w(60);
          .h(38);
          border: none;
          background: linear-gradient(133deg,#f9642b 0,rgba(255,52,52,.99) 100%);
          .fs(14);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #fff;
          .lh(20);
          border-radius: 5%;
        }
      }
    }
    .order_num {
      posistion: relative;
      .h(400);
      .pd(10);
      overflow: hidden;
      background: #fff;
      .mg(10);
      .title {
        .fs(13);
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #333;
        .lh(18);
        border-bottom: 1px solid #F2F2F2;
        .pm(10);
        .ml(8);
        .mr(8);
      }
      .step {
        .fs(12);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #666;
        .lh(17);
        .mt(9);
        .mb(9);
        position: relative;
        z-index: 1;
        zoom: 1;
        .left(7);
      }
      .rule_img {
        .w(222);
        .h(195);
        .ml(18);
        .mb(20);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rule_msg {
        .pl(18);
        .pr(18);
        .mb(18);
        .title {
          .fs(13);
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: #333;
          .lh(18);
          .mb(10);
        }
        .msg {
          .fs(12);
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #666;
          .lh(17);
        }
      }
    }
  }
}
</style>
