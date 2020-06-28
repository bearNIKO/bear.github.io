const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  // 获取首页推荐列表
  submitUser(datas){
    let url =`${apiServer}/user/login`
    return axios.post(url, datas)
  }
} 