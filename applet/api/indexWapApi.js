const axios = require('../utils/axios')
const {apiServer} = require('../config/index')
module.exports={
  getSwiper(code){
    let url =`${apiServer}/indexClassify/swiper`
    return axios.get(url)
  },
  getNaviGation(code){
    let url =`${apiServer}/indexClassify/navigation`
    return axios.get(url)
  },
} 