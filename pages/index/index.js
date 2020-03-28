//index.js
//获取应用实例
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    addrs: []
  },
  onShow: function () {
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    this.getAddrs()
  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },
  getAddrs: function () {
    let that = this
    wx.request({
      url: baseUrl + '/addr/list',
      header: {
        skey: wx.getStorageSync('skey')
      },
      success: function (res) {
        const data = res.data.data
        let addrs = []
        for (let i = 0; i < data.length; i++) {
          let addr = {
            name: data[i].addrName,
            id: data[i].addrId,
            url: '/pages/addrinfo/addrinfo?addrId=' + data[i].addrId + '&auth=' + data[i].userAuth
          }
          let slideData = {
            addrId: data[i].addrId,
            auth: data[i].userAuth,
            addrName: data[i].addrName
          }
          if (data[i].userAuth == 2) {
            addr.slideBtns = [{
              text: '扫码',
              data: slideData
            }]
          } else if (data[i].userAuth == 1) {
            addr.slideBtns = [{
              text: '凭证',
              data: slideData
            }]
          }
          addrs.push(addr)
        }
        that.setData({
          addrs: addrs
        })
      }
    })
  },
  slideButtonTap(e) {
    const data = e.detail.data
    if (data.auth == 1) {
      wx.navigateTo({
        url: '/pages/credential/credential?addrId=' + data.addrId + '&addrName=' + data.addrName,
      })
    } else if (data.auth == 2) {
      wx.scanCode({
        scanType: ['qrCode'],
        success(res) {
          wx.navigateTo({
            url: '/pages/visitorinfo/visitorinfo?credential=' + res.result + "&addrId=" + data.addrId + "&addrName=" + data.addrName,
          })
        },
      })
    }
  }
})