<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'App'
}
</script>

<style lang="less">
#app {
  font-family: Microsoft YaHei,sans-serif;
  background: #f5f5f5;
}
.footer{
  position: fixed;
  bottom: 0;
  border-top: 1px solid #eee;
  z-index: 1000;
}
</style>
