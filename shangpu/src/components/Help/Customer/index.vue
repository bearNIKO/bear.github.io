<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <p class="title">专属客服</p>
    </header>
    <nav class="nav">
      <ul>
        <li>
          <h3>专属客服</h3>
          <p>您有任何问题欢迎联系我们</p>
        </li>
        <li>
          <img src="../images/customer.jpg">
        </li>
      </ul>
    </nav>
    <section class="banner">
      <ul>
        <li>
          <div class="iconfont qq_logo">&#xe602;</div>
          <div>
            <p>客服QQ号</p>
            <span>1398909445</span>
            <span @click="copy">复制</span>
          </div>
        </li>
        <li>
          <div class="iconfont qq_logo">&#xe602;</div>
          <div>
            <p>客服QQ号</p>
            <span>1398909445</span>
            <span @click="copy">复制</span>
          </div>
        </li>
        <li>
          <div class="iconfont qq_logo">&#xe617;</div>
          <div>
            <p>客服QQ号</p>
            <a href="tel:3488553493">
            <span>1398909445</span>
            <span>拨打</span>
            </a>
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <p>您在使用的过程中遇到任何问题，都可通过以上方式与我们联系！</p>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {

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
    backTop () {
      document.documentElement.scrollTop = 0
    },
    copy () {
      const save = (e) => {
        e.clipboardData.setData('text/plain', '1398909445')
        e.preventDefault()
      }
      document.addEventListener('copy', save)
      document.execCommand('copy')
      this.message('复制成功快去粘贴')
    }
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
  }
  .nav {
    width: 100%;
    .h(120);
    background: #fff;
    border-top: 1px solid #eee;
    ul {
      width: 88%;
      height: 100%;
      margin: 0 auto;
      li:first-child {
        .mt(40);
        float: left;
        display: inline-bolck;
        h3 {
          .mb(2);
          .fs(20);
          font-weight: 340;
        }
        p{
          .fs(14);
          color: #999;
        }
      }
      li:last-child {
        float: right;
        display: inline-block;
        .mt(15);
        .h(90);
        .w(90);
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  .banner{
    width: 100%;
    .h(261);
    margin: 0 auto;
    .mt(12);
    background: #fff;
    ul {
      width: 94%;
      height: 100%;
      margin: 0 auto;
      li {
        .h(87);
        width: 100%;
        div {
          float: left;
          .mt(24);
          align-items: baseline;
          p {
            .fs(16);
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #4a4a4a;
          }
          span {
            .fs(14);
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #9b9b9b;
          }
          span:last-child {
            display: inline-block;
            .w(40);
            .h(20);
            .ml(20);
            text-align: center;
            .lh(20);
            .border(6);
            background: linear-gradient(270deg,rgba(249,100,43,.1) 0,rgba(255,52,52,.1) 100%);
            .fs(12);
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #fe3a33;
          }
        }
        .qq_logo {
          .fs(28);
          .ml(5);
          .mr(20);
          .mt(30);
          color: red;
        }
      }
      li:nth-child(2) {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
    }
  }
  footer {
    width: 94%;
    margin: 0 auto;
    .mt(40);
    p {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #9b9b9b;
      .fs(12);
    }
  }
}
</style>
