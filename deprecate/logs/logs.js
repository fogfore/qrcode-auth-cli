//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  scanCode: function () {
    console.log("测试")
    
  },
  getUserInfo: function (e) {
    console.log(e)
  }
})
