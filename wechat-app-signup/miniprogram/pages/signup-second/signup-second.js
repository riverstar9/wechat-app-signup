const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0,
    depArray: ['请选择部门','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
  },

  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  switchBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  switch2Index: function() {
    wx.reLaunch({
      url: "../index/index",
    })
  },

  getInfo: function(e) {
    this.setData({
      showLoading: true,
    })
    wx.cloud.callFunction({
      name: "updateData",
      data: {
        code: "signupSecond",
        secondInterviewTime: e.detail.value.secondInterviewTime,
      },
      success: res => {
        wx.reLaunch({
          url: "../signup-subscribe/signup-subscribe",
        })
      },
      fail: res => {
        this.setData({
          failed: true,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      secondInterview: app.globalData.userStatus.secondInterview,
      switchTo: app.globalData.userStatus.switchTo,
      timeArray: app.globalData.timeArray2,
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

  }
})