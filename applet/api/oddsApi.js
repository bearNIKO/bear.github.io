const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  // 获取首页推荐列表
  getOdds(code){
    let url =`${apiServer}/nineWap/${code}`
    return axios.get(url)
  }
} 