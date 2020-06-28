<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <p class="title">快速反馈</p>
      <span class="iconfont" @click="moveShow">&#xe611;</span>
    </header>
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
    <section>
      <div class="type">
        <p>反馈类型</p>
        <ul>
          <li data-type=1 :class="type == 1 ? 'active' : ''" @click='active'>9.9包邮</li>
          <li data-type=2 :class="type == 2 ? 'active' : ''" @click='active'>咚咚呛</li>
          <li data-type=3 :class="type == 3 ? 'active' : ''" @click='active'>每日半价</li>
          <li data-type=4 :class="type == 4 ? 'active' : ''" @click='active'>快速反馈</li>
        </ul>
      </div>
      <div class="text">
        <p>错误描述</p>
        <div class="box">
          <textarea maxlength="400" v-model='texts' ref="text" placeholder="请在此输入您的反馈意见" rows="10"></textarea>
        </div>
        <span class="max-text">已输入文字<b>{{num}}</b>，还可以输入<b>{{newsText}}</b></span>
      </div>
      <div class="phone">
        <input type="text" v-model='phone' maxlength="50" placeholder="请在此输入您QQ号或邮箱" name="qq">
        <p>您的宝贵建议是我们前进的动力，真诚感谢您！</p>
      </div>
      <div :class="(btnUp == 0 ?  '' : 'red')" class="button" @click="submit">
        提交
      </div>
    </section>
  </div>
</template>

<script>
import QS from 'qs'
export default {
  data () {
    return {
      show: false,
      type: 1,
      oldText: 400,
      newsText: 400,
      num: 0,
      btnUp: 0,
      texts: '',
      phone: ''
    }
  },
  methods: {
    message (msg) {
      this.$toast({
        message: msg,
        position: 'middle',
        duration: 2000
      })
    },
    hisBack () {
      history.go(-1)
    },
    moveShow () {
      this.show = !this.show
    },
    active (e) {
      this.type = e.target.dataset.type
    },
    submit () {
      const Yqq = /^[1-9]*[1-9][0-9]*$/
      const Yemail = /\w+((-w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
      if (this.$refs.text.value.length < 5) {
        return this.message('错误描述信息太少!请多写点帮助我们改善.')
      }
      if (!this.phone) {
        return this.message('请输入联系方式!方便我们联系您改善体验.')
      }
      if (!Yqq.test(this.phone) && !Yemail.test(this.phone)) {
        return this.message('QQ号或邮件格式有误')
      }
      const datas = {
        type: this.type,
        details: this.texts,
        information: this.phone
      }
      this.axios({
        method: 'post',
        url: this.$LocalHost + '/feedback',
        data: QS.stringify(datas),
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(async (res) => {
        const success = await res.data
        if (success.err !== 0) {
          this.message(`发送失败${success.msg}`)
        } else {
          this.message(success.msg)
        }
      }).catch(() => {
        this.message('服务器未响应请稍后再试')
      })
    }
  },
  watch: {
    texts () {
      if (this.$refs.text.value.length < 1) {
        this.btnUp = 0
        this.num = 0
        this.newsText = 400
        return
      }
      this.btnUp = 1
      this.newsText = this.oldText - this.$refs.text.value.length
      this.num = this.oldText - this.newsText
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/index.less';
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fff;
  .header {
    width: 100%;
    .h(53);
    overflow: hidden;
    background: red;
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
    position: absolute;
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
  section {
    width: 90%;
    margin: 0 auto;
    .pm(60);
    .type {
      width: 100%;
      .h(77);
      .mt(20);
      border-bottom: #EEE 1px solid;
      p {
        color: #666;
        .fs(15);
        font-weight: 400;
        .mb(5);
      }
      ul {
        overflow: hidden;
        margin-left: -3%;
        width: 103%;
        li {
          float: left;
          margin-left: 3%;
          margin-bottom: 3%;
          .w(76);
          .h(31);
          text-align: center;
          .lh(31);
          color: #999;
          border: 1px solid #999;
          .border(4);
        }
        .active {
          border: 1px solid red;
          color: red;
        }
      }
    }
    .text {
      position: relative;
      width: 100%;
      .h(260);
      .mt(20);
      .mb(20);
      border-bottom: 1px solid #EEE;
      p {
        color: #666;
        .fs(15);
        font-weight: 400;
        .mb(5);
      }
      .box {
        width: 100%;
        .h(197);
        overflow: hidden;
        background: #FCFAFC;
        border: 1px solid #ddd;
        .border(2);
        position: relative;
        textarea {
          width: 100%;
          .h(200);
          background: 0 0;
          position: relative;
          padding: 8px 4px 0 8px;
          .fs(14);
          box-sizing: border-box;
          outline: 0;
          border: none;
          .lh(16);
          color: #666;
          font-family: "Microsoft YaHei";
        }
      }
      span {
        position: absolute;
        .bottom(10);
        .right(8);
        color: #999;
        .fs(10);
        b {
          font-weight: 400;
          color: #FE4A65;
          .ml(3);
        }
      }
    }
    .phone {
      padding-bottom: 10px;
      border-bottom: #EEE 1px solid;
      input {
        width: 100%;
        .h(40);
        .lh(40);
        .border(2);
        .mb(18);
        .fs(13);
        padding: 0 8px;
        box-sizing: border-box;
        background: #FCFAFC;
        border: 1px solid #ddd;
        color: #666;
      }
      p {
        color: #999;
        .fs(13);
        margin: 0;
        padding: 0;
      }
    }
    .button {
      .mt(10);
      width: 100%;
      .h(45);
      .lh(45);
      .border(5);
      text-align: center;
      background: #CCC;
      .fs(20);
      color: #FFF;
      letter-spacing: 10px;
      text-indent: 10px;
    }
    .red {
      background: #FE4A65;
    }
  }
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
</style>
