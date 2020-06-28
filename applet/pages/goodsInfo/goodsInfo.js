// pages/goodsInfo/goodsInfo.js
import Toast from '@vant/weapp/toast/toast'
const app = getApp()
const {getGoodsInfo} = require('../../api/goodsInfoApi')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.config.imgServer,
    goodsID: '',
    showListsLinks: false,
    back_top_show: false,
    goodsNavTop: 0,
    type: 1,
    goods: null,
    goodInfos: 0,
    swiperItems: 0,
    swiperItem: 0,
    show: false,
    goodsTypeName: '套餐',
    goodsType: 0,
    maxGoodsNum: 300,
    goodsNum: 1,
    userLove: false,
    goodsTypeItem: [
      { name: '默认套餐a', id: 1 },
      { name: '默认套餐b', id: 2 },
      { name: '默认套餐c', id: 3 },
      { name: '默认套餐d', id: 4 }
    ],
    goodsCartPay: false,
    printTimeOut: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodsID = options.goodsID
    if (goodsID) {
      this.setData({ goodsID: goodsID })
    } else {
      this.setData({ goodsID: '' })
    }
    if (this.data.goodsID) {
      this.goodsInfo(this.data.goodsID)
    } else {
      Toast('没有商品信息')
      setTimeout(function () {
        if (app.globalData.canClick) {
          app.doubleClick(false);
          wx.switchTab({
            url: '/pages/odds/odds',
          })
        }
      }, 1000)
    }
  },
  onShow () {
		app.doubleClick(true)
  },
  onUnload () {
    let printTimeOut = this.data.printTimeOut
    clearTimeout(printTimeOut)
  },
  // 页面加载完成
  onReady: function () {
  },
  swiperTab: function(e) {
    this.setData({
      swiperItem: e.detail.current
    })
  },
  avtiveGoodsType (e) {
    let type = e.currentTarget.dataset.goodsType
    if (type == this.data.goodsType) {
      this.setData({ goodsType: 0 })
    } else {
      this.setData({ goodsType: type })
    }
  },
  // 商品数量
  addGoodsNum () {
    let max = this.data.maxGoodsNum
    let goodsNum = this.data.goodsNum
    if (goodsNum >= max) {
      this.setData({ goodsNum: max })
      Toast('库存不足')
    } else {
      this.setData({ goodsNum: goodsNum + 1 })
    }
  },
  removeGoodsNum () {
    let min = 1
    let goodsNum = this.data.goodsNum
    if (goodsNum <= min) {
      this.setData({ goodsNum: min })
      Toast('数量低于范围~')
    } else {
      this.setData({ goodsNum: goodsNum - 1 })
    }
  },
  // 添加到购物车
  addShopCart () {
    let goods = this.data.goods
    if (!goods) {
      return Toast('没有商品!')
    }
    let allConut = this.data.goodsNum
    let goodsType = this.data.goodsType
    if (goodsType == 0) {
      return Toast('请选择套餐')
    }
    let userCart = wx.getStorageSync('userCart')
    goods.allConut = allConut
    goods.goodsType = goodsType
    if (!userCart) {
      let data = [goods]
      wx.setStorageSync('userCart', data)
      Toast('加入成功快去剁手!')
      this.onClose()
    } else {
      userCart.push(goods)
      wx.setStorageSync('userCart', userCart)
      Toast('加入成功快去剁手!')
      this.onClose()
    }
  },
  // 提交订单
  addShopOrder () {
    let goods = this.data.goods
    if (!goods) {
      return Toast('没有商品!')
    }
    let allConut = this.data.goodsNum
    let goodsType = this.data.goodsType
    if (goodsType == 0) {
      return Toast('请选择套餐')
    }
    goods.allConut = allConut
    goods.goodsType = this.data.goodsType
    let data = JSON.stringify([goods]);
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/orders/orders?goods='+data
      })
    }
    this.onClose()
  },
  // 购物车或订单
  showPopupShopCart () {
    this.setData({ goodsCartPay: false })
    this.showPopup()
  },
  showPopupShopOrder () {
    this.setData({ goodsCartPay: true })
    this.showPopup()
  },
  // 添加收藏
  addUserLove () {
    let goods = this.data.goods
    if (!goods) {
      return Toast('暂无此商品')
    }
    let userLoves = wx.getStorageSync('userLove')
    if (userLoves) {
      let {ok, index} = this.isUserLoveOK(this.data.goodsID)
      if (ok) {
        userLoves.splice(index, 1)
        wx.setStorageSync('userLove', userLoves)
        this.setData({ userLove: false })
      } else {
        userLoves.push(goods)
        wx.setStorageSync('userLove', userLoves)
        this.setData({ userLove: true })
      }
    } else {
      wx.setStorageSync('userLove', [goods])
      this.setData({ userLove: true })
    }
  },
  isUserLoveOK (goodsID) {
    let userLoves = wx.getStorageSync('userLove')
    let ok = false
    let index = null
    if (userLoves) {
      for (let i = 0; i < userLoves.length; i++) {
        if (goodsID == userLoves[i].goodsID) {
          ok = true
          index = i
          break
        }
      }
    }
    return {ok, index}
  },
  showPopup() {
    this.setData({ show: true })
  },
  onClose() {
    this.setData({ show: false });
  },
  async goodsInfo (goodsID) {
    this.message(true)
    let success = await getGoodsInfo(goodsID)
    if (success.err !== 0) {
      this.setData({ goods: {} })
      this.message(false,`获取失败${success.msg}`)
    } else {
      this.message(false, success.msg)
      this.setData({ goods: success.data })
      this.setData({ swiperItems: this.data.goods.swiper.length})
      let { ok } = this.isUserLoveOK(success.data.goodsID)
      this.setData({ userLove: ok })
      let goods = this.data.goods
      let times = new Date().getTime()
      goods.times = times
      this.setData({
        printTimeOut: setTimeout(function () {
          let userPrint = wx.getStorageSync('userPrint')
          if (userPrint) {
            userPrint.push(goods)
            wx.setStorageSync('userPrint', userPrint)
          } else {
            wx.setStorageSync('userPrint', [goods])
          }
        }, 3000)
      })
      let that = this
      wx.createSelectorQuery().select('#goodsNav').boundingClientRect(function (rect) {
        // 节点的上边界坐标
        let top = rect.top;
        that.setData({ goodInfos: top - 50 })
      }).exec()
    }
  },
  nullMsg () {
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
  jumpProduct (e) {
    let oldType = this.data.type
    let type = e.currentTarget.dataset.type
    if (!oldType == this) {
      this.setData({ type: type })
    }
    if (type == 1) {
      this.scrollMove(0)
    } else if (type == 2) {
      this.scrollMove(this.data.goodInfos)
    }
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
    if (e.scrollTop >= 700) {
      this.setData({ back_top_show: true })
    } else {
      this.setData({ back_top_show: false })
    }
    if (e.scrollTop >= this.data.goodInfos) {
      this.setData({ type: 2 })
    } else {
      this.setData({ type: 1 })
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
  },
  toShopCart () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.switchTab({
        url: '/pages/shopcart/shopcart'
      })
    }
  },
  toOrders () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/orders/orders',
      })
    }
  }
})