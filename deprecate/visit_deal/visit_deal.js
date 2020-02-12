// pages/visit_deal/visit_deal.js
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    visitorId: null,
    userInfo: {}
  },

  onLoad: function(options) {
    console.log(options)
    if (options.uid) {
      this.setData({
        visitorId: options.uid
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: userInfo
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  agreeVisit: function(e) {
    wx.request({
      url: baseUrl + '/user/agree/visit',
      header: {
        skey: wx.getStorageSync('skey')
      },
      success: function(res) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    })
  }
})