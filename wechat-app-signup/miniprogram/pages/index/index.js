const db = wx.cloud.database();
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: ""
  },

  switch2Signup: function() {
    if (app.globalData.userStatus.isAdmin == 1) {
      wx.navigateTo({
        url: '../admin/admin',
      })
    } else {
      wx.navigateTo({
        url: '../signup/signup',
      })
    }
  },

  switch2Help: function() {
    wx.navigateTo({
      url: '../help/help',
    })
  },

  switch2About: function() {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  switch2Myself: function() {
    wx.navigateTo({
      url: '../myself/myself',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        console.log(res)
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
        })

        wx.cloud.callFunction({
          name: "getUserInfo",
          data: {},
          success: res => {
            console.log(res)
            app.globalData.userId = res.result.data[0]._id
            app.globalData.userStatus = res.result.data[0].userStatus
            app.globalData.userDetails = res.result.data[0].userDetails
          },
        })
      }
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
    return {
      title: '南工青媒招新啦 赶快打开招新小程序报名吧',
      path: '/pages/welcome/welcome',
      imageUrl: "../../images/message.jpg"
    }
  },

  onPullDownRefresh() {
    db.collection("cloudStatus").get().then(res => {
      app.globalData.appStatus = res.data[0].appStatus
      app.globalData.timeArray1 = res.data[0].timeArray1
      app.globalData.timeArray2 = res.data[0].timeArray2
    })

    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {},
      success: res => {
        console.log(res)
        app.globalData.userId = res.result.data[0]._id
        app.globalData.userStatus = res.result.data[0].userStatus
        app.globalData.userDetails = res.result.data[0].userDetails
        this.setData({
          showMessage: true,
        })
        wx.stopPullDownRefresh()
      },
    })
  }
})