// pages/addvisitor/addvisitor.js
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({
  data: {
    addrId: null,
    addrName: null,
    userinfo: {},
    showUserinfo: false,
    loading: false,
  },
  onLoad: function (options) {
    this.setData({
      addrId: options.addrId,
      addrName: options.addrName,
      search: this.search.bind(this)
    })
    wx.setNavigationBarTitle({
      title: options.addrName,
    })
  },
  search: function (value) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + '/user/fuzzy/query/user',
        method: 'POST',
        header: {
          skey: wx.getStorageSync('skey')
        },
        data: {
          value: value,
          addrId: that.data.addrId
        },
        success: function (res) {
          if (res.data.status == '200') {
            let array = []
            let data = res.data.data
            for (let i = 0; i < data.length; i++) {
              let temp = {
                text: data[i].realName,
                value: data[i]
              }
              array.push(temp)
            }
            resolve(array)
          }
        }
      })
    })
  },
  selectResult: function (e) {
    console.log(e)
    this.setData({
      userinfo: e.detail.item.value,
      showUserinfo: true
    })
  },
  addVisitor: function () {
    let that = this
    this.setData({
      loading: true
    })
    wx.request({
      url: baseUrl + '/user/add/visitor',
      method: 'POST',
      header: {
        skey: wx.getStorageSync('skey')
      },
      data: {
        visitorId: this.data.userinfo.id,
        addrId: this.data.addrId
      }, 
      success: function (res) {
        if (res.data.status == '200') {
          that.setData({
            loading: false
          })
          wx.showToast({
            title: '添加成功',
          })
        }
      }
    })
  }
})