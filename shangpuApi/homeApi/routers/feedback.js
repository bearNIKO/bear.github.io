const Router = require("koa-router");


const router = new Router({prefix:'/feedback'})
const {feedback} = require('../controllers/feedback.js')

router.post('/',feedback)


module.exports = router