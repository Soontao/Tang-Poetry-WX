//index.js
var app = getApp()
Page({
  data: {
    title: '',
    poet: '',
    poetry: ''
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  next: function (cb) {
    var that = this;
    wx.showLoading({ title: "Loading" });
    wx.request({
      url: 'https://api.fornever.org/tang-poetry/random',
      method: 'GET',
      success: function (res) {
        var aPoetry = res.data.json[0]
        that.setData({
          title: aPoetry.title + "\n\n",
          poet: aPoetry.poet_name + "\n\n",
          poetry: aPoetry.content.replace(/。|？|！|；/g, "。\n", -1)
        })
        wx.setNavigationBarTitle({ title: aPoetry.title });
        wx.hideLoading();
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  onLoad: function () {
    this.next();
  }
})
