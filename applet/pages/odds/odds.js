// pages/odds/odds.js
import Toast from '@vant/weapp/toast/toast'
const {getOdds} = require('../../api/oddsApi')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showListsLinks: false,
    imgServer: app.config.imgServer,
    nine_tab: [
      {
        data: [
          { title: '9块9每日精选', class: 'Pink', text: '十元封顶', imgUrl: '/static/ninewap/nineTab/01.jpg' },
          { title: '粽香四溢', class: 'Cyan', text: '传统味道', imgUrl: '/static/ninewap/nineTab/02.jpg' },
          { title: '美妆必备', class: 'Purple', text: '"妆"出精致', imgUrl: '/static/ninewap/nineTab/03.jpg' }
        ]
      },
      {
        data: [
          { title: '19.9元专区', class: 'red', text: '半价抢不停', imgUrl: '/static/ninewap/nineTab/04.jpg' },
          { title: '驱蚊止痒', class: 'green', text: '不怕蚊虫', imgUrl: '/static/ninewap/nineTab/05.jpg' },
          { title: '潮流T恤', class: 'Red', text: '清凉一夏', imgUrl: '/static/ninewap/nineTab/06.jpg' }
        ]
      }
    ],
    fixed: false,
    backBox: false,
    goods: {},
    active: 1,
    code: 21,
    nav_tab: [
      { title: '精选', code: 21 },
      { title: '美食', code: 22 },
      { title: '居家百货', code: 23 },
      { title: '服装', code: 24 },
      { title: '美妆', code: 25 },
      { title: '配饰', code: 26 },
      { title: '数码配件', code: 27 },
      { title: '内衣', code: 28 },
      { title: '文品', code: 29 },
      { title: '箱包', code: 30 },
      { title: '母婴', code: 31 }
    ],
    back_top_show: false,
    goodsNavTop: 0,
    goodsNavFixed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods()
    let that = this
    wx.createSelectorQuery().select('#goodsNav').boundingClientRect(function (rect) {
      // 节点的上边界坐标
      let top = rect.top;
      that.setData({ goodsNavTop: top - 50 })
    }).exec()
  },
  onShow () {
		app.doubleClick(true)
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
  onToastErr () {
    Toast('暂无')
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
  navSearch (e) {
    let code = e.currentTarget.dataset.code
    this.setData({ code: code })
    this.getGoods(code)
  },
  async getGoods () {
    let code = this.data.code
    let success = await getOdds(code)
    if (success.err !== 0) {
      this.message(false, success.msg)
      this.setData({ goods: {} })
      return
    }
    let data = success.data
    this.message(false, '获取成功')
    this.setData({ goods: data })
    this.scrollMove(this.data.goodsNavTop)
  },
  showListsLink () {
    this.setData({ showListsLinks: !this.data.showListsLinks })
  },
  back_top (e) {
    this.scrollMove(0)
  },
  scrollMove (y) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: y
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onPageScroll: function (e) {
    if (e.scrollTop >= 400) {
      this.setData({ back_top_show: true })
    } else {
      this.setData({ back_top_show: false })
    }
    if (e.scrollTop >= this.data.goodsNavTop) {
      this.setData({ goodsNavFixed: true })
    } else {
      this.setData({ goodsNavFixed: false })
    }
  },
  toIndex () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  toSearch () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/search/search',
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
  toFeedBack () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/tool/feedBack/feedBack',
      })
    }
  },
  toMy () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.switchTab({
        url: '/pages/my/my'
       })
    }
  }
})