class Classify {
  async classify(ctx){
      let items_25 = [
        {
          id: 1,
          name: '热门推荐',
          data: [
            { name: '男士潮服', imgUrl: '/static/indexlay/25/O1CN01X2vNwv2JJhx11.png' },
            { name: '换季收纳', imgUrl: '/static/indexlay/25/O1CN01lbMOAc2JJ.png' },
            { name: '女士专用', imgUrl: '/static/indexlay/25/O1CN01jovxys2JJ.png' },
            { name: '移动电源', imgUrl: '/static/indexlay/25/O1CN016cEUcb2JJ.png' },
            { name: '时尚彩妆', imgUrl: '/static/indexlay/25/O1CN01uiLwGQ2JJ.png' },
            { name: '假日零食', imgUrl: '/static/indexlay/25/O1CN01YO8lgq2JJ.png' }
          ]
        },
        {
          id: 2,
          name: '推荐清单',
          data: [
            { name: '当季流行', imgUrl: '/static/indexlay/25/O1CN01Ntf7uB2JJh.png' },
            { name: '畅想音界', imgUrl: '/static/indexlay/25/O1CN01tvVx3w2JJ.png' },
            { name: '秋冬养生茶', imgUrl: '/static/indexlay/25/O1CN01DUJtlx2JJ.png' },
            { name: '家有萌宝', imgUrl: '/static/indexlay/25/O1CN018wUdJi2JJ.png' },
            { name: '好物换新', imgUrl: '/static/indexlay/25/O1CN01u7xMnl2JJ.png' },
            { name: '防寒保暖', imgUrl: '/static/indexlay/25/O1CN01i682072JJh.png' }
          ]
        }
          ]
      let items_26 = [
        {
          id: 1,
          name: '热门品牌荟',
          data: [
            { name: '海底捞', imgUrl: '/static/indexlay/26/O1CN01ytCCOa2JJ.png' },
            { name: 'VT', imgUrl: '/static/indexlay/26/O1CN01f5iI7i2JJ.png' },
            { name: '蒂佳婷', imgUrl: '/static/indexlay/26/O1CN01xFGUv52JJ.png' },
            { name: '蒙牛', imgUrl: '/static/indexlay/26/O1CN01l2aUVe2JJ.png' },
            { name: '维达', imgUrl: '/static/indexlay/26/O1CN01JyVpyq2JJ.png' },
            { name: '美宝莲', imgUrl: '/static/indexlay/26/O1CN01AEh6gm2JJ.png' },
            { name: '飞鸟新酒', imgUrl: '/static/indexlay/26/O1CN01G040Q72JJ.png' },
            { name: '自然堂', imgUrl: '/static/indexlay/26/O1CN017apy9s2JJ.png' },
            { name: '飞跃', imgUrl: '/static/indexlay/26/O1CN01vTM74u2JJ.png' },
            { name: '森马', imgUrl: '/static/indexlay/26/O1CN01WZStxM2JJ.png' },
            { name: '值护', imgUrl: '/static/indexlay/26/O1CN01mKmGVI2JJ.png' },
            { name: '回力', imgUrl: '/static/indexlay/26/O1CN010pib2H2JJ.png' }
          ]
        },
        {
          id: 2,
          name: '品牌优选',
          data: [
            { name: '曼秀雷蹲', imgUrl: '/static/indexlay/26/O1CN01zv5lLf2JJ.png' },
            { name: '小熊', imgUrl: '/static/indexlay/26/O1CN01QnnKPl2JJ.png' },
            { name: '九阳', imgUrl: '/static/indexlay/26/O1CN017z1KQY2JJ.png' },
            { name: '丸美', imgUrl: '/static/indexlay/26/O1CN01lXR70O2JJ.png' },
            { name: '杜蕾斯', imgUrl: '/static/indexlay/26/O1CN01PWAekq2JJ.png' },
            { name: '鸿星尔克', imgUrl: '/static/indexlay/26/O1CN01htDWJx2JJ.png' },
            { name: '印花', imgUrl: '/static/indexlay/26/O1CN01YtXwsS2JJ.png' },
            { name: '特步', imgUrl: '/static/indexlay/26/O1CN01FMkqQx2JJ.png' },
            { name: '晨光', imgUrl: '/static/indexlay/26/O1CN019aeptY2JJ.png' }
          ]
        }
          ]
      let items_27 = [
        {
          id: 1,
          name: '初秋流行',
          data: [
            { name: '连衣裙', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ2.png' },
            { name: '初秋外套', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ1.png' },
            { name: '薄款卫衣', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ11.png' },
            { name: '英伦风', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ7.png' },
            { name: '休闲套装', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ4.png' },
            { name: '衬衫/雪纺', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ14.png' },
            { name: '毛衣/针织衫', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ8.png' },
            { name: '百塔T恤', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ13.png' }
          ]
        },
        {
          id: 2,
          name: '百搭裤装',
          data: [
            { name: '牛仔裤', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ6.png' },
            { name: '时髦腿裤', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ12.png' },
            { name: '打底裤', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ9.png' },
            { name: '背带裤', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ10.png' },
            { name: '哈伦裤', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ3.png' },
            { name: '休闲裤', imgUrl: '/static/indexlay/27/O1Cqeq01zv5lLf2JJ5.png' }
          ]
        }
          ]
      let items_28 = [
        {
          id: 1,
          name: '帅气百搭',
          data: [
            { name: '潮流卫衣', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx4.png' },
            { name: '长袖衬衣', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx6.png' },
            { name: '针织衫', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx5.png' },
            { name: '外套/夹克', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx11.png' },
            { name: 'POLO衫/T恤', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx10.png' },
            { name: '商务装', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx3.png' }
          ]
        },
        {
          id: 2,
          name: '品质下装',
          data: [
            { name: '休闲裤', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx7.png' },
            { name: '运动裤', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx9.png' },
            { name: '牛仔裤', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx2.png' },
            { name: '薄款九分裤', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx1.png' },
            { name: '短裤', imgUrl: '/static/indexlay/28/O1CN01X2vNwv2JJhx8.png' }
          ]
        }
          ]
      let items_29 = [
        {
          id: 1,
          name: '拔草推荐',
          data: [
            { name: '补水保湿', imgUrl: '/static/indexlay/29/O1CN01RQQQNV2JJ.png' },
            { name: '扛油抗痘', imgUrl: '/static/indexlay/29/O1CN018aV7TY2JJ_.png' },
            { name: '平价面膜', imgUrl: '/static/indexlay/29/O1CN01Qb8t3l2Jj.png' },
            { name: '魅惑红唇', imgUrl: '/static/indexlay/29/O1CN01gaQBBI2JJ.png' },
            { name: '防嗮隔离', imgUrl: '/static/indexlay/29/O1CN01gQ8tjA2JJ.png' },
            { name: '深层卸妆', imgUrl: '/static/indexlay/29/O1CN01fv2tm12JJ.png' },
            { name: '美妆工具', imgUrl: '/static/indexlay/29/O1CN01hYKz9Q2JJ.png' },
            { name: '男士护肤', imgUrl: '/static/indexlay/29/O1CN019uja5J2JJ.png' }
          ]
        },
        {
          id: 2,
          name: '面部护肤',
          data: [
            { name: '护肤套餐', imgUrl: '/static/indexlay/29/O1CN015VI6JG2JJ.png' },
            { name: '洗面奶', imgUrl: '/static/indexlay/29/O1CN010hwIpg2JJ.png' },
            { name: '爽肤水', imgUrl: '/static/indexlay/29/O1CN01MUSa5m2JJ_.png' },
            { name: '眼部护理', imgUrl: '/static/indexlay/29/O1CN01tyG46a2JJ_.png' },
            { name: '精华液', imgUrl: '/static/indexlay/29/O1CN01i4B1jt2JJ_.png' },
            { name: '乳液/面霜', imgUrl: '/static/indexlay/29/O1CN01Tf0MPy2JJ_.png' }
          ]
        },
        {
          id: 3,
          name: '彩妆',
          data: [
            { name: '底妆', imgUrl: '/static/indexlay/29/O1CN01PfmFnb2JJh_.png' },
            { name: '美妆', imgUrl: '/static/indexlay/29/O1CN01qffSWy2JJ_.png' },
            { name: '眼妆', imgUrl: '/static/indexlay/29/O1CN01QzdAvt2JJ_.png' },
            { name: '口红/唇膏', imgUrl: '/static/indexlay/29/O1CN01dFjO942JJ_.png' },
            { name: '修容遮瑕', imgUrl: '/static/indexlay/29/O1CN01Vdw9cQ2JJ_.png' },
            { name: '散粉/粉饼', imgUrl: '/static/indexlay/29/O1CN01lnzrnh2JJ.png' }
          ]
        }
          ]
      let id = await  ctx.params.id
      if (id == 25) { 
        ctx.body = {err:0,msg:'获取成功',data:items_25}
        return
      }
      if (id == 26) { 
        ctx.body = {err:0,msg:'获取成功',data:items_26}
        return
      }
      if (id == 27) { 
        ctx.body = {err:0,msg:'获取成功',data:items_27}
        return
      }
      if (id == 28) { 
        ctx.body = {err:0,msg:'获取成功',data:items_28}
        return
      }
      if (id == 29) { 
        ctx.body = {err:0,msg:'获取成功',data:items_29}
        return
      }
      ctx.body = {err:-1,msg:"请求数据不存在"}
  }
}

  
module.exports = new Classify()