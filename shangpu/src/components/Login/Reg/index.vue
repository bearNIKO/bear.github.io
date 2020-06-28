<template  lang="html">
  <div class="container wrapper" ref="wrapper">
    <div class="box">
      <div class="back">
        <router-link to="/login">返回</router-link>
      </div>
      <div class="img">
        <img src="../images/user.png">
      </div>
      <div class="option">
        <div class="name">
          <input type="text" v-model='nameValue' placeholder="请输入名称">
          <span class="iconfont delete" v-show="name" @click="nameEmpty">&#xe64b;</span>
        </div>
        <div class="user">
          <input type="text" v-model='userValue' placeholder="请输入用户账号">
          <span class="iconfont delete" v-show="user" @click="userEmpty">&#xe64b;</span>
        </div>
        <div class="pass">
          <input type="password" ref="password" v-model='passValue' placeholder="请输入登录密码">
          <span class="iconfont delete" v-show="pass" @click="passEmpty">&#xe64b;</span>
          <span class="eye iconfont" v-html="eyes" @click="eye"></span>
        </div>
        <div class="email">
          <div class="account">
            <input type="email" v-model='emailValue' placeholder="请输入邮箱账号">
            <span class="iconfont delete" v-show="email" @click="emailEmpty">&#xe64b;</span>
          </div>
          <div class="proving">
            <input type="text" v-model='emailProving' disabled="disabled" placeholder="输入验证码">
            <span>获取验证码</span>
          </div>
        </div>
        <div class="desc">
          <span>
            <router-link to="/login">用户名登入</router-link>
          </span>
        </div>
        <div class="reg" @click='Reg'>
          同意协议并注册
        </div>
        <div class="product">
          <input type="checkbox" @click="treaty">
          <span>阅读协议。。。。。</span>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
