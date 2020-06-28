// pages/orders/orders.js
import Toast from '@vant/weapp/toast/toast'
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp()
Page({
  data: {
    imgServer:app.config.imgServer,
    back_top_show: false,
    goodsTypeItem: [
      { name: '默认套餐a', id: 1 },
      { name: '默认套餐b', id: 2 },
      { name: '默认套餐c', id: 3 },
      { name: '默认套餐d', id: 4 }
    ],
    show: false,
    userPositions: [],
    addShow: false,
    deitShow: false,
    userPhone: '',
    userName: '',
    userPosition: '',
    userActiveIndex: 0,
    userMoren: false,
    userPositionItemIndex: 0,
    goods: [],
    goodsPrice: 0
  },

  onLoad: function (options) {
    let userPositions = wx.getStorageSync('userPositions')
    if (userPositions) {
      this.setData({ userPositions: userPositions})
    } else {
      this.setData({ userPositions: [] })
    }
    let goods = options.goods
    if (goods) {
      let data = JSON.parse(goods)
      this.setData({goods: data})
      let money = this.howMoney(this.data.goods)
      this.setData({ goodsPrice: parseFloat(money) })
    } else {
      Toast('出错请返回从试！')
    }
  },
  onShow: function () {
    app.doubleClick(true)
  },
  // 提交订单
  onSubmit () {
    let users = wx.getStorageSync('users')
    if (!users) {
      Toast('请登入')
      setTimeout(function () {
        if (app.globalData.canClick) {
          app.doubleClick(false);
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      },500)
      return
    }
    let goods = this.data.goods
    if (!goods.length) {
      return Toast('没有商品')
    }
    let userPositions = this.data.userPositions[this.data.userPositionItemIndex]
    if (!userPositions) {
      return Toast('请输入收货地址')
    }
    let data = {
      userName: userPositions.userName,
      address: userPositions.userPosition,
      phone: userPositions.userPhone,
      user: users.user?users.user:'',
      uemail: users.email?users.email:'',
      openid: users.openid?users.openid:'',
      orderList: goods,
      orderType: -1
    }
   let userOrderLists = wx.getStorageSync('userOrderList')
   if (userOrderLists.length) {
    userOrderLists.push(data)
     wx.setStorageSync('userOrderList', userOrderLists)
     if (app.globalData.canClick) {
        app.doubleClick(false);
        let pages = getCurrentPages(); 
        let prevPage = pages[ pages.length - 2 ]; 
        Toast('提交成功')
        prevPage.setData({
          orderIsOk: true
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/shopcart/shopcart?ok='+8
          })
         },500)
      }
   } else {
    wx.setStorageSync('userOrderList', [data])
    if (app.globalData.canClick) {
      app.doubleClick(false);
      let pages = getCurrentPages(); 
      let prevPage = pages[ pages.length - 2 ]; 
      prevPage.setData({
        orderIsOk: true
      })
      Toast('提交成功')
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/shopcart/shopcart?ok='+8
        })
       },500)
    }
   }
  },
  // 选中当前用户地址
  activeUserPosition (e) {
    let index = e.currentTarget.dataset.index
    this.setData({ userActiveIndex: index })
    this.setData({ show: false })
  },
  getUserPosition () {
    let data = {
      userPhone: this.data.userPhone,
      userName: this.data.userName,
      userPosition: this.data.userPosition,
      userMoren: false
    }
    wx.setStorageSync('userPositions', [data])
  },
  howMoney (goods) {
    let money = 0
    goods.forEach(element => {
      let num = element.allConut * element.price
     money += num
    });
    let str = money.toFixed(2).toString()
    money = str.replace('.','')
    return money
  },
  // 文本框输入信息
  onChangeName (e) {
    let vlaue = e.detail
    this.setData({ userName: vlaue })
  },
  onChangePhone (e) {
    let vlaue = e.detail
    this.setData({ userPhone: vlaue })
  },
  onChangePosition (e) {
    let vlaue = e.detail
    this.setData({ userPosition: vlaue })
  },
  // 文本框输入保存信息
  addUserPositionSave () {
    let userName = this.data.userName
    let userPhone = this.data.userPhone
    let userPosition = this.data.userPosition
    let userMoren = this.data.userMoren
    if (!userName) {
      return Toast('请输入收货人')
    }
    if (!userPhone) {
      return Toast('请输入手机号')
    }
    if (!userPosition) {
      return Toast('请输入详细地址')
    }
    let data = {
      userPhone: userPhone,
      userName: userName,
      userPosition: userPosition,
      userMoren: userMoren
    }
    let userPositions = wx.getStorageSync('userPositions')
    if (userPositions) {
      userPositions.push(data)
      wx.setStorageSync('userPositions', userPositions)
      this.setData({ userPositions: userPositions})
      Toast('添加成功')
    } else {
      wx.setStorageSync('userPositions', [data])
      this.setData({ userPositions: [data]})
      Toast('添加成功')
    }
    this.onAddClose()
  },
  deitUserPositionSave () {
    let index = this.data.userPositionItemIndex
    let data = this.data.userPositions
    let userName = this.data.userName
    let userPhone = this.data.userPhone
    let userPosition = this.data.userPosition
    if (!userName) {
      return Toast('请输入收货人')
    }
    if (!userPhone) {
      return Toast('请输入手机号')
    }
    if (!userPosition) {
      return Toast('请输入详细地址')
    }
    data[index].userPhone = userPhone
    data[index].userName = userName
    data[index].userPosition = userPosition
    let userPositions = wx.getStorageSync('userPositions')
    if (userPositions) {
      wx.setStorageSync('userPositions', data)
      this.setData({ userPositions: data})
      Toast('修改成功')
      this.onDeitClose()
    } else {
      wx.setStorageSync('userPositions', data)
      this.setData({ userPositions: data})
      Toast('修改成功')
      this.onDeitClose()
    }
  },
  deleteUserPositionSave () {
    Dialog.confirm({
      message: '确定要删除该地址吗？',
      asyncClose: true
    }).then(() => {
      let index = this.data.userPositionItemIndex
      let userPositions = this.data.userPositions
      userPositions.splice(index, 1)
      this.setData({userPositions: userPositions})
      wx.setStorageSync('userPositions', userPositions)
      setTimeout(() => {
        Toast('删除成功')
        this.setData({ userActiveIndex: 0 })
        Dialog.close();
        this.onDeitClose()
      }, 500);
    }).catch(() => {
      Dialog.close();
    });
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
    if (e.scrollTop >= 600) {
      this.setData({ back_top_show: true })
    } else {
      this.setData({ back_top_show: false })
    }
  },
  showPopup() {
    this.setData({ show: true })
  },
  onClose() {
    this.setData({ show: false })
  },
  showAddPopup() {
    this.setData({ addShow: true })
  },
  onAddClose() {
    this.setData({ userName: '' })
    this.setData({ userPhone: '' })
    this.setData({ userPosition: '' })
    this.setData({ addShow: false })
  },
  showDeitPopup(e) {
    let index = e.currentTarget.dataset.index
    let { userName, userPhone, userPosition } = this.data.userPositions[index]
    this.setData({ userName: userName })
    this.setData({ userPhone: userPhone })
    this.setData({ userPosition: userPosition })
    this.setData({ deitShow: true })
    this.setData({ userPositionItemIndex: index })
  },
  onDeitClose() {
    this.setData({ userName: '' })
    this.setData({ userPhone: '' })
    this.setData({ userPosition: '' })
    this.setData({ deitShow: false })
  },
})