<template  lang="html">
  <div class="box" ref="rightWrapper">
    <div>
      <ul class="main-cat" v-for="(items, index) in datas" :key=index>
        <li class="title_nav">{{items.name}}</li>n
        <li class="item" v-for="(item, index) in items.data" :key=index>
          <a>
            <img v-lazy="$LocalHost+item.imgUrl">
            {{item.name}}
          </a>
        </li>
        <div style="clear:both;"></div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['datas'],
  methods: {
  },
  created () {
    this.$nextTick(() => {
      // $refs绑定元素
      if (!this.scrollRight) {
        this.scrollRight = new this.$BScroll(this.$refs.rightWrapper, {
        // 开启点击事件 默认为false
          click: true,
          preventDefault: false,
          tap: true,
          mouseWheel: true
        })
      // console.log(this.scroll)
      } else if (!this.$refs.rightWrapper) {
        return false
      } else {
        this.scrollRight.refresh()
      }
    })
  }
}

</script>

<style lang="less" scoped>
@import '../../../style/index.less';
.box{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
    .main-cat {
      width: 100%;
      .title_nav {
        width: 100%;
        padding: 0 4%;
        box-sizing: border-box;
        .mt(15);
        .mb(15);
        .h(26);
        .fs(14);
        font-weight: 400;
        color: #333;
      }
      .item {
        width: 33%;
        float: left;
        text-align: center;
        opacity: 1;
        transition: all .5s cubic-bezier(.4,.68,.15,1) .2s;
        a {
          display: block;
          .fs(12);
          .lh(25);
          .pm(20);
          color: #333;
          overflow: hidden;
          img {
            display: block;
            margin: auto;
            width: 60%;
            min-height: 40px;
          }
        }
      }
    }
  }

</style>
