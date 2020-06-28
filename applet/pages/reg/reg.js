// pages/reg/reg.js
import Toast from '@vant/weapp/toast/toast';
const { submitReg } = require('../../api/regApi')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    passWord: '',
    email: '',
    name: ''
  },
  onLoad: function (options) {

  },
  onShow () {
		app.doubleClick(true)
  },
  message (flang, msg) {
    if (flang) {
      Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...',
      });
    } else {
      Toast.clear()
      if (msg) {
        Toast(msg)
      }
    }
  },
  userNameText (e) {
    let value = e.detail.value
    this.setData({ userName: value })
  },
  passWordText (e) {
    let value = e.detail.value
    this.setData({ passWord: value })
  },
  nameText (e) {
    let value = e.detail.value
    this.setData({ name: value })
  },
  emailText (e) {
    let value = e.detail.value
    this.setData({ email: value })
  },
  deleteUser () {
    this.setData({ userName: ''})
  },
  deletePass () {
    this.setData({ passWord: '' })
  },
  deleteName () {
    this.setData({ name: ''})
  },
  deleteEmail () {
    this.setData({ email: '' })
  },
  toWxLogin () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/wxLogin/wxLogin',
      })
    }
  },
  toLogin () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  submitReg () {
    let nameValue = this.data.name
    let userValue = this.data.userName
    let passValue = this.data.passWord
    let emailValue = this.data.email
    if (!nameValue) { return Toast('用户名不能为空') }
    if (!userValue) { return Toast('用户账号不能为空') }
    if (!passValue) { return Toast('用户密码不能为空') }
    if (!emailValue) { return Toast('用户邮箱不能为空') }
    let mialS = /\w+((-w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
    let userS = /^[A-Za-z0-9_-]+$/
    if (!userS.test(userValue)&&!emailS(userValue)) { return Toast('用户账号格式不对不允许特殊符号中文') }
    if (!userS.test(passValue)) { return Toast('用户密码格式不对不允许特殊符号中文') }
    if (!mialS.test(emailValue)) { return Toast('用户邮箱格式不对不允许特殊符号中文') }
    const datas = {
      name: nameValue,
      userName: userValue,
      passWord: passValue,
      email: emailValue
    }
    this.submitUserReg(datas)
  },
  async submitUserReg (datas) {
    this.message(true)
    let sucess = await submitReg(datas)
    console.log(sucess)
    if (sucess.err !== 0) {
      return this.message(false, '注册失败'+sucess.msg)
    }
    if (sucess.err == 0) {
      wx.setStorageSync('users', sucess)
      this.message(false, sucess.msg+"即将返回个人页面！")
      setTimeout(function (){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
    } 
  },
})