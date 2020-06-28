// pages/my/footPrint/footPrint.js
import Dialog from '@vant/weapp/dialog/dialog'
const app = getApp()
import Toast from '@vant/weapp/toast/toast'
const { getGoodsRecommendList } = require('../../../api/goodsRecommendApi')
Page({
  data: {
    imgServer: app.config.imgServer,
    back_top_show: false,
    show: false,
    topNum: 0,
    userPrints: [],
    onLoadShow: true,
    showDelete: false,
    delBtnWidth: 170,
    printLeft: 0,
    goodsRecommendList: [],
    titleShow: true
  },
  onLoad: function (options) {
    this.getGoodsRecommends()
  },
  onReady: function () {
    this.setData({ onLoadShow: false })
  },
  onShow () {
    app.doubleClick(true)
    let prints = wx.getStorageSync('userLove')
    if (prints) {
      this.setData({ userPrints: prints })
    } else {
      this.setData({ userPrints: [] })
      Toast('暂无收藏!')
    }
  },
  // 弹出框
  onClose() {
    this.setData({ show: false });
  },
  showDialog() {
    Dialog.confirm({
      message: '确定清空收藏吗？',
    }).then(() => {
     let prints = wx.getStorageSync('userLove')
     if (prints) {
       wx.removeStorageSync('userLove')
       this.setData({ userPrints: [] })
       Toast('删除成功！')
     }
    }).catch(() => {
    });
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
  },
  // 删除足迹记录
  delPrintItem (e) {
    let index = e.currentTarget.dataset.index
    let prints = this.data.userPrints
    prints.splice(index, 1)
    this.setData({ userPrints: prints })
    this.setData({ printLeft: 0 })
    wx.setStorageSync('userLove', prints)
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
  toIndex () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})