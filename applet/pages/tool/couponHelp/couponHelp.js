// pages/tool/couponHelp/couponHelp.js
const { config } = getApp()
Page({
  data: {
    imgServer:config.imgServer,
    imgList: [
      { img: '/static/couponHelp/ant_01.jpg' },
      { img: '/static/couponHelp/ant_02.jpg' },
      { img: '/static/couponHelp/ant_03.jpg' },
      { img: '/static/couponHelp/ant_04.jpg' },
      { img: '/static/couponHelp/ant_05.jpg' },
      { img: '/static/couponHelp/ant_06.jpg' },
      { img: '/static/couponHelp/ant_07.jpg' }
    ],
    back_top_show: false
  },
  onLoad: function (options) {

  },
  show () {
    console.log('aa')
    this.setData({ back_top_show: !this.data.back_top_show })
  },
  back_top (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onPageScroll: function (e) {
    if (e.scrollTop >= 800) {
      this.setData({ back_top_show: true })
    } else {
      this.setData({ back_top_show: false })
    }
  }
})