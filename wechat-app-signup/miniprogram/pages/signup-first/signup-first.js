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

  requestSubscribe: function() {
    wx.requestSubscribeMessage({
      tmplIds: ["R72BPq5w-C-4NVFWSm-3B2Y8XNxfXwOxcjFQAeh3It8"],
      success: res => {
        if (res["R72BPq5w-C-4NVFWSm-3B2Y8XNxfXwOxcjFQAeh3It8"] == "accept") {
          wx.reLaunch({
            url: "../index/index",
          })
        } else {
          this.setData({
            subscribeFailed: true
          })
        }
      }
    })
  },

  getInfo: function(e) {
    console.log(e)
    this.setData({
      showLoading: true,
    })
    app.globalData.userDetails = e.userDetails;
    wx.cloud.callFunction({
      name: "updateData",
      data: {
        code: "signupFirst",
        firstInterviewTime: e.detail.value.firstInterviewTime,
      },
      success: res => {
        this.setData({
          showLoading: false,
          showDialog: true,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      firstInterview: app.globalData.userStatus.firstInterview,
      switchTo: app.globalData.userStatus.switchTo,
      timeArray: app.globalData.timeArray1,
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