const {secret} = require("../config/config")
const jsonWebToken = require("jsonwebtoken")
const regular = require('../middlewera/check.js')
const md5 = require('../middlewera/md5.js')
const sendMail = require('../utils/sendEmail.js')
let  mails = {code:'', email:''}

class UserCtr {
  async login(ctx){
    let {userName,passWord} = ctx.request.body

    if (userName.length<6||userName.length>14) { return ctx.body = {err:-1,msg:"账号小于6位数或者大于14位数"}
    }else if(!regular.username.test(userName)){ return ctx.body = {err:-1,msg:"账号格式不对不能包含中文或特殊符号"} }

    if (passWord.length<6||passWord.length>20) { return ctx.body = {err:-1,msg:"密码小于6位数或者大于20位数"}
    }else if (!regular.password.test(passWord)) { return ctx.body = {err:-1,msg:"密码格式不对不能包含中文或特殊符号"} }

    passWord = md5.md5(passWord)

    let userInfo = await ctx.db.query('SELECT * FROM user_table WHERE user=?', [userName]);
    console.log(userInfo)
    if(userInfo.length == 0) { return ctx.body = {err:-1,msg:"用户名不存在"} }
    let {name,user,password,ID,head,email} = userInfo[0]
    if(password != passWord) {
      return ctx.body = {err:-1,msg:"密码错误请重新登入"}
    }else {
      let token = jsonWebToken.sign( {name,user,ID,email},secret,{expiresIn:"1d"})
      console.log(token)
      return ctx.body = {code:0,msg:'登录成功',name,user,token,head,email}
    }

  }

  async reg(ctx){
    let {name,userName,passWord,email,code} = ctx.request.body

    if (name.length<2||name.length>14) { return ctx.body = {err:-1,msg:"用户名小于2位数或者大于14位数"}
    }else if (!regular.name.test(name)) { return ctx.body = {err:-1,msg:"用户名格式不对不能包含特殊符号"} }

    if (userName.length<6||userName.length>14) { return ctx.body = {err:-1,msg:"账号小于6位数或者大于14位数"}
    }else if(!regular.username.test(userName)){ return ctx.body = {err:-1,msg:"账号格式不对不能包含中文或特殊符号"} }

    if (passWord.length<6||passWord.length>20) { return ctx.body = {err:-1,msg:"密码小于6位数或者大于20位数"}
    }else if (!regular.password.test(passWord)) { return ctx.body = {err:-1,msg:"密码格式不对不能包含中文或特殊符号"}
    }else if (passWord == name) { return ctx.body = {err:-1,msg:"密码不能和用户名一样"}
    }else if (passWord == userName) { return ctx.body = {err:-1,msg:"密码不能和账号一样"}
    }else if (passWord == email) { return ctx.body = {err:-1,msg:"密码不能和邮箱账号一样"}
    }

    // if (!regular.email.test(email)) { return ctx.body = {err:-1,msg:"邮件格式不对"} }

    let users = await ctx.db.query('SELECT * FROM user_table WHERE user=?', [userName]);
    if(!users.length == 0) { return ctx.body = {err:-1,msg:"用户名已存在请重新输入"} }
    let emails = await ctx.db.query('SELECT * FROM user_table WHERE email=?', [email]);
    if(!emails.length == 0) { return ctx.body = {err:-1,msg:"邮箱账号已存在请重新输入"} }

    // if(mails.code != code || mails.email != email) { return ctx.body = {err:-1,msg:"邮箱邮箱验证码错误"} }

    //密码加密
    passWord = md5.md5(passWord)
    console.log(passWord)

    //头像添加
    let number = parseInt(Math.random()*2+1)
    let head = `static/head/user00${number}.jpg`

    let regOk = await ctx.db.query("INSERT INTO user_table (name,user,password,email,head) VALUES(?, ?, ?, ?, ?)",[name, userName, passWord, email, head])
    if(regOk == 0) { return ctx.body = {err:-1,msg:"注册失败请稍后重试"} }
    ctx.body = {err:0,msg:"注册成功"}
  }

  async email(ctx) {
     ctx.body = 'email'
  }

  getCode(ctx) {
    let {email} = ctx.query
    let code = parseInt(Math.random()*999999)
    sendMail.send(email,code)
    mails.email = email
    mails.code = code 
    ctx.body = {err:0,msg:'验证码发送ok'}
  }
}
module.exports = new UserCtr()