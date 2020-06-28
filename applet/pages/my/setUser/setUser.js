// pages/my/setUser/setUser.js
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showClear: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let users = wx.getStorageSync('users')
    if (users) {
      this.setData({ showClear: true })
    } else {
      this.setData({ showClear: false })
    }
  },
  onShow () {
		app.doubleClick(true)
  },
  toNull () {
    Toast('暂无!')
  },
  toFeedBack () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/tool/feedBack/feedBack' 
      })
    }
  },
  clearLogin () {
    wx.removeStorageSync('users')
    Toast('注销成功即将返回！')
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/my/my',
      })
    },1000)
  }
})