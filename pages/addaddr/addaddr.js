// pages/addaddr/addaddr.js
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    addrName: "",
    addrInfo: "",
    addrDesc: "",
    loading: false
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新增地址',
    })
  },

  inputName: function (e) {
    this.data.addrName = e.detail.value
  },

  inputAddr: function (e) {
    this.data.addrInfo = e.detail.value
  },

  inputDesc: function (e) {
    this.data.addrDesc = e.detail.value
  },

  saveAddr: function () {
    let that = this
    this.setData({
      loading: true
    })
    wx.request({
      url: baseUrl + '/addr/add',
      method: 'POST',
      header: {
        skey: wx.getStorageSync('skey')
      },
      data: {
        addrName: that.data.addrName,
        addrInfo: that.data.addrInfo,
        addrDesc: that.data.addrDesc
      },
      success: function (res) {
        if (res.data.status == '200') {
          that.setData({
            loading: false
          })
          wx.switchTab({
            url: '/pages/index/index',
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