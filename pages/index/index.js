//index.js
//获取应用实例
const app = getApp()
const baseUrl = app.globalData.baseUrl

Page({
  data: {
    addrs: [],
    dialogShow: false,
    dialogBtns: [{
      text: '确认'
    }],
    credentialUrl: null
  },
  onLoad: function () {
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    this.getAddrs()
  },
  getAddrs: function () {
    let that = this
    wx.request({
      url: baseUrl + '/user/list/addrs',
      header: {
        skey: wx.getStorageSync('skey')
      },
      success: function (res) {
        console.log(res)
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
            auth: data[i].userAuth
          }
          if (data[i].userAuth == 2) {
            addr.slideBtns = [{
                text: '凭证',
                data: slideData
              },{
                text: '扫码',
                data: slideData
              }]
          } else if (data[i].userAuth == 1) {
            addr.slideBtns = [{
              text: '凭证',
              data: slideData
            }]
          } else {
            addr.slideBtns = [{
              text: '申请',
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
    console.log('slide button tap', e.detail)
    const index = e.detail.index
    const data = e.detail.data
    let that = this
    if (index == 0 && (data.auth == 2 || data.auth == 1)) {
      wx.downloadFile({
        url: baseUrl + '/qrcode/get/credential/' + data.addrId,
        header: {
          skey: wx.getStorageSync('skey')
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode === 200) {
            that.setData({
              dialogShow: true,
              credentialUrl: res.tempFilePath
            })
          }
        }
      })
    }
    if (index == 1 && data.auth == 2) {
      wx.scanCode({
        complete: (res) => {
          console.log(res)
          wx.request({
            url: baseUrl + '/user/auth/visit',
            method: 'POST',
            header: {
              skey: wx.getStorageSync('skey')
            },
            data: {
              credential: res.result,
              addrId: data.addrId
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
    }
  },
  clickDialogBtn() {
    this.setData({
      dialogShow: false
    })
  }
})