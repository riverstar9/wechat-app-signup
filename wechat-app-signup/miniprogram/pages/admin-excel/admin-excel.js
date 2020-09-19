const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getTime: function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1));
    var day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    var hour = (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours());
    var minute = (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes());
    return (year + month + day + hour + minute)
  },

  createExcel: function() {
    var that = this;
    wx.showModal({
      title: "注意",
      content: "请不要频繁重新获取excel，轻按确定可更新表格并复制下载链接",
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: "Loading",
            mask: true,
          })
          wx.cloud.callFunction({
            name: "exportExcel",
            data: {
              time: that.getTime(),
              timeArray1: app.globalData.timeArray1,
              timeArray2: app.globalData.timeArray2,
              nickname: that.data.nickname,
            },
            success: res => {
              wx.hideLoading()
              that.copyFileUrl()
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  copyFileUrl() {
    wx.cloud.getTempFileURL({
      fileList: ["cloud://clouddata-odmpc.636c-clouddata-odmpc-1302248851/userdata.xlsx"],
      success: res => {
        wx.setClipboardData({
          data: res.fileList[0].tempFileURL,
          success(res) {
            wx.getClipboardData({
              success(res) {
                console.log("复制成功",res.data) // data
              }
            })
          }
        })
      },
    })
  },

  uploadExcel: function() {
    var that = this;
    wx.showModal({
      title: "注意",
      content: "请不要频繁上传excel，上传的文件需符合管理员手册中的要求，否则将出现【严重】的问题",
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: "Loading",
            mask: true,
          })
          wx.chooseMessageFile({
            count: 1,
            type: "file",
            extension: ["xlsx"],
            success: res => {
              wx.cloud.uploadFile({
                cloudPath: "userdata/upload/" + that.getTime() + "-" + that.data.nickname + ".xlsx",
                filePath: res.tempFiles[0].path,
                success: res => {
                  wx.cloud.callFunction({
                    name: "importExcel",
                    data: {
                      fileID: res.fileID
                    },
                    success: res => {
                      wx.hideLoading()
                      wx.showModal({
                        title: "完成",
                        content: "记得检查数据是否写入成功",
                        showCancel: false,
                      })
                    },
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
          nickname: res.userInfo.nickName
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

  }
})