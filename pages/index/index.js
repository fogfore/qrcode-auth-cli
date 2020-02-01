//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    codeDialogShow: true,
    codeDialogButtons: [{ text: '确定' }],
    carousels: [
      {
        name: "1",
        picUrl: "/images/1.jpg"
      },
      {
        name: "2",
        picUrl: "/images/2.jpg"
      },
      {
        name: "3",
        picUrl: "/images/3.jpg"
      }
    ]
  },
  scanCode: function () {
    wx.scanCode({
      success: res => {
        console.log(res)
      }
    })
  },
  getCode: function () {
    this.setData({
      codeDialogShow: true
    })
  },
  clickDialogBtn: function(e) {
    this.setData({
      codeDialogShow: false
    })
  }
})
