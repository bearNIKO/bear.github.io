const Router = require("koa-router");


const router = new Router({prefix:'/nineWap'})
const {nineWap} = require('../controllers/nineWap.js')

router.get('/:id/',nineWap)


module.exports = router