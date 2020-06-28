// pages/index/index.js
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
const { getSwiper, getNaviGation} = require('../../api/indexWapApi')
const { getGoodsRecommendList } = require('../../api/goodsRecommendApi')
Page({
  data: {
    imgServer: app.config.imgServer,
    back_top_show: false,
    canClick: true,
    swiper: [],
    navigation: [],
    type: 0,
    topNum: 0,
    goodsRecommendList: [],
    findGoods: [],
    loveGoods: [],
    navTitle: [
      { type: 1, text: '6.18预售' },
      { type: 2, text: '美食' },
      { type: 3, text: '女装' },
      { type: 4, text: '美妆' },
      { type: 5, text: '居家日用' },
      { type: 6, text: '鞋品' },
      { type: 7, text: '数码家电' },
      { type: 8, text: '男装 ' },
      { type: 9, text: '内衣' },
      { type: 10, text: '母婴' },
      { type: 11, text: '家装家纺' },
      { type: 12, text: '文娱车品' },
      { type: 13, text: '配饰' },
      { type: 14, text: ' 箱包' }
    ],
    activeGoodsType: 1,
    findGoodsDistance: 0,
    findGoodsFixed: false
  },
  onLoad: function (options) {
    this.getIndexSwiper()
    this.getIndexNaviGation()
    this.getGoodsRecommends()
  },
  onShow () {
    app.doubleClick(true)
    let loveGoods = wx.getStorageSync('userPrint')
    if (loveGoods) {
      this.setData({ loveGoods: loveGoods })
    } else {
      this.setData({ loveGoods: [] })
    }
    
  },
  onReady: function () {
    let that = this
    wx.createSelectorQuery().select('#findGoods').boundingClientRect(function (rect) {
      // 节点的上边界坐标
      let top = rect.top;
      that.setData({ findGoodsDistance: top - 90 })
    }).exec()
  },
  async getIndexSwiper () {
    let success = await getSwiper()
    if (success.err == 0) {
      this.setData({ swiper: success.data })
    } else {
      this.setData({ swiper: [] })
    }
  },
  // 跳转商品信息
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
  async getIndexNaviGation () {
    let success = await getNaviGation()
    if (success.err == 0) {
      this.setData({ navigation: success.data })
    } else {
      this.setData({ navigation: [] })
    }
  },
  activeGoods (e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      topNum: this.data.findGoodsDistance
    })
    if (type == 1 ) {
      this.setData({ goodsRecommendList: this.data.findGoods })
      this.setData({ activeGoodsType: type })
    } else if (type == 2) {
      this.setData({ goodsRecommendList: this.data.loveGoods })
      this.setData({ activeGoodsType: type })
    }
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
  navWrapperActive (e) {
    let type = e.currentTarget.dataset.type
    this.setData({ type: type })
    Toast('暂无')
  },
   // 监视页面卷曲距离和返回
   back_top (e) {
    this.setData({
      topNum: 0
    });
  },
  onScrollView: function (e) {
    if (e.detail.scrollTop >= 800) {
      this.setData({ back_top_show: true })
    } else {
      this.setData({ back_top_show: false })
    }
    if (e.detail.scrollTop > this.data.findGoodsDistance + 90 ) {
      this.setData({ findGoodsFixed: true })
    } else {
      this.setData({ findGoodsFixed: false })
    }
  },
  onNull () {
    Toast('暂无')
  },
  toPage (e) {
    if (app.globalData.doubleClick) {
      app.doubleClick(false);
      let path = ''
      path = e.currentTarget.dataset.path
      console.log(path)
      wx.navigateTo({
        url: path
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
  toSearch () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/search/search'
      })
    }
  }
})