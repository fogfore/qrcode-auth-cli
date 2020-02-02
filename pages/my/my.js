//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function() {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // }
  },
  login: function () {
    console.log('login')
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  showUserInfo: function () {
    console.log('用户信息')
  },
  clickRegister: function () {
    console.log('用户注册')
  }
})