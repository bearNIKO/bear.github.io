const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  // 获取首页推荐列表
  wxLogin(code){
    let url =`${apiServer}/user/wxlogin`
    return axios.post(url, {code})
  }
} 