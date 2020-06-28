// pages/my/my.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    usersName: '',
    usersImg: '',
    imgServer: app.config.imgServer
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow () {
    app.doubleClick(true)
    let users = wx.getStorageSync('users')
    if (users) {
      this.setData({ usersName: users.name, usersImg: users.head })
    } else {
      this.setData({ usersName: '', usersImg: '' })
    }
  },
  toCouponHelp () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/tool/couponHelp/couponHelp' 
      })
    }
  },
  topFeedBack () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/tool/feedBack/feedBack' 
      })
    }
  },
  toCustomer () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/tool/customer/customer' 
      })
    }
  },
  toOrderInfo () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/tool/orderInfo/orderInfo' 
      })
    }
  },
  toLogin () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/login/login' 
      })
    }
  },
  toReg () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/reg/reg' 
      })
    }
  },
  toSetUser () { 
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/my/setUser/setUser' 
      })
    }
  },
  toOrderList () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/my/orderList/orderList' 
      })
    }
  },
  toCollection () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/my/collection/collection' 
      })
    }
  },
  toFootPrint () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/my/footPrint/footPrint' 
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})