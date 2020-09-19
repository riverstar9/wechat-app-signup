const db = wx.cloud.database();
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    titleArray: [
      ["以梦为马", "诗酒年华"],
      ["真实报道", "真情创作", "公平正义", "理性引导"],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ]
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.setData({
        loadModal: true
      })
      setTimeout(()=> {
        this.setData({
          loadModal: false
        })
      }, 5000)
      wx.cloud.callFunction({
        name: "login",
        data: {
          userInfo: e.detail.userInfo,
        },
        success: res => {
          console.log(res)
          app.globalData.userId = res.result.data[0]._id
          app.globalData.userStatus = res.result.data[0].userStatus
          app.globalData.userDetails = res.result.data[0].userDetails
          wx.reLaunch({
            url: "../index/index",
          })
        },
      })
    } else {
      this.setData({
        showDialog: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let min = 0;
    let max = 1;
    let magic;
    magic = Math.floor(Math.random()*(max-min+1)+min);
    this.setData({
      title: magic,
      // title: 1,
    })

    db.collection("cloudStatus").get().then(res => {
      app.globalData.appStatus = res.data[0].appStatus
      app.globalData.timeArray1 = res.data[0].timeArray1
      app.globalData.timeArray2 = res.data[0].timeArray2
      app.globalData.sns = res.data[0].sns
    })

    // wx.getSystemInfo({
    //   success: res => {
    //     if (res.platform == "ios") {
    //       this.setData({
    //         showToast: true,
    //       })
    //     }
    //   }
    // })
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
  // onShareAppMessage: function () {

  // }
})