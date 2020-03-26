// pages/addrinfo/addrinfo.js
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    auth: null,
    addrinfo: null,
    addVisitorUrl: null,
    showVisitorsUrl: null,
    credentialUrl: null
  },
  onLoad: function (options) {
    let that = this
    wx.request({
      url: baseUrl + '/addr/get/' + options.addrId,
      header: {
        skey: wx.getStorageSync('skey')
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == '200') {
          that.setData({
            auth: options.auth,
            addrinfo: res.data.data,
            addVisitorUrl: '/pages/addvisitor/addvisitor?addrId=' + options.addrId + '&addrName=' + res.data.data.name,
            showVisitorsUrl: '/pages/visitorlist/visitorlist?addrId=' + options.addrId + '&addrName=' + res.data.data.name,
            credentialUrl: '/pages/credential/credential?addrId=' + options.addrId + '&addrName=' + res.data.data.name
          })
          wx.setNavigationBarTitle({
            title: res.data.data.name,
          })
        }
      }
    })
  },
  dealAuth: function () {
    wx.scanCode({
      complete: (res) => {
        wx.request({
          url: baseUrl + '/user/auth/visit',
          method: 'POST',
          header: {
            skey: wx.getStorageSync('skey')
          },
          data: {
            credential: res.result,
            addrId: this.data.addrinfo.id
          },
          success: function (res) {
            if (res.data.status == '200') {
              wx.showToast({
                title: '同意访问',
                duration: 3000
              })
            }
          }
        })
      },
    })
  },
  delAddr: function () {
    wx.request({
      url: baseUrl + '/addr/del/' + this.data.addrinfo.id,
      header: {
        skey: wx.getStorageSync('skey')
      },
      success: function (res) {
        if (res.data.status == '200') {
          wx.switchTab({
            url: '/pages/index/index',
          })
          wx.showToast({
            title: '删除成功',
            duration: 3000
          })
        }
      }
    })
  }
})