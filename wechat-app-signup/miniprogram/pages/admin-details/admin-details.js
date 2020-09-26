const db = wx.cloud.database();
const app = getApp();

const statusArray = ["填写报名信息","第一次面试","第二次面试","最终结果查询"];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sexArray: ["男","女"],
    academyArray: ["请选择学院","安全科学与工程学院","环境科学与工程学院","材料科学与工程学院","化工学院","化学与分子工程学院",
    "电气工程与控制科学学院","机械与动力工程学院","能源科学与工程学院","药学院","建筑学院","艺术设计学院","经济与管理学院",
    "法学院","外国语言文学学院","生物与制药工程学院","食品与轻工学院","计算机科学与技术学院","数理科学学院","测绘科学与技术学院",
    "城市建设学院","交通运输工程学院","土木工程学院","2011学院","海外教育学院"],
    depArray1: ['请选择部门','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
    depArray2: ['请选择部门','不接受调剂','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
    statusArray1: ['未开始','未通过','通过','通过','通过'],
    statusArray2: ['未填写','已填写','已填写','已填写','已填写'],
    switch: 0,
    switchArray: ['未调剂','调剂至 事务企划部','调剂至 采编部','调剂至 新媒体部','调剂至 技术部','调剂至 摄影部','调剂至 素质拓展部'],
  },

  format(time, format) {
    var t = new Date(time);
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    })
  },

  star: function() {
    wx.showLoading({
      title: "Loading",
      mask: true,
    })
    wx.cloud.callFunction({
      name: "updateData",
      data: {
        code: "star",
        star: "star",
        userId: this.data.user._id,
      },
      success: res => {
        wx.hideLoading()
        wx.showModal({
          title: "成功star",
          content: "长按头像可取消star",
          showCancel: false,
        })
      },
    })
  },

  cancelStar: function() {
    wx.showLoading({
      title: "Loading",
      mask: true,
    })
    wx.cloud.callFunction({
      name: "updateData",
      data: {
        code: "star",
        star: "",
        userId: this.data.user._id,
      },
      success: res => {
        wx.hideLoading()
        wx.showModal({
          title: "成功取消star",
          content: "轻按头像可star",
          showCancel: false,
        })
      },
    })
  },

  call: function(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id
    })
  },

  copy: function(e) {
    console.log(e)
    wx.vibrateShort()
    wx.setClipboardData({
      data: e.currentTarget.id
    })
  },

  updateEvaluate: function(e) {
    wx.showLoading({
      title: "Loading",
      mask: true,
    })
    wx.getUserInfo({
      success: res => {
        var that = this;
        console.log(res)
        wx.cloud.callFunction({
          name: "updateData",
          data: {
            code: "evaluate",
            status: that.data.status,
            time: that.format(new Date(),'yyyy-MM-dd HH:mm'),
            userId: this.data.user._id,
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            evaluateDetails: e.detail.value,
          },
          success: res => {
            wx.hideLoading()
            wx.showModal({
              title: "成功评价",
              content: "轻按返回上一级",
              showCancel: false,
              success: res => {
                // db.collection("userInfo").doc(this.data.user._id).get().then(res=>{
                //   this.setData({
                //     user: res.data,
                //   })
                // }).catch(res => {
                  
                // })
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          },
        })
      }
    })
  },

  bindChange: function(e) {
    this.setData({
      switch: e.detail.value,
    })
  },

  updateResult: function(e) {
    console.log(e)
    wx.showLoading({
      title: "Loading",
      mask: true,
    })

    var resultCode = "";
    switch (app.globalData.appStatus) {
      case 1: resultCode = "result1"; break;
      case 2: resultCode = "result2"; break;
      case 3: resultCode = "result3"; break;
      default: break;
    }

    wx.getUserInfo({
      success: res => {
        var that = this;
        console.log(res)
        wx.cloud.callFunction({
          name: "updateData",
          data: {
            code: resultCode,
            status: that.data.status,
            time: that.format(new Date(),'yyyy-MM-dd HH:mm'),
            userId: this.data.user._id,
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            result: parseInt(e.detail.value.result),
            switch: parseInt(e.detail.value.switch),
          },
          success: res => {
            wx.hideLoading()
            wx.showModal({
              title: "成功审核",
              content: "轻按返回上一级",
              showCancel: false,
              success: res => {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    var that = this;
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      db.collection("userInfo").doc(data.id).get().then(res=>{
        console.log(res.data)
        that.setData({
          user: res.data,
          status: statusArray[app.globalData.appStatus-1],
          appStatus: app.globalData.appStatus,
          timeArray1: app.globalData.timeArray1,
          timeArray2: app.globalData.timeArray2,
        })
      }).catch(res => {
        console.log(res)
      })
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