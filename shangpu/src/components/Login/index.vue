<template  lang="html">
  <div class="container">
    <div class="userBox">
      <div class="img">
        <img src="./images/user.png">
      </div>
      <div class="back">
        <router-link to="/my">返回</router-link>
      </div>
      <transition name='user'>
        <div class="option" v-if="userLogin">
          <div class="user">
            <input type="text" ref="user" v-model='userValue' placeholder="请输入用户名或者邮箱">
            <span class="iconfont delete" v-show="user" @click="userEmpty">&#xe64b;</span>
          </div>
          <div class="pass">
            <input type="password" ref="password" v-model='passValue' placeholder="请输入登录密码">
            <span class="iconfont delete" v-show="pass" @click="passEmpty">&#xe64b;</span>
            <span class="eye iconfont" v-html="eyes" @click="eye"></span>
          </div>
          <div class="desc">
            <span @click="goEmailLogin">邮箱验证登录</span>
            <span><router-link to="/reg">免费注册</router-link></span>
          </div>
          <div class="login" @click="Login">
            登录
          </div>
        </div>
      </transition>
      <transition name='email'>
        <div class="email" v-if="emailLogin">
          <div class="account">
            <input type="email" v-model='emailValue' placeholder="请输入邮箱账号">
            <span class="iconfont delete" v-show="email" @click="emailEmpty">&#xe64b;</span>
          </div>
          <div class="proving">
            <input type="text" v-model='emailProving' placeholder="输入验证码">
            <span>获取验证码</span>
          </div>
          <div class="desc">
            <span @click="goUserLogin">用户名登录</span>
            <span><router-link to="/reg">免费注册</router-link></span>
          </div>
          <div class="login" @click='desc'>
            登录
          </div>
        </div>
      </transition>
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
      email: false,
      userLogin: true,
      emailLogin: false,
      userValue: '',
      passValue: '',
      emailValue: '',
      emailProving: ''
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
    goEmailLogin () {
      this.userLogin = false
      this.emailLogin = true
    },
    goUserLogin () {
      this.emailLogin = false
      this.userLogin = true
    },
    userEmpty () {
      this.userValue = ''
    },
    passEmpty () {
      this.passValue = ''
    },
    emailEmpty () {
      this.emailValue = ''
    },
    desc () {
      window.alert('因邮件接口原因,此功能无法使用请切换用户名登入')
    },
    Login () {
      if (!this.userValue) { return window.alert('用户账号不能为空') }
      if (!this.passValue) { return window.alert('用户密码不能为空') }
      const userS = /^[A-Za-z0-9_-]+$/
      if (!userS.test(this.userValue)) { return window.alert('用户账号格式不对不允许特殊符号中文') }
      const datas = {
        userName: this.userValue,
        passWord: this.passValue
      }
      this.axios({
        method: 'post',
        url: this.$LocalHost + '/user/login',
        data: QS.stringify(datas),
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(async (res) => {
        const success = await res.data
        if (success.code !== 0) {
          this.message(`登入失败${success.msg}`)
        } else {
          this.message(`${success.msg}/即将返回个人页面`)
          window.localStorage.setItem('users', JSON.stringify(success))
          setTimeout(() => { this.$router.push({ path: '/my' }) }, 2000)
        }
      }).catch(() => {
        this.message('服务器未响应请稍后再试')
      })
    }
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
@import '../../style/index.less';
.container {
  width: 100%;
  height: 100vh;
  background: #fff;
  .userBox {
    width: 90%;
    margin: 0 auto;
    .img {
      width: 100%;
      .h(200);
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
      .left(30);
      .fs(20);
      font-weight: 320;
    }
    .option {
      width: 100%;
      .mt(30);
      .h(200);
      .user {
        position: relative;
        width: 100%;
        .h(30);
        .mb(30);
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
          right: 2%;
          .bottom(10);
          .fs(16);
          color: #999;
        }
      }
      .pass {
        position: relative;
        width: 100%;
        .h(30);
        .mb(10);
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
      .desc {
        width: 100%;
        .h(30);
        .mt(20);
        .mb(20);
        span {
          float: left;
          .fs(15);
          font-weight: 320;
        }
        span:last-child {
          float: right;
        }
      }
      .login {
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
    }
    .email {
      position: absolute;
      .top(200);
      .h(90);
      width: 90%;
      .mb(20);
      .mt(30);
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
        }
        span {
          position: absolute;
          display: inline-block;
          right: 1%;
          .fs(14);
          color: black;
        }
      }
      .desc {
        width: 100%;
        .h(30);
        .mt(20);
        .mb(20);
        span {
          float: left;
          .fs(15);
          font-weight: 320;
        }
        span:last-child {
          float: right;
        }
      }
      .login {
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
    }
  }
}
.user-enter{
  opacity: 0;
}
.user-enter-to{
  opacity: 1;
}
.user-enter-active{
  transition: all 1s;
}
.user-leave{
  opacity: 1;
}
.user-leave-to{
  opacity: 0;
}
.user-leave-active{
  transition: all 0s;
}
.email-enter{
  opacity: 0;
}
.email-enter-to{
  opacity: 1;
}
.email-enter-active{
  transition: all 1s;
}
.email-leave{
  opacity: 1;
}
.email-leave-to{
  opacity: 0;
}
.email-leave-active{
  transition: all 0s;
}
</style>