import QS from 'qs'
export default {
  data () {
    return {
      eyes: '&#xe819;',
      eyesShow: false,
      user: false,
      pass: false,
      name: false,
      email: false,
      treatys: false,
      toastInstanse: null,
      userValue: '',
      passValue: '',
      nameValue: '',
      emailValue: '',
      emailProving: '此功能无法使用因邮件接口问题'
    }
  },
  methods: {
    eye () {
      this.eyesShow = !this.eyesShow
      if (!this.eyesShow) {
        this.eyes = '&#xe819;'
        this.$refs.password.type = 'password'
      } else {
        this.eyes = '&#xe640;'
        this.$refs.password.type = 'text'
      }
    },
    message (msg) {
      this.toastInstanse = this.$toast({
        message: msg,
        position: 'middle',
        duration: 2000
      })
    },
    userEmpty () {
      this.userValue = ''
    },
    passEmpty () {
      this.passValue = ''
    },
    nameEmpty () {
      this.nameValue = ''
    },
    emailEmpty () {
      this.emailValue = ''
    },
    treaty () {
      this.treatys = !this.treatys
    },
    Reg () {
      if (!this.treatys) { return window.alert('请选中我已阅读') }
      if (!this.nameValue) { return window.alert('用户名不能为空') }
      if (!this.userValue) { return window.alert('用户账号不能为空') }
      if (!this.passValue) { return window.alert('用户密码不能为空') }
      if (!this.emailValue) { return window.alert('用户邮箱不能为空') }
      const mials = /\w+((-w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
      if (!mials.test(this.emailValue)) { return window.alert('用户邮箱格式不对') }
      const datas = {
        name: this.nameValue,
        userName: this.userValue,
        passWord: this.passValue,
        email: this.emailValue
      }
      this.axios({
        method: 'post',
        url: this.$LocalHost + '/user/reg',
        data: QS.stringify(datas),
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(async (res) => {
        const success = await res.data
        if (success.err !== 0) {
          this.message(`注册失败${success.msg}`)
        } else {
          this.message(`${success.msg}/即将返回登入页面`)
          setTimeout(() => { this.$router.push({ path: '/login' }) }, 3000)
        }
      }).catch(() => {
        this.message('服务器未响应请稍后再试')
      })
    }
  },
  created () {

  },
  mounted () {
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
  watch: {
    userValue () {
      if (this.userValue === '') {
        this.user = false
      } else {
        this.user = true
      }
    },
    passValue () {
      if (this.passValue === '') {
        this.pass = false
      } else {
        this.pass = true
      }
    },
    nameValue () {
      if (this.nameValue === '') {
        this.name = false
      } else {
        this.name = true
      }
    },
    emailValue () {
      if (this.emailValue === '') {
        this.email = false
      } else {
        this.email = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/index.less';
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  .box {
    position: relative;
    width: 90%;
    margin: 0 auto;
    .img {
      width: 100%;
      .h(180);
      text-align: center;
      .lh(380);
      img {
        .w(100);
        .h(100);
        margin: 0 auto;
      }
    }
    .back {
      position: absolute;
      .w(50);
      .h(50);
      .top(20);
      .left(10);
      .fs(20);
      font-weight: 320;
    }
    .option {
      width: 100%;
      .mt(30);
      .h(400);
      .user {
        position: relative;
        width: 100%;
        .h(30);
        .mb(20);
        input {
          width: 100%;
          height: 100%;
          border: 0;
          outline: none;
          border-bottom: 1px solid red;
          text-indent: 0.5em;
          .fs(16);
          font-weight: 300;
        }
        .delete {
          position: absolute;
          right: 1%;
          .bottom(10);
          .fs(16);
          color: #999;
        }
      }
      .name {
        position: relative;
        width: 100%;
        .h(30);
        .mb(20);
        input {
          width: 100%;
          height: 100%;
          border: 0;
          outline: none;
          border-bottom: 1px solid red;
          text-indent: 0.5em;
          .fs(16);
          font-weight: 300;
        }
        .delete {
          position: absolute;
          right: 1%;
          .bottom(10);
          .fs(16);
          color: #999;
        }
      }
      .pass {
        position: relative;
        width: 100%;
        .h(30);
        .mb(20);
        input {
          width: 100%;
          height: 100%;
          border: 0;
          outline: none;
          border-bottom: 2px solid red;
          text-indent: 0.5em;
          .fs(16);
          font-weight: 300;
        }
        .delete {
          position: absolute;
          right: 8%;
          .bottom(10);
          .fs(16);
          color: #999;
        }
        .eye {
          position: absolute;
          right: 0;
          .bottom(8);
          .fs(20);
          color: #999;
        }
      }
      .email {
        position: relative;
        width: 100%;
        .h(90);
        .mb(20);
        .account {
          position: relative;
          width: 100%;
          .h(30);
          .mb(20);
          input {
            width: 100%;
            height: 100%;
            border: 0;
            outline: none;
            border-bottom: 1px solid red;
            text-indent: 0.5em;
            .fs(16);
            font-weight: 300;
          }
          .delete {
            position: absolute;
            right: 1%;
            .bottom(10);
            .fs(16);
            color: #999;
          }
        }
        .proving {
          position: relative;
          width: 100%;
          .h(30);
          .mb(10);
          input {
            width: 100%;
            height: 100%;
            border: 0;
            outline: none;
            border-bottom: 1px solid red;
            text-indent: 0.5em;
            .fs(16);
            font-weight: 300;
            background: #fff;
          }
          span {
            position: absolute;
            display: inline-block;
            right: 1%;
            .fs(14);
            color: black;
          }
        }
      }
      .desc {
        width: 100%;
        .h(30);
        .mt(20);
        .mb(20);
        span {
          float: left;
          .fs(16);
          font-weight: 340;
        }
      }
      .reg {
        width: 100%;
        .h(40);
        text-align: center;
        .fs(16);
        color: #fff;
        .lh(40);
        .border(20);
        background: -moz-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
        background: -webkit-gradient(linear,left top,left right,color-stop(0,#FA4DBE),color-stop(100%,#FBAA58));
        background: -webkit-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
        background: -o-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
        background: -ms-linear-gradient(left,#FA4DBE 0,#FBAA58 100%);
        background: linear-gradient(to left,#FA4DBE 0,#FBAA58 100%);
        border-bottom-color: transparent;
      }
      .product {
        position: relative;
        width: 100%;
        .h(30);
        .mt(10);
        .fs(15);
        .lh(30);
        font-weight: 350;
        input {
          position: absolute;
          .w(20);
          .h(20);
          .top(5);
          .left(10);
          border: 1px solid black;
          appearance: button;
        }
        span{
          .ml(40);
        }
      }
    }
  }
}
</style>
