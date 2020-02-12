// pages/visitorlist/visitorlist.js
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    addrId: null,
    addrName: null
  },
  onLoad: function (options) {
    this.setData({
      addrId: options.addrId,
      addrName: options.addrName
    })
    wx.setNavigationBarTitle({
      title: options.addrName,
    })
  },
})