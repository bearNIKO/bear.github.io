const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  // 获取首页推荐列表
  setFeedBack(datas){
    let url =`${apiServer}/feedback`
    return axios.post(url, datas)
  }
} 