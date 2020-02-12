// pages/addrinfo/addrinfo.js
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    auth: null,
    addrinfo: null,
    addVisitorUrl: null,
    showVisitorsUrl: null
  },
  onLoad: function (options) {
    console.log(options)
    let that = this
    wx.request({
      url: baseUrl + '/addr/get/addrinfo/' + options.addrId,
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
            showVisitorsUrl: '/pages/visitorlist/visitorlist?addrId=' + options.addrId + '&addrName=' + res.data.data.name
          })
          wx.setNavigationBarTitle({
            title: res.data.data.name,
          })
        }
      }
    })
  },
})