const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  // 获取首页推荐列表
  getClassify(code){
    let url =`${apiServer}/classify/${code}`
    return axios.get(url)
  }
} 