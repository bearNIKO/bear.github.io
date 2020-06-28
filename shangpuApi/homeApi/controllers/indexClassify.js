class Classify {
  async swiper (ctx) {
    let data = [
      { goodsID: 123455, images: '/static/index/swiper/01.png' },
      { goodsID: 123456, images: '/static/index/swiper/02.png' },
      { goodsID: 123457, images: '/static/index/swiper/03.jpg' },
      { goodsID: 223455, images: '/static/index/swiper/04.png' },
      { goodsID: 223456, images: '/static/index/swiper/05.jpg' },
      { goodsID: 223457, images: '/static/index/swiper/06.png' },
    ]
    ctx.body = {err:0,msg:'获取成功',data:data}
  }
  async navigation(ctx){
      let data = [
        { title: '疯抢排行', images: '/static/index/navigation/rank.gif' },
        { title: '9.9包邮', images: '/static/index/navigation/nine.png' },
        { title: '品牌特卖', images: '/static/index/navigation/brand.gif' },
        { title: '每日半价', images: '/static/index/navigation/every.gif' },
        { title: '折上折', images: '/static/index/navigation/realtime.png' },
        { title: '今日秒杀', images: '/static/index/navigation/partEvent.png' },
        { title: '大额神券', images: '/static/index/navigation/productSpa.png' },
        { title: '全网爆款', images: '/static/index/navigation/CmsWapPartEvent.png' }
      ]
      ctx.body = {err:0,msg:'获取成功',data:data}
  }
}

  
module.exports = new Classify()