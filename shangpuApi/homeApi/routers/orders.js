const Router = require("koa-router");
const {secret} = require("../config/config")
const jsonWebToken = require("jsonwebtoken")
const axios = require('axios')
const authToken = require("../middlewera/autoToken")

const router = new Router({prefix:'/orders'})
const {save, info, userOrderInfo} = require('../controllers/orders.js')
router.post('/save',authToken,save)
router.get('/info',authToken,info)
router.post('/userOrderInfo',userOrderInfo)

// 功能暂时修改
// router.post('/email',authToken,email)
// router.post('/getCode',getCode)

module.exports = router