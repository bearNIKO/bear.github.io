const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  // 获取首页推荐列表
  getGoodsInfo(goodsID){
    let url =`${apiServer}/goods/${goodsID}`
    return axios.get(url)
  }
} 