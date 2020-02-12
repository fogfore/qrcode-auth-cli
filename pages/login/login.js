//index.js
//获取应用实例
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    motto: '欢迎使用',
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.login(app.globalData.userInfo)
    } 
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.login(e.detail.userInfo)
  },
  login: function (userInfo) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: baseUrl + '/user/login',
          method: 'POST',
          data: {
            code: res.code,
            userInfo: userInfo
          },
          success: function (res) {
            if (res.data.status == '200') {
              wx.setStorageSync('skey', res.data.data.skey)
              wx.setStorageSync('uid', res.data.data.uid)
            }
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  }
})