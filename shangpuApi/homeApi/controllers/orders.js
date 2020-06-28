const {secret} = require("../config/config")
const jsonWebToken = require("jsonwebtoken")
const regular = require('../middlewera/check.js')
const md5 = require('../middlewera/md5.js')
const sendMail = require('../utils/sendEmail.js')
let  mails = {code:'', email:''}

class Orders {
  async info(ctx){
      console.log('info')

  }

  async userOrderInfo (ctx) {
      let { state, user, uemail} = ctx.request.body
      let datas = await ctx.db.query('SELECT * FROM orders WHERE user=?', [user])
      if (!datas.length) {
        return ctx.body = {err:-1,msg:"没有此项数据"}
      }
      ctx.body = {err:0,msg:"查询成功", data: [datas]}
  }

  async save(ctx){
    let {goodsID,price,allCount,state,descs,userName,phone,address,images,user,uemail} = ctx.request.body

    let regOk = await ctx.db.query("INSERT INTO orders (goodsID,price,allCount,state,descs,userName,phone,address,images,user,uemail) VALUES(?,?,?,?,?,?,?,?,?,?,?)",[goodsID,price,allCount,state,descs,userName,phone,address,images,user,uemail])
    if(regOk == 0) { return ctx.body = {err:-1,msg:"数据保存失败请稍后重试"} }
    ctx.body = {err:0,msg:"提交成功"}
  }

}
module.exports = new Orders()