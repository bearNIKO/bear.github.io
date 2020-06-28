// pages/tool/feedBack/feedBack.js
import Toast from '@vant/weapp/toast/toast'
const  { setFeedBack }  = require('../../../api/feedBackApi')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    feed_type: 1,
    textareaText: '',
    oldNum: 0,
    newsNum: 400,
    newNum: 400,
    phone: '',
    buttonShow: false,
    showListsLinks: false
  },
  onShow () {
		app.doubleClick(true)
  },
  FeedType (e) {
    let type = e.currentTarget.dataset.type
    this.setData({ feed_type: type })
  },
  phone_num (e) {
    let value = e.detail.value
    this.setData({ phone: value })
  },
  textareaed (e) {
    let value = e.detail.value
    let oldNum = e.detail.value.length
    let newsNum = this.data.newNum - oldNum
    this.setData( { oldNum: oldNum, newsNum: newsNum })
    this.setData({ textareaText: value })
    if (this.data.textareaText != '') {
      this.setData({ buttonShow: true })
    } else {
      this.setData({ buttonShow: false })
    }
  },
  submit_feed () {
    let type = this.data.feed_type
    let textareaText = this.data.textareaText
    let phone = this.data.phone
    let Yqq = /^[1-9]*[1-9][0-9]*$/
    let Yemail = /\w+((-w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
    if (textareaText.length < 5) {
      Toast('错误描述信息太少!请多写点帮助我们改善.')
      return false
    }
    if (!phone) {
      Toast('请输入联系方式!方便我们联系您改善体验.')
      return false
    }
    if (!Yqq.test(phone) && !Yemail.test(phone)) {
      Toast('QQ号或邮件格式有误')
      return false
    }
    let datas = {
      type: type,
      details: textareaText,
      information: phone
    }
    this.setFeedBack(datas)
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
  async setFeedBack (datas) {
    this.message(true)
    let sucess = await setFeedBack(datas)
    if (sucess.err !== 0) {
      this.message(false, '提交失败请稍后尝试！')
      return
    }
    this.message(false, sucess.msg)
  },
  showListsLink () {
    this.setData({ showListsLinks: !this.data.showListsLinks })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    Toast('切勿重复操作')
  },
  toMy () {
    if (app.globalData.canClick) {
      app.doubleClick(false);
      wx.switchTab({
        url: '/pages/my/my'
      })
    }
  },
})