const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  switch2Index: function() {
    wx.reLaunch({
      url: "../index/index",
    })
  },

  message: function() {
    console.log(app.globalData.appStatus)
    // app.globalData.appStatus = 2;
    if (app.globalData.appStatus == 2) {
      wx.requestSubscribeMessage({
        tmplIds: ["R72BPq5w-C-4NVFWSm-3B2Y8XNxfXwOxcjFQAeh3It8"],
        success: res => {
          console.log("messok")
          if (res["R72BPq5w-C-4NVFWSm-3B2Y8XNxfXwOxcjFQAeh3It8"] == "accept") {
            console.log("set")
            this.setData({
              subscribeSucceed: true
            })
          } else {
            console.log("setfailed")
            this.setData({
              subscribeFailed: true
            })
          }
        },
        fail: res => {
          console.log("messfailed")
        }
      })
    } else if (app.globalData.appStatus == 3) {
      wx.requestSubscribeMessage({
        tmplIds: ["R72BPq5w-C-4NVFWSm-3B2bLNvbmMVD3PgKXMZrRou8"],
        success: res => {
          console.log("messok")
          if (res["R72BPq5w-C-4NVFWSm-3B2bLNvbmMVD3PgKXMZrRou8"] == "accept") {
            console.log("set")
            this.setData({
              subscribeSucceed: true
            })
          } else {
            console.log("setfailed")
            this.setData({
              subscribeFailed: true
            })
          }
        },
        fail: res => {
          console.log("messfailed")
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})