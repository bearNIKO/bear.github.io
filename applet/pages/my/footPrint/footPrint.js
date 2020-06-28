// pages/my/footPrint/footPrint.js
import Dialog from '@vant/weapp/dialog/dialog'
const app = getApp()
import Toast from '@vant/weapp/toast/toast'
Page({
  data: {
    imgServer: app.config.imgServer,
    back_top_show: false,
    show: false,
    topNum: 0,
    userPrints: [],
    onLoadShow: true,
    userTouchStartNum: 0,
    userTouchEndNum: 60,
    showDelete: false,
    delBtnWidth: 170,
    printLeft: 0
  },
  onLoad: function (options) {
    let prints = wx.getStorageSync('userPrint')
    if (prints) {
      this.setData({ userPrints: prints })
    } else {
      this.setData({ userPrints: [] })
      Toast('暂无足迹!')
    }
  },
  onReady: function () {
    this.setData({ onLoadShow: false })
  },
  onShow () {
		app.doubleClick(true)
  },
  // 弹出框
  onClose() {
    this.setData({ show: false });
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
  showDialog() {
    Dialog.confirm({
      message: '确定清空浏览记录吗？',
    }).then(() => {
     let prints = wx.getStorageSync('userPrint')
     if (prints) {
       wx.removeStorageSync('userPrint')
       this.setData({ userPrints: [] })
       Toast('删除成功！')
     }
    }).catch(() => {
    });
  },
  // 删除足迹记录
  delPrintItem (e) {
    let index = e.currentTarget.dataset.index
    let prints = this.data.userPrints
    prints.splice(index, 1)
    this.setData({ userPrints: prints })
    this.setData({ printLeft: 0 })
    wx.setStorageSync('userPrint', prints)
  },

  // 监视页面卷曲距离和返回
  back_top (e) {
    this.setData({
      topNum: 0
    });
  },
  onScrollView: function (e) {
    if (e.detail.scrollTop >= 500) {
      this.setData({ back_top_show: true })
    } else {
      this.setData({ back_top_show: false })
    }
  },

})