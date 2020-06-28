const Router = require("koa-router");


const router = new Router({prefix:'/goods'})
const {goods} = require('../controllers/goods.js')

router.get('/:id/',goods)

// 功能暂时修改
// router.post('/email',authToken,email)
// router.post('/getCode',getCode)

module.exports = router