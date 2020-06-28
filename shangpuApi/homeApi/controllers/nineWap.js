class NineWap {
    async nineWap(ctx){
        let id = await  ctx.params.id
            let hots = [
                {
                  title: '近一小时疯抢',
                  datas: [
                    { text: '新券！【伊薇】吸油吸水厨房用纸4卷整箱', imgUrl: '/static/ninewap/21/hot/01.jpg', money: 9.9, age: 7418 },
                    { text: '100只【含熔喷布】一次性防护口罩3层', imgUrl: '/static/ninewap/21/hot/02.jpg', money: 39.9, age: 6062 },
                    { text: '马卡龙法式草莓味夹心饼干55只装', imgUrl: '/static/ninewap/21/hot/03.jpg', money: 17.9, age: 5727 },
                    { text: '【艾莱客】防紫外线手套防晒冰袖1双装', imgUrl: '/static/ninewap/21/hot/04.jpg', money: 2.9, age: 4913 },
                    { text: '当天发货！20只儿童熔喷布一次性口罩', imgUrl: '/static/ninewap/21/hot/05.jpg', money: 14, age: 3764 },
                    { text: '晨光多功能打印复印全木浆A4纸100张', imgUrl: '/static/ninewap/21/hot/06.jpg', money: 3.9, age: 3658 },
                    { text: '拍3件39.7百草味零食大礼包672g', imgUrl: '/static/ninewap/21/hot/07.jpg', money: 33.9, age: 3641 },
                    { text: '【得力】2B橡皮4块+10支铅笔', imgUrl: '/static/ninewap/21/hot/08.jpg', money: 1.6, age: 3192 },
                    { text: '【50个装】含熔喷布三层防护口罩', imgUrl: '/static/ninewap/21/hot/09.jpg', money: 19.9, age: 3070 },
                    { text: '安卓/typec/苹果1米快充数据线', imgUrl: '/static/ninewap/21/hot/10.jpg', money: 1.1, age: 2892 }
                  ],
                  age: 50
                },
                {
                  title: '3.9元专区',
                  datas: [
                    { text: '【全尺寸一个价】自粘型防蚊纱窗网', imgUrl: '/static/ninewap/21/hot/11.jpg', money: 2.9 },
                    { text: '杨幂同款ins泫雅风网红美少女冰丝袖套', imgUrl: '/static/ninewap/21/hot/12.jpg', money: 3.9 },
                    { text: '【赛简朴】原装正品重低音苹果安卓通用耳机', imgUrl: '/static/ninewap/21/hot/13.jpg', money: 2.9 },
                    { text: '苹果安卓系列卡通硅胶手机', imgUrl: '/static/ninewap/21/hot/04.jpg', money: 3.9 },
                    { text: '【白菜价】桌面网红梳妆镜化妆镜', imgUrl: '/static/ninewap/21/hot/15.jpg', money: 2.9 },
                    { text: '夏季冰丝薄款安全裤1件装', imgUrl: '/static/ninewap/21/hot/16.png', money: 3.9 },
                    { text: '【途瑞斯】苹果网红手机壳保护套', imgUrl: '/static/ninewap/21/hot/17.jpg', money: 3.6 },
                    { text: '【菁拓】苹果系列磨砂手机壳', imgUrl: '/static/ninewap/21/hot/08.jpg', money: 2.9 },
                    { text: '新券！【伊薇】吸油吸水厨房用纸4卷整箱', imgUrl: '/static/ninewap/21/hot/19.jpg', money: 2.9 },
                    { text: '秒杀3.88！防走光安全裤女短裤打底裤', imgUrl: '/static/ninewap/21/hot/20.jpg', money: 3.88 }
                  ],
                  age: 50
                },
                {
                  title: '6.9元专区',
                  datas: [
                    { text: '【南极人】皮革胶布料胶水60ml', imgUrl: '/static/ninewap/21/hot/21.png', money: 6.9 },
                    { text: '【罗马仕旗舰店】苹果通用快充数据线', imgUrl: '/static/ninewap/21/hot/22.jpg', money: 4.9 },
                    { text: '【5双装】纯棉底浅口防滑蕾丝船袜', imgUrl: '/static/ninewap/21/hot/23.jpg', money: 6.9 },
                    { text: '6.9秒杀！原生木浆卷纸14卷', imgUrl: '/static/ninewap/21/hot/24.jpg', money: 6.9 },
                    { text: '2片装苹果全系列9D防窥钢化膜', imgUrl: '/static/ninewap/21/hot/25.jpg', money: 5.9 },
                    { text: '儿童袜子夏季新生儿婴儿网眼夏天透', imgUrl: '/static/ninewap/21/hot/26.jpg', money: 6.9 },
                    { text: '【雪姨代言】小白鞋神器清洗剂', imgUrl: '/static/ninewap/21/hot/27.jpg', money: 5.9 },
                    { text: '【第二件5元】正宗野生百花土蜂蜜250g', imgUrl: '/static/ninewap/21/hot/28.jpg', money: 6.9 },
                    { text: '去渍不伤衣！壹念衣物增白彩漂剂300g', imgUrl: '/static/ninewap/21/hot/29.png', money: 6.9 },
                    { text: '夏季魔术贴防蚊门帘纱窗高档', imgUrl: '/static/ninewap/21/hot/30.jpg', money: 6.8 }
                  ],
                  age: 55
                },
                {
                  title: '14.9元专区',
                  datas: [
                    { text: '【永辉超市同款】卜珂海盐饼干600g', imgUrl: '/static/ninewap/21/hot/31.jpg', money: 13.8 },
                    { text: '【紫外线天敌】冰丝袖套2双装', imgUrl: '/static/ninewap/21/hot/32.jpg', money: 9.5 },
                    { text: '【纯色】宽松白色冰丝短袖t恤', imgUrl: '/static/ninewap/21/hot/33.jpg', money: 14.9 },
                    { text: '【两条装】古尚古正品苹果快充数据线1米', imgUrl: '/static/ninewap/21/hot/34.jpg', money: 13 },
                    { text: '【益奇佳】益生菌冻干粉20袋', imgUrl: '/static/ninewap/21/hot/35.jpg', money: 14 },
                    { text: '【拍3件】第3瓶0元祛痘芦荟胶去痘印', imgUrl: '/static/ninewap/21/hot/36.jpg', money: 14.9 },
                    { text: 'D品牌【云南本草】去狐臭香体露30ml', imgUrl: '/static/ninewap/21/hot/37.jpg', money: 9.9 },
                    { text: '湘嘴巴手撕素肉素牛排20包', imgUrl: '/static/ninewap/21/hot/38.jpg', money: 9.9 },
                    { text: '【兔力】不锈钢清洁膏500g', imgUrl: '/static/ninewap/21/hot/39.jpg', money: 14.9 },
                    { text: '人气爆款-简约不锈钢饭盒保温2层', imgUrl: '/static/ninewap/21/hot/30.jpg', money: 9.9 }
                  ],
                  age: 61
                }
                ]
        let itme_21 = [
                { goodsID: 123455, title: '【北极绒】儿童卡通刺绣纯棉防蚊裤', imgUrl: '/static/ninewap/21/01.jpg', ju: true, juan: 2, oldsell: 15.2, comment: 16.1, price: 17.9, limit: true },
                { goodsID: 123456, title: '全款式8.8元！【保罗】男真皮自动扣皮带', imgUrl: '/static/ninewap/21/02.jpg', ju: true, juan: 1, oldsell: 17.3, comment: 81.4, price: 8.8, limit: false },
                { goodsID: 123457, title: 'Ocean进口透明玻璃碗水果沙拉碗', imgUrl: '/static/ninewap/21/03.jpg', ju: true, juan: 10, oldsell: 1.2, comment: 3.1, price: 9.9, label: '新品', limit: false },
                { goodsID: 123458, title: '【拍3件】甜苦瓜手撕面包多口味', imgUrl: '/static/ninewap/21/04.jpg', ju: true, juan: 3, oldsell: 11.2, comment: 10.1, price: 16.4, label: '推荐', limit: true },
                { goodsID: 123459, title: '【七彩之谜】古法黑糖', imgUrl: '/static/ninewap/21/05.jpg', ju: true, juan: 10, oldsell: 15.2, comment: 16.1, price: 13.9, label: '爆款', limit: true }
            ]
      let itme_22 = [
                { goodsID: 223455, title: '【馋莲】老北京枣糕2斤装16.9元！', imgUrl: '/static/ninewap/22/01.jpg', ju: true, juan: 3, oldsell: 4.6, comment: 21.1, price: 16.9, limit: true },
                { goodsID: 223456, title: '【五谷源】网红手撕面包720g', imgUrl: '/static/ninewap/22/02.jpg', ju: false, juan: 10, oldsell: 4.6, comment: 0.4, price: 19.8, limit: false },
                { goodsID: 223457, title: '第二件9.9！溜溜梅日式无核青梅饼', imgUrl: '/static/ninewap/22/03.jpg', ju: true, juan: 5, oldsell: 20.6, comment: 2.9, price: 14.8, label: '旗舰店', limit: true },
                { goodsID: 223458, title: '【拍两件】蒟蒻梅の冻120g*4袋', imgUrl: '/static/ninewap/22/04.jpg', ju: false, juan: 10, oldsell: 7.2, comment: 2.1, price: 21.2, label: '旗舰店', limit: true },
                { goodsID: 223459, title: '【拍5件】李佳琦推荐红谷林特产石头饼', imgUrl: '/static/ninewap/22/05.jpg', ju: true, juan: 10, oldsell: 19, comment: 16, price: 19.9, label: '爆款', limit: true }
            ]
      let itme_23 = [
                { goodsID: 323455, title: '【含熔喷布】一次性防护口罩3层50只', imgUrl: '/static/ninewap/23/01.jpg', ju: false, juan: 60, oldsell: 105.1, comment: 8.8, price: 29.9, limit: true },
                { goodsID: 323456, title: '全款式8.【超值】平口多色垃圾袋100只', imgUrl: '/static/ninewap/23/02.jpg', ju: true, juan: 3, oldsell: 58.2, comment: 7.5, price: 2.8, label: '爆款', limit: false },
                { goodsID: 323457, title: '【百万好评】居家浴室防滑软底拖鞋', imgUrl: '/static/ninewap/23/03.jpg', ju: false, juan: 1, oldsell: 55, comment: 105.6, price: 3.5, limit: false },
                { goodsID: 323458, title: '【100只】平口家用加厚垃圾袋', imgUrl: '/static/ninewap/23/04.jpg', ju: true, juan: 2, oldsell: 50.7, comment: 113.1, price: 3.8, label: '推荐', limit: true },
                { goodsID: 323459, title: '【紫梦园】夏季防蚊门帘', imgUrl: '/static/ninewap/23/05.jpg', ju: false, juan: 3, oldsell: 50.9, comment: 63.3, price: 15, label: '爆款', limit: true }
            ]
      let item_all = [
                { goodsID: 123455, title: '【北极绒】儿童卡通刺绣纯棉防蚊裤', imgUrl: '/static/ninewap/21/01.jpg', ju: true, juan: 2, oldsell: 15.2, comment: 16.1, price: 17.9, limit: true },
                { goodsID: 123456, title: '全款式8.8元！【保罗】男真皮自动扣皮带', imgUrl: '/static/ninewap/21/02.jpg', ju: true, juan: 1, oldsell: 17.3, comment: 81.4, price: 8.8, limit: false },
                { goodsID: 123457, title: 'Ocean进口透明玻璃碗水果沙拉碗', imgUrl: '/static/ninewap/21/03.jpg', ju: true, juan: 10, oldsell: 1.2, comment: 3.1, price: 9.9, label: '新品', limit: false },
                { goodsID: 123458, title: '【拍3件】甜苦瓜手撕面包多口味', imgUrl: '/static/ninewap/21/04.jpg', ju: true, juan: 3, oldsell: 11.2, comment: 10.1, price: 16.4, label: '推荐', limit: true },
                { goodsID: 123459, title: '【七彩之谜】古法黑糖', imgUrl: '/static/ninewap/21/05.jpg', ju: true, juan: 10, oldsell: 15.2, comment: 16.1, price: 13.9, label: '爆款', limit: true },
                { goodsID: 223455, title: '【馋莲】老北京枣糕2斤装16.9元！', imgUrl: '/static/ninewap/22/01.jpg', ju: true, juan: 3, oldsell: 4.6, comment: 21.1, price: 16.9, limit: true },
                { goodsID: 223456, title: '【五谷源】网红手撕面包720g', imgUrl: '/static/ninewap/22/02.jpg', ju: false, juan: 10, oldsell: 4.6, comment: 0.4, price: 19.8, limit: false },
                { goodsID: 223457, title: '第二件9.9！溜溜梅日式无核青梅饼', imgUrl: '/static/ninewap/22/03.jpg', ju: true, juan: 5, oldsell: 20.6, comment: 2.9, price: 14.8, label: '旗舰店', limit: true },
                { goodsID: 223458, title: '【拍两件】蒟蒻梅の冻120g*4袋', imgUrl: '/static/ninewap/22/04.jpg', ju: false, juan: 10, oldsell: 7.2, comment: 2.1, price: 21.2, label: '旗舰店', limit: true },
                { goodsID: 223459, title: '【拍5件】李佳琦推荐红谷林特产石头饼', imgUrl: '/static/ninewap/22/05.jpg', ju: true, juan: 10, oldsell: 19, comment: 16, price: 19.9, label: '爆款', limit: true }

            ]

        if (id == 21) {
            ctx.body = {err:0,msg:'获取成功',data:{hots:hots,goods: itme_21}}
            return
        }
        if (id == 22) { 
            ctx.body = {err:0,msg:'获取成功',data:{goods: itme_22}}
            return
        }
        if (id == 23) { 
            ctx.body = {err:0,msg:'获取成功',data:{goods: itme_23}}
            return
        }
        if (id == 'all') {
            ctx.body = {err:0,msg:'获取成功',data: item_all }
            return
        }
        ctx.body = {err:-1,msg:"请求数据不存在"}
    }
}

  
module.exports = new NineWap()







