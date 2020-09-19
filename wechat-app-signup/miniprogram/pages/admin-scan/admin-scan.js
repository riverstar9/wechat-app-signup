Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  scanQRcode: function() {
    wx.vibrateShort()
    wx.showLoading({
      title: "Loading",
      mask: true,
    })
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        wx.hideLoading()
        let id = res.result;
        if (id.length == 32) {
          wx.navigateTo({
            url: "../admin-details/admin-details",
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', {id: id})
            }
          })
        } else {
          wx.showModal({
            title: "错误",
            content: "请重新扫描二维码",
            showCancel: false,
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          title: "错误",
          content: "请重新扫描二维码",
          showCancel: false,
        })
      }
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

  }
})