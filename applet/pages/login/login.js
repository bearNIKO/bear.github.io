// pages/login/login.js
import Toast from '@vant/weapp/toast/toast';
const { submitUser } = require('../../api/loginApi')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    passWord: ''
  },
  onLoad: function (options) {
    let user = wx.getStorageSync('users')
    if (user) {
      Toast('以登入即将返回!')
      setTimeout(function (){
        if (app.globalData.canClick) {
          app.doubleClick(false);
          wx.switchTab({        
            url: '/pages/my/my',
            success: function(res){
             }
          })
        }
      }, 1500)
    }
  },
  onShow () {
		app.doubleClick(true)
  },
  userNameText (e) {
    let value = e.detail.value
    this.setData({ userName: value })
  },
  passWordText (e) {
    let value = e.detail.value
    this.setData({ passWord: value })
  },
  deleteUser () {
    this.setData({ userName: ''})
  },
  deletePass () {
    this.setData({ passWord: '' })
  },
  toWxLogin () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/wxLogin/wxLogin'
      })
    }
  },
  toReg () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/reg/reg',
      })
    }
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
  async submitUserPass (datas) {
    this.message(true)
    let sucess = await submitUser(datas)
    console.log(sucess)
    if (sucess.code !== 0) {
      return this.message(false, '登入失败'+sucess.msg)
    }
    if (sucess.code == 0) {
      wx.setStorageSync('users', sucess)
      this.message(false, sucess.msg+"即将返回个人页面！")
      setTimeout(function (){
        if (app.globalData.canClick) {
          app.doubleClick(false);
          wx.navigateBack({
            url: '/pages/my/my',
          })
        }
      }, 1000)
    } 
  },
  submitUsers () {
    let userValue = this.data.userName
    let passValue = this.data.passWord
    if (!userValue) { return Toast('用户账号不能为空') }
    if (!passValue) { return Toast('用户密码不能为空') }
    let userS = /^[A-Za-z0-9_-]+$/
    let emailS = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
    if (!userS.test(userValue)&&!emailS(userValue)) { return Toast('用户账号格式不对不允许特殊符号中文') }
    if (!userS.test(passValue)) { return Toast('用户密码格式不对不允许特殊符号中文') }
    let datas = {
      userName: userValue,
      passWord: passValue
    }
    this.submitUserPass(datas)
  }
})