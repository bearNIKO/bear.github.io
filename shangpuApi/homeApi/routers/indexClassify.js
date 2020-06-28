const Router = require("koa-router");

const router = new Router({prefix:'/indexClassify'})
const {swiper, navigation} = require('../controllers/indexClassify.js')

router.get('/swiper',swiper)
router.get('/navigation',navigation)


module.exports = router