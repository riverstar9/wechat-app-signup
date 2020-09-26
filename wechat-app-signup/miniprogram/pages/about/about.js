// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = wx.getLaunchOptionsSync();
    switch (info.scene) {
      case 1154:
        break;
      
      case 1155:
        this.setData({
          index: true,
        })
        break;

      default:
        this.setData({
          timeline: true,
        })
        break;
    }

    setTimeout(() => {
      this.setData({
        index: false,
        timeline: false
      })
    }, 8000);
  },

  closeIndex: function() {
    this.setData({
      index: false,
    })
  },

  closeTimeline: function() {
    this.setData({
      timeline: false,
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

  onShareTimeline: function () {
    return {
      title: "南工青媒招新啦 赶快打开招新小程序报名吧",
      imageUrl: "../../images/icon.png"
    }
  }
})