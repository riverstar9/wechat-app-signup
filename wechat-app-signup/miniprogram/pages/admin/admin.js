// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  switch2Help :function() {
    wx.navigateTo({
      url: '../admin-help/admin-help',
    })
  },

  switch2Excel: function() {
    wx.navigateTo({
      url: '../admin-excel/admin-excel',
    })
  },

  switch2List: function() {
    wx.navigateTo({
      url: '../admin-list/admin-list',
    })
  },

  switch2Scan: function() {
    wx.navigateTo({
      url: '../admin-scan/admin-scan',
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

  }
})