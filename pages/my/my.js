//index.js
//获取应用实例
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    userInfo: {}
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  showUserinfo: function () {
    console.log('显示用户信息')
    wx.navigateTo({
      url: '/pages/userinfo/userinfo',
    })
  }
})