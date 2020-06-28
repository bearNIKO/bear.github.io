const regular = require('../middlewera/check.js')

class Goods {
	async goods(ctx){
    	let id = await  ctx.params.id
        if (!id) { return ctx.body = {err:-1,msg:"物品名ID不能为空"} }
        if (!regular.number.test(id)) { return ctx.body = {err:-1,msg:"物品名ID只能为数字"} }

        let goods = await ctx.db.query('SELECT * FROM goods WHERE goodsID=?', [id]);
        if (!goods.length) { return ctx.body = {err:-1,msg:"请求数据不存在"} }
        let {goodsID,title,swiper,desc,juan,oldsell,comment,price,oldprice} = goods[0]
        swiper = swiper.split(",")
        desc = desc.split(",")

        ctx.body = {err:0,msg:'获取成功', data: {goodsID,title,swiper,desc,juan,oldsell,comment,price,oldprice}}
	}
}

  
module.exports = new Goods()