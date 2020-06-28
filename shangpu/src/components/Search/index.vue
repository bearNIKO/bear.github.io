<template  lang="html">
  <div class="container">
    <header class="header">
      <a @click="hisBack" class="back iconfont">&#xe618;</a>
      <div class="search">
        <input type="text" v-model='searchs'>
        <span class="iconfont" v-if="show" @click="deleteSearch">&#xe64b;</span>
      </div>
      <span class="iconfont" @click="Info">搜索</span>
    </header>
    <div class="head"></div>
    <nav class="banner">
      <div class="hr"></div>
      <div class="help">
        <div>
          <p>三步轻松获得优惠券</p>
          <ul>
            <li>
              <img src="./images/step1.png">
              <p>1.进入淘宝</p>
            </li>
            <li>
              <img src="./images/step2.png">
              <p>2.复制商品标题</p>
            </li>
            <li>
              <img src="./images/step3.png">
              <p>3.点击搜索查询</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="hr"></div>
      <div class="searchOld" v-if='searchList.length'>
        <div class="box">
          <p>历史搜索 <span class="iconfont" @click="removeOld">&#xe673;</span></p>
          <ul>
            <li v-for="(item, index) in searchList" :key=index @click="find">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="searchBottom" v-if='searchList.length'>
        <p class="borderBottom"></p>
      </div>
      <div class="find">
        <div class="box">
          <p>搜索发现</p>
          <ul>
            <li v-for="(item, index) in options" :key=index @click="find">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="hr"></div>
      <div class="hod">
        <p>热搜榜</p>
        <ul>
          <li v-for="(item, index) in hots" :key=index @click='find'>
            <div class="rank" :class="[item.type == 2 ? 'active' : '', item.type == 3 ? 'actives' : '']">
              <img v-lazy="item.rank">
            </div>
            <div class="product">
              <img v-lazy="$LocalHost+item.image">
              <div>
                <h4>{{item.title}}</h4>
                <span><i class="iconfont icon-rank-up">&#xe61f;</i>{{item.number}}</span>
              </div>
            </div>
            <span class="icon" v-if="item.hot" :class="[item.hot=='爆'?'red':'',item.hot=='火'?'red':'',item.hot=='荐'?'green':'',item.hot=='新'?'yellow':'']">{{item.hot}}</span>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      searchs: '',
      searchList: [],
      options: [
        '螺蛳粉', '零食', '纸抽', '洗脸巾', '电动牙刷', '洗衣液', '冰柚'
      ],
      hots: [
        { rank: require('./images/rank1.png'), hot: '爆', type: 1, image: '/static/hot/01.jpg', title: '骑行安全，头盔来守护！', number: '25460' },
        { rank: require('./images/rank2.png'), hot: '荐', type: 1, image: '/static/hot/02.png', title: '中华传统美食，粽香四溢', number: '22667' },
        { rank: require('./images/rank3.png'), hot: '火', type: 1, image: '/static/hot/03.png', title: '随时随地静享音乐~', number: '25789' },
        { rank: require('./images/rank4.png'), type: 2, image: '/static/hot/04.png', title: '一张瑜伽垫搞定小腹赘肉', number: '22345' },
        { rank: require('./images/rank5.png'), hot: '新', type: 2, image: '/static/hot/05.jpg', title: '撑起一片属于你的晴天', number: '20165' },
        { rank: require('./images/rank6.png'), type: 2, image: '/static/hot/06.jpg', title: '有了它，清凉一整夏！', number: '13456' },
        { rank: require('./images/rank7.png'), hot: '新', type: 2, image: '/static/hot/07.jpg', title: '一口松软，吃出新鲜感~', number: '42122' },
        { rank: require('./images/rank8.png'), type: 2, image: '/static/hot/08.jpg', title: '“被”感透气，舒享夏日', number: '33245' },
        { rank: require('./images/rank9.png'), type: 2, image: '/static/hot/09.jpg', title: '这条神裤超显瘦！', number: '12344' },
        { rank: require('./images/rank10.png'), hot: '荐', type: 3, image: '/static/hot/10.jpg', title: '墨镜一戴，秒变小V脸！', number: '23344' }
      ]
    }
  },
  methods: {
    message (msg, time) {
      this.$toast({
        message: msg,
        position: 'middle',
        duration: time
      })
    },
    moveShow () {
      this.show = !this.show
    },
    deleteSearch () {
      this.searchs = ''
    },
    hisBack () {
      history.go(-1)
    },
    Info () {
      if (!this.searchs) {
        return this.message('听输入商品名', 1000)
      }
      if (!this.searchList.length) {
        this.searchList.push(this.searchs)
        window.localStorage.setItem('searchInfo', JSON.stringify(this.searchList))
      }
      if (this.searchList.indexOf(this.searchs) === -1) {
        this.searchList.push(this.searchs)
        window.localStorage.setItem('searchInfo', JSON.stringify(this.searchList))
      }
    },
    removeOld () {
      this.searchList = []
      window.localStorage.removeItem('searchInfo')
    },
    find () {
      this.message('暂无', 1000)
    }
  },
  watch: {
    searchs () {
      if (!this.searchs) {
        this.show = false
        return
      }
      this.show = true
    }
  },
  mounted () {
    this.searchList = JSON.parse(window.localStorage.getItem('searchInfo')) ? JSON.parse(window.localStorage.getItem('searchInfo')) : []
  }
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #eee;
  .header {
    position: fixed;
    width: 100%;
    .h(48);
    z-index: 100;
    overflow: hidden;
    background: #fff;
    border-bottom-color: transparent;
    .back {
      float: left;
      display: inline-block;
      .w(48);
      .h(48);
      text-align: center;
      .lh(53);
      .fs(24);
      color: #666;
    }
    .search {
      position: relative;
      float: left;
      background: #eee;
      .h(33);
      .w(270);
      .mt(7);
      .border(20);
      overflow: initial;
      color: #333;
      input {
        position: absolute;
        .top(6);
        .ml(15);
        -webkit-appearance: none;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        outline: 0;
        .fs(14);
        display: inline-block;
        text-align: left;
        text-indent: 0;
        background: 0 0;
        width: 78%;
      }
      span {
        position: absolute;
        right: 0;
        .bottom(9);
        .fs(14);
      }
    }
    span {
      float: right;
      color: #666;
      .mt(13);
      .mr(12);
      .fs(15);
    }
  }
  .head {
    width: 100%;
    .h(48);
  }
  .banner {
    .hr{
      width: 100%;
      .h(10);
      background: #eee;
    }
    .searchBottom {
      .pt(10);
      .pl(13);
      .pr(13);
      .pm(10);
      background: #fff;
      .h(30);
      overflow: hidden;
      .borderBottom {
        height: 100%;
        border-bottom: 1px solid #eee;
        box-sizing:border-box;
      }
    }
    .help {
      width: 100%;
      .h(77);
      background: #fff;
      div {
        width: 100%;
        .h(63);
        .pt(13);
        background: #fff;
        p {
          .mb(11);
          .ml(12);
          .h(18);
          .fs(13);
          .lh(18);
          font-weight: 600;
          color: #333;
        }
        ul {
          width: 100%;
          li {
            width: 33.3%;
            .h(20);
            float: left;
            img {
              float: left;
              .ml(5);
              .w(20);
              .h(20);
            }
            p {
              float: left;
              .fs(10);
              .ml(5);
              .mr(5);
              color: #555;
            }
          }
        }
      }
    }
    .searchOld {
      width: 100%;
      background: #fff;
      overflow: hidden;
      .box {
        .pt(10);
        .pl(13);
        .pr(13);
        height: 100%;
        p {
          .mb(10);
          .h(18);
          .fs(13);
          .lh(18);
          font-weight: 600;
          color: #333;
          span {
            float: right;
            .fs(20);
            color: #959595;
          }
        }
        ul {
          li {
            display: inline-block;
            position: relative;
            float: left;
            .h(26);
            .lh(26);
            .pl(15);
            .pr(15);
            margin: 0 1% 8px;
            .mb(8);
            overflow: visible!important;
            white-space: nowrap;
            background: #F6F6F6;
            .border(10);
            color: #666;
            .fs(10);
          }
        }
        .border {
          .pt(10);
          .pl(13);
          .pr(13);
          border: 1px solid #eee;
        }
      }
    }
    .find {
      width: 100%;
      .h(120);
      background: #fff;
      .box {
        .pt(10);
        .pl(13);
        .pr(13);
        height: 100%;
        p {
          .mb(10);
          .h(18);
          .fs(13);
          .lh(18);
          font-weight: 600;
          color: #333;
        }
        ul {
          .h(70);
          width: 100%;
          li {
            display: inline-block;
            position: relative;
            float: left;
            .h(26);
            .lh(26);
            .pl(15);
            .pr(15);
            margin: 0 1% 8px;
            .mb(8);
            overflow: visible!important;
            white-space: nowrap;
            background: #F6F6F6;
            .border(10);
            color: #666;
            .fs(10);
          }
        }
      }
    }
    .hod {
      .pl(10);
      .pr(10);
      background: #fff;
      p {
        .fs(13);
        width: 100%;
        .h(45);
        .lh(45);
        font-weight: 600;
        color: #333;
      }
      ul {
        .pm(20);
        li {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          .h(58);
          .mb(12);
          .rank {
            background-size: 100%;
            .w(12);
            .h(28);
            .mr(16);
            img {
              width: 100%;
              height: 100%;
            }
          }
          .active {
            .h(14);
            .w(12);
          }
          .actives {
            .h(14);
            .w(21);
            .mr(7);
          }
          .product {
            flxe: 1;
            img {
              .w(58);
              .h(58);
              .border(5);
              float: left;
            }
            div {
              display: flex;
              flex-direction: column;
              .ml(70);
              justify-content: center;
              .h(58);
              overflow: hidden;
              h4 {
                .h(20);
                .fs(14);
                .lh(20);
                .mb(3);
                width: 90%;
                font-weight: 400;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display:-webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              span {
                .h(17);
                .fs(12);
                .lh(17);
                font-weight: 400;
                color: #888;
                i {
                  color: #FF353E;
                  transform: translateY(-1px);
                  display: inline-block;
                  .fs(10);
                  .mr(4);
                }
              }
            }
          }
          .icon {
            position: absolute;
            dispaly: inline-block;
            .w(19);
            .h(19);
            text-align: center;
            right: 0;
            .border(4);
            .fs(12);
          }
          .yellow {
            border: 1px solid #EAC100;
            color: #FFAF60;
            background-color: #FFFFCE;
          }
          .green {
            border: 1px solid #28FF28;
            color: #00BB00;
            background-color: #DFFFDF;
          }
          .red {
            border: 1px solid #FF9797;
            color: #FF5151;
            background-color: #FFD2D2;
          }
        }
      }
    }
  }
}
</style>
