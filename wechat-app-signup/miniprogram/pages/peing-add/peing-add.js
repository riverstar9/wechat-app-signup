const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  switchBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  submit: function(e) {
    console.log(e)
    var info = e.detail.value;
    if (info.text=="") {
        this.setData({
          errorInfo: true,
          errorContent: "请输入内容后再提交~",
        })
    } else {
      db.collection('peing').add({
        data: {
          question: info.text,
          answer: "",
          number: 0
        }
      }).then(res => {
        this.setData({
          success: true
        })
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

  }
})