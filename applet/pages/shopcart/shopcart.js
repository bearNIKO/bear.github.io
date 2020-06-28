// pages/shopcart/shopcart.js
import Toast from '@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp()
const { getGoodsRecommendList } = require('../../api/goodsRecommendApi')
Page({
  data: {
    imgServer: app.config.imgServer,
    back_top_show: false,
    goods_select_all: false,
    maxGoodsAge: 0,
    activeGoodsAge: 0,
    activeGoodsMoney: 0,
    goodsRecommendList: [],
    goodsEdit: true,
    userCart: [],
    topNum: 0,
    orderIsOk: false,
    goodsTypeItem: [
      { name: '默认套餐a', id: 1 },
      { name: '默认套餐b', id: 2 },
      { name: '默认套餐c', id: 3 },
      { name: '默认套餐d', id: 4 }
    ],
  },
  onLoad: function (options) {
    this.getGoodsRecommends()
  },
  onShow (e) {
    app.doubleClick(true)
    let userCart = wx.getStorageSync('userCart')
    if (userCart) {
      this.setData({ userCart: userCart })
      let {num, ok, money} = this.activeGoodsNum(userCart)
      this.setData({ goods_select_all: ok })
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
    } else {
      this.setData({ userCart: [] })
    }
    if (this.data.orderIsOk) {
      let userCart = this.data.userCart
      let data = this.deleteActiveCart(userCart)
      let {num, money} = this.activeGoodsNum(data)
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
      this.setData({ userCart: data })
      this.setData({ orderIsOk: false })
    }
  },
  // 当前商品个数增减
  addGoodsNum (e) {
    let index = e.currentTarget.dataset.index
    let userCart = this.data.userCart
    let age = userCart[index].allConut
    age++
    if (age > 20) {
      userCart[index].allConut = 20
      this.setData({ userCart: userCart })
      let {num, ok, money} = this.activeGoodsNum(userCart)
      this.setData({ goods_select_all: ok })
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
      Toast('不能再多了！')
    } else {
      userCart[index].allConut = age
      this.setData({ userCart: userCart })
      let {num, ok, money} = this.activeGoodsNum(userCart)
      this.setData({ goods_select_all: ok })
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
    }
  },
  removeGoodsNum (e) {
    let index = e.currentTarget.dataset.index
    let userCart = this.data.userCart
    let age = userCart[index].allConut
    age--
    if (age < 1) {
      userCart[index].allConut = 1
      this.setData({ userCart: userCart })
      let {num, ok, money} = this.activeGoodsNum(userCart)
      this.setData({ goods_select_all: ok })
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
      Toast('不能再少了！')
    } else {
      userCart[index].allConut = age
      this.setData({ userCart: userCart })
      let {num, ok, money} = this.activeGoodsNum(userCart)
      this.setData({ goods_select_all: ok })
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
    }
  },
  // 循环遍历选中个数
  activeGoodsNum (data) {
    let num = 0
    let ok = false
    let money = 0
    data.forEach((item) => {
      if (item.selected) {
        num ++
        money += item.allConut*item.price
      }
    })
    if (data.length == num) {
      ok = true
    }
    return {num, ok, money}
  },
  // 循环遍历删除选中的一项
  deleteActiveCart (userCart) {
    userCart = userCart.filter(item => !item.selected );
    return userCart
  },
  // 删除当前一个
  deleteCartItem (e) {
    let index = e.currentTarget.dataset.index
    let userCart = this.data.userCart
    Dialog.confirm({
      title: '警告',
      message: '你确定要删除嘛'
    }).then(() => {
      userCart.splice(index, 1)
      this.setData({ userCart: userCart })
      let {num, ok, money} = this.activeGoodsNum(userCart)
      this.setData({ goods_select_all: ok })
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
    });
  },
  getActiveGoods (userCart) {
    let arr = []
    userCart.forEach(item => {
      if (item.selected) {
        arr.push(item)
      }
    })
    return arr
  },
  // 删除选中的
  deleteActiveItem () {
    let userCart = this.data.userCart
    Dialog.confirm({
      title: '警告',
      message: '你确定要删除嘛'
    }).then(() => {
      let data = this.deleteActiveCart(userCart)
      let {num, money} = this.activeGoodsNum(data)
      this.setData({ activeGoodsAge: num })
      this.setData({ activeGoodsMoney: money })
      this.setData({ userCart: data })
    });
  },
  // 选中当前一个
  goodsSelectItem (event) {
    let goods_select_item = event.detail
    let index = event.currentTarget.dataset.index
    let userCart = this.data.userCart
    userCart[index].selected = goods_select_item
    this.setData({ userCart: userCart })
    let {num, ok, money} = this.activeGoodsNum(userCart)
    this.setData({ goods_select_all: ok })
    this.setData({ activeGoodsAge: num })
    this.setData({ activeGoodsMoney: money })
  },
  // 全选商品
  goodsSelectAll (event) {
    let goods_select_all = event.detail
    let userCart = this.data.userCart
    userCart.forEach((item) => {
      item.selected = goods_select_all
    })
    this.setData({ goods_select_all: goods_select_all })
    this.setData({ userCart: userCart })
    let {num, money} = this.activeGoodsNum(userCart)
    this.setData({ activeGoodsAge: num })
    this.setData({ activeGoodsMoney: money })
  },
  // 切换编辑
  activeEdit (e) {
    let type = e.currentTarget.dataset.type
    if (type == 1) {
      this.setData({ goodsEdit: false })
    } else if (type == 2) {
      this.setData({ goodsEdit: true })
    }
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
  },
  onNull () {
    Toast('暂无')
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
  // 提交订单
  addShopOrder () {
    let userCart = this.data.userCart
    let goods =  this.getActiveGoods(userCart)
    if (!goods.length) {
      return Toast('没有商品!')
    }
    let data = JSON.stringify(goods);
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.navigateTo({
        url: '/pages/orders/orders?goods='+data
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
  toOdds (e) {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.switchTab({
        url: '/pages/odds/odds'
      })
    }
  },
   /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let data = this.data.userCart
    wx.setStorageSync('userCart', data)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let data = this.data.userCart
    wx.setStorageSync('userCart', data)
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