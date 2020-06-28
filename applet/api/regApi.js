const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  // 获取首页推荐列表
  submitReg(datas){
    let url =`${apiServer}/user/reg`
    return axios.post(url, datas)
  }
} 