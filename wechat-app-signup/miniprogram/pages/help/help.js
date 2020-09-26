// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  switch2Help: function() {
    wx.navigateTo({
      url: '../help-details/help-details',
    })
  },

  switch2Contact: function() {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },

  switch2Peing: function() {
    wx.navigateTo({
      url: '../peing/peing',
    })
  },

  switch2Develop: function() {
    wx.navigateTo({
      url: '../develop/develop',
    })
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
    return {
      title: '南工青媒招新啦 赶快打开招新小程序报名吧',
      path: '/pages/welcome/welcome',
      imageUrl: "../../images/message.jpg"
    }
  }
})