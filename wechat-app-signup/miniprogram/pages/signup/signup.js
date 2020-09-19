const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animate1: "switchIn",
    animate2: "switchOut",
    animate3: "switchOut",
    animate4: "switchOut",
    scrollToCurrent: "",
  },

  swiperChange: function(e) {
    var pageNow = e.detail.current;
    if (pageNow == 0) {
      this.setData({
        animate1: "switchIn",
        animate2: "switchOut",
        animate3: "switchOut",
        animate4: "switchOut",
      })
    }
    else if (pageNow == 1) {
      this.setData({
        animate1: "switchOut",
        animate2: "switchIn",
        animate3: "switchOut",
        animate4: "switchOut",
      })
    }
    else if (pageNow == 2) {
      this.setData({
        animate1: "switchOut",
        animate2: "switchOut",
        animate3: "switchIn",
        animate4: "switchOut",
      })
    }
    else if (pageNow == 3) {
      this.setData({
        animate1: "switchOut",
        animate2: "switchOut",
        animate3: "switchOut",
        animate4: "switchIn",
      })
    }
  },

  switchSwiper: function(e) {
    console.log(e)
    this.setData({
      scrollToCurrent: parseInt(e.currentTarget.id)
    })
  },

  switch2Info: function() {
    if (app.globalData.appStatus == 1 && (app.globalData.userStatus.editTimes == -1 || app.globalData.userStatus.editTimes == 0)) {
      wx.navigateTo({
        url: '../signup-info/signup-info',
      })
    } else {
      wx.navigateTo({
        url: '../error/error',
      })
    }
  },

  switch2First: function() {
    if (app.globalData.appStatus == 2 && app.globalData.userStatus.firstInterview != -1) {
      wx.navigateTo({
        url: '../signup-first/signup-first',
      })
    } else {
      wx.navigateTo({
        url: '../error/error',
      })
    }
  },

  switch2Second: function() {
    if (app.globalData.appStatus == 3 && app.globalData.userStatus.secondInterview != -1) {
      wx.navigateTo({
        url: '../signup-second/signup-second',
      })
    } else {
      wx.navigateTo({
        url: '../error/error',
      })
    }
  },

  switch2Result: function() {
    if (app.globalData.appStatus == 4 && app.globalData.userStatus.result != -1) {
      wx.navigateTo({
        url: '../signup-result/signup-result',
      })
    } else {
      wx.navigateTo({
        url: '../error/error',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scrollToCurrent: (app.globalData.appStatus) - 1,
    })
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