// pages/my/orderList/orderList.js
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
const { getGoodsRecommendList } = require('../../../api/goodsRecommendApi')
Page({
  data: {
    imgServer: app.config.imgServer,
    back_top_show: false,
    messageText: '温馨提示：您5月份已确认收货的订单，相应积分会在本月25日左右，自动更新到您的积分账户，并显示在“我的积分”里。积分不会清零，请耐心等待哦。感谢您的理解与支持！',
    navList: [
      { title: '全部', type: 1 },
      { title: '待付款', type: -1 },
      { title: '已付款', type: 2 }
    ],
    goodsTypeItem: [
      { name: '默认套餐a', id: 1 },
      { name: '默认套餐b', id: 2 },
      { name: '默认套餐c', id: 3 },
      { name: '默认套餐d', id: 4 }
    ],
    orderList: [
    ],
    orderListItem: [
    ],
    navType: 1,
    topNum: 0,
  },
  onLoad: function (options) {
    this.getGoodsRecommends()
  },
  onShow () {
    app.doubleClick(true)
    let orderList = wx.getStorageSync('userOrderList')
    if (orderList) {
      this.setData({ orderList: orderList })
      this.setData({ orderListItem: orderList })
    } else {
      this.setData({ orderList: [] })
      this.setData({ orderListItem: [] })
    }
  },
  // 过滤类型
  orderListFilter (data, type) {
    let arr =  data.filter(item => item.orderType==type)
    return arr
  },
  // 获取热推产品
  async getGoodsRecommends () {
    let success = await getGoodsRecommendList("all")
    if (success.err !== 0) {
      this.message(false, success.msg)
      this.setData({ goodsRecommendList: [] })
      return
    }
    let data = success.data
    this.setData({ goodsRecommendList: data })
    this.setData({ findGoods: data })
  },
  clickNavItem (e) {
    let type = e.currentTarget.dataset.type
    let data = this.data.orderList
   if (type == 1) {
    this.setData({ orderListItem: data })
   } else {
    let orderListItem = this.orderListFilter(data, type)
    this.setData({ orderListItem: orderListItem })
   }
   this.setData({ navType: type })
   this.back_top()
  },
    // 监视页面卷曲距离和返回
    back_top (e) {
    this.setData({
      topNum: 0
    });
  },
  onScrollView: function (e) {
    if (e.detail.scrollTop >= 700) {
      this.setData({ back_top_show: true })
    } else {
      this.setData({ back_top_show: false })
    }
  },
  toSearch () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/search/search'
      })
    }
  },
  toGoodsInfo (e) {
    let goodsID = e.currentTarget.dataset.goodsid
    if (goodsID) {
      if (app.globalData.canClick) {
        app.doubleClick(false);
        wx.navigateTo({
          url: '/pages/goodsInfo/goodsInfo?goodsID=' + goodsID
        })
      }
    }
  },
})