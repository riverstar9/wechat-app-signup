import drawQrcode from '../../weapp.qrcode.min.js';
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  requestSubscribe: function() {
    wx.requestSubscribeMessage({
      tmplIds: ["R72BPq5w-C-4NVFWSm-3B-JkTI-a0HrqcwXYDbtCse0"],
      success: res => {
        if (res["R72BPq5w-C-4NVFWSm-3B-JkTI-a0HrqcwXYDbtCse0"] == "accept") {
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

  showModal: function() {
    this.setData({
      loadModal: true
    })
    setTimeout(()=> {
      this.setData({
        loadModal: false
      })
    }, 50000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qrcodeWidth = 0;
    wx.getSystemInfo({
      success (res) {
        qrcodeWidth = (res.windowWidth)*0.45
      }
    })
    this.setData({
      myQRcodeWidth: qrcodeWidth,
      myQRcodeHeight: qrcodeWidth,
    })

    drawQrcode({
      width: qrcodeWidth,
      height: qrcodeWidth,
      canvasId: 'myQRcode',
      text: app.globalData.userId,
      // image: {
      //   imageResource: '../../images/tips.svg',
      //   dx: 70,
      //   dy: 70,
      //   dWidth: 60,
      //   dHeight: 60
      // },
    })
  },

  getShareImg: function() {
    this.setData({
      showMask: true,
      showLoading: true,
      showMyQRcode: "position:fixed;left:100%;",
    })

    wx.getSystemInfo({
      success: res=> {
        this.setData({
          canvasWidth: res.windowWidth * 2,
          canvasHeight: (res.windowWidth) * 2.4,
          qrcodeWidth: ((res.windowWidth) * 1.2) / res.pixelRatio,
        })
      }
    })

    var qrctx = wx.createCanvasContext('qrCanvas');
    drawQrcode({
      width: this.data.qrcodeWidth,
      height: this.data.qrcodeWidth,
      canvasId: 'qrCanvas',
      ctx: qrctx,
      text: app.globalData.userId,
      // image: {
      //   imageResource: '../../images/tips.svg',
      //   dx: 70,
      //   dy: 70,
      //   dWidth: 60,
      //   dHeight: 60
      // },
      callback: res => {
        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: 'qrCanvas',
            success: res => {
              var tempFilePath = res.tempFilePath;

              var ctx = wx.createCanvasContext('shareCanvas')
              ctx.drawImage("../../images/share.png",0,0,this.data.canvasWidth,this.data.canvasHeight);

              ctx.font = 'normal bold 30px sans-serif';
              ctx.setTextAlign('center')
              ctx.fillText(app.globalData.userDetails.username + '的报名二维码',this.data.canvasWidth*0.5,this.data.canvasWidth*0.81)
              
              ctx.font = 'normal bold 18px sans-serif';
              ctx.setTextAlign('center')
              ctx.setFillStyle('#fee183')
              ctx.fillText('※ 面试时请出示本二维码',this.data.canvasWidth*0.5,this.data.canvasWidth*0.85)

              ctx.draw(true,()=>{
                setTimeout(() => {
                  ctx.drawImage(tempFilePath,this.data.canvasWidth*0.2,this.data.canvasWidth*0.14)
                  ctx.draw(true,()=>{
                    wx.canvasToTempFilePath({
                      canvasId: 'shareCanvas',
                      success: res => {
                        this.setData({
                          shareImg: res.tempFilePath,
                          showLoading: false,
                          showImg: true,
                        })
                      }
                    })
                  })
                }, 500);
              })
            }
          })
        }, 500);
      }
    })
  },

  saveShareImg: function() {
    var that = this;
    wx.getSetting({
      success(res) {
        // 获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: that.data.shareImg,
                success() {
                  that.setData({
                    showImg: false,
                    saveSuccess: true,
                  })
                },
                fail() {                                
                  that.setData({
                    showImg: false,
                    saveFailed: true,
                  })
                }
              })
            },
            fail() {
              that.setData({
                authorizeFailed: true,
              })
            }
          })
        } else {
          // 直接保存
          wx.saveImageToPhotosAlbum({
            filePath: that.data.shareImg,
            success() {
              that.setData({
                showImg: false,
                saveSuccess: true,
              })
            },
            fail() {
              that.setData({
                showImg: false,
                saveFailed: true,
              })
            }
          })
        }
      }
    })
  },

  closeShareImg: function() {
    this.setData({
      showImg: false,
      showMask: false,
      showMyQRcode: "",
    })
  },

  authorize: function() {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
      }
    })
  },

  closeMask: function() {
    this.setData({
      showMask: false,
      showMyQRcode: "",
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