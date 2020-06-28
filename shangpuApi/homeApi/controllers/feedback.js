const regular = require('../middlewera/check.js')


class FeedBack {

  async feedback(ctx){
    let {type, details, information} = ctx.request.body 

    if (!regular.number.test(type)) { return ctx.body = {err:-1,msg:"选择类型有误请重新选择！"} }

    if (details.length<5||details.length>400) { return ctx.body = {err:-1,msg:"描述信息请在5-400位数之间"} }

    if (information.length<5||information.length>20) { return ctx.body = {err:-1,msg:"联系方式有误请在5-20位数之间"}
    }else if (!regular.QQ.test(information) && !regular.email.test(information)) { return ctx.body = {err:-1,msg:"QQ或邮箱格式不对"} }

    // if(mails.code != code || mails.email != email) { return ctx.body = {err:-1,msg:"邮箱邮箱验证码错误"} }



    let regOk = await ctx.db.query("INSERT INTO feedback (type,details,information) VALUES(?, ?, ?)",[type, details, information])
    if(regOk == 0) { return ctx.body = {err:-1,msg:"提交失败请稍后重试"} }
    ctx.body = {err:0,msg:"提交成功请耐心等待客服联系"}
  }

}
module.exports = new FeedBack()