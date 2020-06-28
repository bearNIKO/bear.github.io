<template  lang="html">
  <footer class="footer">
    <div v-for="(item, index) in menus" :key="index" class="list">
      <div class="item">
        <router-link :to="item.to">
          <span class="iconfont icon" v-html="item.icon"></span>
          <span class="text">{{item.title}}</span>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { type: 'link', to: '/index', title: '首页', icon: '&#xe600;' },
        { type: 'link', to: '/odds', title: '9.9包邮', icon: '&#xe6d3;' },
        { type: 'link', to: '/classify', title: '分类', icon: '&#xe623;' },
        { type: 'link', to: '/like', title: '收藏', icon: '&#xe665;' },
        { type: 'link', to: '/my', title: '我的', icon: '&#xe608;' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.footer {
  width: 100%;
  .h(58);
  background: #fff;
  .list {
    display: inline-block;
    width: 20%;
    .h(58);
    .item {
      width: 100%;
      .h(58);
      float: left;
      .router-link-active span {
        color: rgb(253, 87, 92);
      }
      .router-link-active span:first-child {
        .fs(22)
      }
      span {
        display: block;
        .h(29);
        width: 100%;
        .lh(40);
        text-align: center;
        .fs(18)
      }
      span:last-child {
        .lh(25);
        .fs(14)
      }
    }
  }
}

</style>
