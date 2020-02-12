const app = getApp()
const util = require("../../utils/util.js")

const baseUrl = app.globalData.baseUrl

Page({
  data: {
    account: '',
    password: '',
    loading: false
  },

  // 获取输入账号
  accountInput: function(e) {
    this.setData({
      account: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function() {
    this.setData({
      loading: true
    })
    if (this.data.account.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '输入错误',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    let data = {
      username: this.data.account,
      password: this.data.password
    }
    let that = this
    app.globalData.userDetail = 'women'
    wx.request({
      url: baseUrl + '/user/login',
      method: 'post',
      data: data,
      success: res => {
        if (res && res.data.status == '200') {
          app.globalData.userDetail = res.data.data
          this.setData({
            loading: false
          })
          wx.switchTab({
            url: '/pages/my/my',
          })
        }
      }
    })
  }
})