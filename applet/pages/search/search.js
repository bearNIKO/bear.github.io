// pages/search/search.js
import Toast from '@vant/weapp/toast/toast';
const { config } = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgServer:config.imgServer,
    hots: [
      { rank: '/static/hot/rank1.png', hot: '爆', type: 1, image: '/static/hot/01.jpg', title: '骑行安全，头盔来守护！', number: '25460' },
      { rank: '/static/hot/rank2.png', hot: '荐', type: 1, image: '/static/hot/02.png', title: '中华传统美食，粽香四溢', number: '22667' },
      { rank: '/static/hot/rank3.png', hot: '火', type: 1, image: '/static/hot/03.png', title: '随时随地静享音乐~', number: '25789' },
      { rank: '/static/hot/rank4.png', type: 2, image: '/static/hot/04.png', title: '一张瑜伽垫搞定小腹赘肉', number: '22345' },
      { rank: '/static/hot/rank5.png', hot: '新', type: 2, image: '/static/hot/05.jpg', title: '撑起一片属于你的晴天', number: '20165' },
      { rank: '/static/hot/rank6.png', type: 2, image: '/static/hot/06.jpg', title: '有了它，清凉一整夏！', number: '13456' },
      { rank: '/static/hot/rank7.png', hot: '新', type: 2, image: '/static/hot/07.jpg', title: '一口松软，吃出新鲜感~', number: '42122' },
      { rank: '/static/hot/rank8.png', type: 2, image: '/static/hot/08.jpg', title: '“被”感透气，舒享夏日', number: '33245' },
      { rank: '/static/hot/rank9.png', type: 2, image: '/static/hot/09.jpg', title: '这条神裤超显瘦！', number: '12344' },
      { rank: '/static/hot/rank10.png', hot: '荐', type: 3, image: '/static/hot/10.jpg', title: '墨镜一戴，秒变小V脸！', number: '23344' }
    ],
    searchInfo: [
      '螺蛳粉', '零食', '纸抽', '洗脸巾', '电动牙刷', '洗衣液', '冰柚'
    ],
    hisSearchInfo: [],
    inputSearchItem: '',
    hisSearchListShow: false
  },
  onLoad: function (options) {
    let searchDatas = wx.getStorageSync('userSearch')
    if (searchDatas) {
      this.setData({ hisSearchInfo: searchDatas })
    } else {
      this.setData({ hisSearchInfo: [] })
    }
  },
  searchItem (e) {
    let value = e.detail.value
    this.setData({ inputSearchItem: value })
  },
  addSearchItem () {
    if (!this.data.inputSearchItem) {
      Toast('请输入关键字')
      return false
    }
    let hisSearch = this.data.hisSearchInfo
    hisSearch.push(this.data.inputSearchItem)
    this.setData({ hisSearchInfo: hisSearch })
    this.setData({ inputSearchItem: '' })
    wx.setStorage({
      key: "userSearch",
      data: hisSearch
    })
    this.toastMessage()
  },
  toastMessage () {
    Toast('暂无')
  },
  deletSearchAll () {
    this.setData({ hisSearchInfo: [] })
    wx.removeStorageSync({
      key: 'userSearch'
    })
    this.setData({ hisSearchListShow: false})
  },
  showHisSearchAll () {
    this.setData({ hisSearchListShow: !this.data.hisSearchListShow })
  }
})