import drawQrcode from '../../weapp.qrcode.min.js';
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showDetails: false,
    isAdmin: -1,
    status: 0,
    academyArray: ["请选择学院","安全科学与工程学院","环境科学与工程学院","材料科学与工程学院","化工学院","化学与分子工程学院",
      "电气工程与控制科学学院","机械与动力工程学院","能源科学与工程学院","药学院","建筑学院","艺术设计学院","经济与管理学院",
      "法学院","外国语言文学学院","生物与制药工程学院","食品与轻工学院","计算机科学与技术学院","数理科学学院","测绘科学与技术学院",
      "城市建设学院","交通运输工程学院","土木工程学院","2011学院","海外教育学院"],
    depArray1: ['请选择部门','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
    depArray2: ['请选择部门','不接受调剂','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
    switch: 0,
    switchArray: ['未调剂','调剂至 事务企划部','调剂至 采编部','调剂至 新媒体部','调剂至 技术部','调剂至 摄影部','调剂至 素质拓展部'],
  },

  switch2Admin: function() {
    wx.reLaunch({
      url: "../admin/admin",
    })
  },

  switch2Contact: function() {
    wx.navigateTo({
      url: "../contact/contact",
    })
  },

  switch2Develop: function() {
    wx.navigateTo({
      url: "../develop/develop",
    })
  },

  showDetails: function() {
    this.setData({
      showDetails: !(this.data.showDetails)
    })
  },

  getStatus: function() {
    var status = 0;
    if(app.globalData.appStatus == 1 && this.data.userStatus.editTimes == -1){
      status = 11;
    }
    else if(app.globalData.appStatus == 1 && this.data.userStatus.editTimes == 0){
      status = 12;
    }
    else if(app.globalData.appStatus == 1 && this.data.userStatus.editTimes == 1){
      status = 13;
    }
    else if(app.globalData.appStatus == 2 && this.data.userStatus.firstInterview == 0){
      status = 21;
    }
    else if(app.globalData.appStatus == 2 && this.data.userStatus.firstInterview == 1){
      status = 22;
    }
    else if(app.globalData.appStatus == 2 && this.data.userStatus.firstInterview == 2){
      status = 23;
    }
    else if(app.globalData.appStatus == 3 && this.data.userStatus.secondInterview == 0){
      status = 31;
    }
    else if(app.globalData.appStatus == 3 && this.data.userStatus.secondInterview == 1){
      status = 32;
    }
    else if(app.globalData.appStatus == 3 && this.data.userStatus.secondInterview == 2){
      status = 33;
    }
    else if(app.globalData.appStatus == 4 && this.data.userStatus.result == 0){
      status = 41;
    }
    else if(app.globalData.appStatus == 4 && this.data.userStatus.result == 1){
      status = 42;
    }
    else{
      status = 0;
    }
    this.setData({
      status: status,
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
          nickName: res.userInfo.nickName,
        })
      //   resolve(true)
      // },
      // fail: res => {
      //   reject(false)
      }
    })

    const promise = new Promise((resolve,reject)=>{
      wx.getSystemInfo({
        success: res=> {
          console.log(res)
          this.setData({
            myQRcodeWidth: (res.windowWidth)*0.45,
            myQRcodeHeight: (res.windowWidth)*0.45,
            isAdmin: app.globalData.userStatus.isAdmin,
            userDetails: app.globalData.userDetails,
            userStatus: app.globalData.userStatus,
          })
          resolve(true)
        },
        fail: res => {
          reject(false)
        }
      })
    })

    promise.then(res=>{
      var that = this;
      that.getStatus();

      drawQrcode({
        width: that.data.myQRcodeWidth,
        height: that.data.myQRcodeWidth,
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
    },err=>{
      console.log(err)
    })

    setTimeout(() => {
      this.setData({
        showToast: true
      })
    }, 800);
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
              ctx.fillText(this.data.userDetails.username + '的报名二维码',this.data.canvasWidth*0.5,this.data.canvasWidth*0.81)
              
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