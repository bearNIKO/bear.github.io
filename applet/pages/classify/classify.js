// pages/classify/classify.js
const  { getClassify }  = require('../../api/classifyApi')
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.config.imgServer,
    Shopping: [
      { id: 1, code: 25, name: '为你推荐', router: '/index/lay/25' },
      { id: 2, code: 26, name: '精品推荐', router: '/index/lay/26' },
      { id: 3, code: 27, name: '女装', router: '/index/lay/27' },
      { id: 4, code: 28, name: '男装', router: '/index/lay/28' },
      { id: 5, code: 29, name: '化妆', router: '/index/lay/29' },
      { id: 6, code: 30, name: '美食', router: '/index/lay/30' },
      { id: 7, code: 31, name: '居家用品', router: '/index/lay/31' },
      { id: 8, code: 32, name: '鞋品', router: '/index/lay/32' },
      { id: 9, code: 33, name: '数码家电', router: '/index/lay/33' },
      { id: 10, code: 34, name: '文娱车品', router: '/index/lay/34' },
      { id: 11, code: 35, name: '内衣', router: '/index/lay/35' },
      { id: 12, code: 36, name: '母婴', router: '/index/lay/36' },
      { id: 13, code: 37, name: '箱包', router: '/index/lay/37' },
      { id: 14, code: 38, name: '配饰', router: '/index/lay/38' },
      { id: 15, code: 39, name: '家装家纺', router: '/index/lay/39' },
      { id: 16, code: 40, name: '户外运动', router: '/index/lay/40' }
    ],
    products: [],
    code: 25
  },
  classifySearch (e) {
    let code = e.currentTarget.dataset.code
    this.setData({code: code})
    this.getClassify()
  },
  async classifyItem () {
    await Toast('暂无数据')
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getClassify()
  },
  onShow () {
		app.doubleClick(true)
  },
  async getClassify () {
    this.message(true)
    let code = this.data.code
    let datas = await getClassify(code)
    if (datas.err !== 0) {
      this.message(false, '获取失败')
      this.setData({ products: [] })
      return
    }
    this.message(false, '获取成功')
    this.setData({ products: datas.data })
  },
  // 返回上一级路由
  historyBack () {
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
})