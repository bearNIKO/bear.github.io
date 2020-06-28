const jsonWebToken = require("jsonwebtoken")
const {secret} = require("../config/config")
module.exports=async function(ctx,next){

  if(!ctx.headers.authorization){  return ctx.throw(402,"token缺失") } 
  let {uid} = ctx.request.body
  let token = ctx.headers.authorization.split("Bear")[1]
  try {
    let {name,ID,user,email} = jsonWebToken.verify(token,secret)
    if(user !== user){ ctx.throw(402,"token失效")  }
    ctx.state.userInfo = {name,ID,user,email}
    console.log(ctx.state.userInfo);
  } catch (error) {
    return ctx.throw(402,"token失效")
  }
  await next()

}