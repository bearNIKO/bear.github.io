// pages/tool/orderInfo/orderInfoItem/orderInfoItem.js
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let searchItem = options.order
    if (!searchItem) {
      Toast('请重新查！')
    } else {
      Toast('没有此订单数据！')
    }
  },
  onShow () {
		app.doubleClick(true)
  },
  backOrderInfo () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateBack({
        delta: 1
      })
    }
  }
})