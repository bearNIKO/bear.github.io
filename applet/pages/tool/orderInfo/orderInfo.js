// pages/tool/orderInfo/orderInfo.js
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchItem: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow () {
		app.doubleClick(true)
  },
  searchList (e) {
    let value = e.detail.value
    this.setData({ searchItem: value })
  },
  sublimeSearch () {
    let searchItem = this.data.searchItem
    if (searchItem == '') {
      Toast('请输入订单号')
      return false
    }
    let Ynum = /^[A-Za-z0-9]+$/
    if (!Ynum.test(searchItem)) { 
      Toast('请输入正确订单号!') 
      return false 
    }
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: `/pages/tool/orderInfo/orderInfoItem/orderInfoItem?order=${searchItem}`
      })
    }
  }
})