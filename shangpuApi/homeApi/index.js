const { homePort } = require('../config/index.js')
const path = require("path")
const koaStatic = require("koa-static")
const Koa = require("koa")
const koaBody = require('koa-body')
const regRouter = require("./routers/index.js")
const error = require('./utils/error.js')
const db = require('./db/connect.js')
const parameter = require("koa-parameter")
const app = new Koa()



app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
})


// 错误捕获
app.use(error)
app.use(
  koaStatic(path.join(__dirname,'../public'),
  {
    maxage: 7 * 86400 * 1000
  }
))
// app.use(koaStatic(path.join(__dirname,'../public')))
app.use(koaBody({
  multipart:true,
  formidable:{
    keepExtensions:true,
    uploadDir:path.join(__dirname,'../public/upload')
  }
}))

//数据库
app.context.db = db

// 参数校验
app.use(parameter(app))
// 路由注册
regRouter(app)

// 设置options 预检
// app.use(router.allowedMethods())

app.listen(homePort,()=>{
  console.log(`前台接口服务器 running,port:${homePort}`)
})