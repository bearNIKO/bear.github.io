const Router = require("koa-router");


const router = new Router({prefix:'/classify'})
const {classify} = require('../controllers/classify.js')

router.get('/:id/',classify)


module.exports = router