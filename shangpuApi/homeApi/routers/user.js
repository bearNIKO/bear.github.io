const Router = require("koa-router");
const {secret} = require("../config/config")
const jsonWebToken = require("jsonwebtoken")
const axios = require('axios')
const authToken = require("../middlewera/autoToken")

const router = new Router({prefix:'/user'})
const {reg,login,email,getCode} = require('../controllers/userCtr.js')
router.post('/reg',reg)
router.post('/login',login)
router.post('/wxlogin', async (ctx)=>{
  // 从body获取用户发送的参数
  let {code} = ctx.request.body
  // 请求微信的服务器 用code 换取opendid  用户在微信的主键id 
  let url ='https://api.weixin.qq.com/sns/jscode2session'
  // // 携带的参数
  let params={
    appid:'wx13e9b7c9e5296127',
    secret:'6403a9dd0bbb117e3423db71349abe7c',
    js_code:code,
    grant_type:'authorization_code'
  }
  let result = await axios.get(url,{params:{...params}})
  const {openid,session_key} = result.data
  //  将wx的openid 和 自己自己的用户系统进行关联 将opendid 和session_key 存入数据库 
  if (!openid||!session_key) {
    ctx.body = {code:-1,msg:'服务器错误请稍后再试！'}
  }
  let  isExist = await ctx.db.query('SELECT * FROM user_table WHERE openid=?', [openid]);
  if(isExist.length !== 0){
    // 微信id 已经存在
    let {openid,name,head} = isExist[0]
    let token = jsonWebToken.sign({openid,name},secret,{expiresIn:"1d"})
    ctx.body = {code:0,msg:'登录成功',user: {
      token,openid:openid,name:name,head:head
    }}
  }else{
    let myName = 'bear'
    let number = parseInt(Math.random()*2+1)
    let head = `/static/head/user00${number}.jpg`
    let token = jsonWebToken.sign({openid,myName},secret,{expiresIn:"1d"})
    let  insertR = await ctx.db.query("INSERT INTO user_table (openid,session_key,name,head) VALUES(?, ?, ?, ?)",[openid, session_key, myName, head])
    ctx.body = {code:0,msg:'登录成功',user: {
      token,openid:openid,name:myName,head:headno
    }}
  }
 
})

// 功能暂时修改
// router.post('/email',authToken,email)
// router.post('/getCode',getCode)

module.exports = router
