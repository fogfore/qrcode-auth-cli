// pages/userinfo/userinfo.js
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    disabled: true,
    loading: false,
    userinfo: {},
  },
  onLoad: function (options) {
    let that = this
    wx.request({
      url: baseUrl + '/user/get/userinfo',
      header: {
        skey: wx.getStorageSync('skey')
      },
      success: function (res) {
        if (res.data.status == '200') {
          that.setData({
            userinfo: res.data.data
          })
        }
      }
    })
  },
  inputRealName: function (e) {
    this.data.userinfo.realName = e.detail.value
    if (this.data.disabled) {
      this.setData({
        disabled: false
      })
    }
  },
  inputPhone: function (e) {
    this.data.userinfo.phone = e.detail.value
    if (this.data.disabled) {
      this.setData({
        disabled: false
      })
    }
  },
  saveUserinfo: function () {
    let that = this
    this.setData({
      loading: true
    })
    wx.request({
      url: baseUrl + '/user/update/userinfo',
      method: 'POST',
      header: {
        skey: wx.getStorageSync('skey')
      },
      data: {
        userInfo: this.data.userinfo
      },
      success: function (res) {
        if (res.data.status == '200') {
          that.setData({
            disabled: true,
            loading: false
          })
          wx.switchTab({
            url: '/pages/my/my',
          })
          wx.showToast({
            title: '保存成功',
            duration: 3000
          })
        }
      }
    })
  }
})