// pages/wxLogin/wxLogin.js
import Toast from '@vant/weapp/toast/toast';
const { wxLogin } = require('../../api/wxLoginApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    let user = wx.getStorageSync('users')
    if (user) {
      Toast('以登入即将返回!')
      setTimeout(function (){
        wx.switchTab({        
          url: '/pages/my/my',
          success: function(res){
           }
        })
      }, 1500)
    }
  },
  login(e){
    let { userInfo } = e.detail
    if (!userInfo) { return false }
    wx.login({
      complete: async (res) => {
        let { code } = res
        let success = await wxLogin(code)
        if (success.code !== 0) {
          Toast('服务器繁忙稍后重试!')
        } else {
          let {token,name,openid,head} = success.user
          wx.setStorageSync('users',{token,name,openid,head})
          Toast('即将返回个人页面！')
          setTimeout(function (){
            wx.switchTab({        
              url: '/pages/my/my',
              success: function(res){
               }
            })
          }, 1500)
        }
      },
    })
  }
})