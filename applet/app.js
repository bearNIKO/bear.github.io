//app.js
const config = require('./config/index')
App({
  globalData: {
    canClick: true
  },
  onLaunch () {

  },
  doubleClick: function (flag) {
    let that = this;
    that.globalData.canClick= flag;
  },
  config
})