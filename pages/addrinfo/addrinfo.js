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
        if (res.data.status == '200') {
          let addrinfo = res.data.data
          that.setData({
            auth: options.auth,
            addrinfo: addrinfo,
            addVisitorUrl: '/pages/addvisitor/addvisitor?addrId=' + options.addrId + '&addrName=' + addrinfo.name,
            showVisitorsUrl: '/pages/visitorlist/visitorlist?addrId=' + options.addrId + '&addrName=' + addrinfo.name,
            credentialUrl: '/pages/credential/credential?addrId=' + options.addrId + '&addrName=' + addrinfo.name
          })
          wx.setNavigationBarTitle({
            title: addrinfo.name,
          })
        }
      }
    })
  },
  dealAuth: function () {
    let addrinfo = this.data.addrinfo
    wx.scanCode({
      complete: (res) => {
        wx.navigateTo({
          url: '/pages/visitorinfo/visitorinfo?credential=' + res.result + "&addrId=" + addrinfo.id + "&addrName=" + addrinfo.name,
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