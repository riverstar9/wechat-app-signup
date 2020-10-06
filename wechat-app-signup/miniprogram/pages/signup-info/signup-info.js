const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    wrongInfo: false,
    userDetails: {
      sex: 0,
      date: '2003-01-01',
      dateY: "2003",
      dateM: "01",
      dateD: "01",
      region: ['江苏省', '南京市', '浦口区'],
      academy: 0,
      dep1: 0,
      dep2: 0,
    },
    sexArray: ['男','女'],
    academyArray: ["请选择学院","安全科学与工程学院","环境科学与工程学院","材料科学与工程学院","化工学院","化学与分子工程学院",
      "电气工程与控制科学学院","机械与动力工程学院","能源科学与工程学院","药学院","建筑学院","艺术设计学院","经济与管理学院",
      "法学院","外国语言文学学院","生物与制药工程学院","食品与轻工学院","计算机科学与技术学院","数理科学学院","测绘科学与技术学院",
      "城市建设学院","交通运输工程学院","土木工程学院","2011学院","海外教育学院"],
    depArray1: ['请选择部门','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
    depArray2: ['请选择部门','不接受调剂','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
  },

  bindSexChange: function(e) {
    this.setData({
      'userDetails.sex': e.detail.value,
    })
  },

  bindBirthChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      'userDetails.date': e.detail.value,
      'userDetails.dateY': e.detail.value.substring(0,4),
      'userDetails.dateM': e.detail.value.substring(5,7),
      'userDetails.dateD': e.detail.value.substring(8,10),
    })
  },

  bindRegionChange: function(e) {
    this.setData({
      'userDetails.region': e.detail.value,
    })
  },

  bindAcademyChange: function(e) {
    this.setData({
      'userDetails.academy': e.detail.value,
    })
  },

  bindDep1Change: function(e) {
    this.setData({
      'userDetails.dep1': e.detail.value,
    })
  },

  bindDep2Change: function(e) {
    this.setData({
      'userDetails.dep2': e.detail.value
    })
  },

  isChinese: function(temp){
    var re=/[^\u4E00-\u9FA5]/;
    if (re.test(temp)) return true;
    return false;
  },

  getInfo: function(e) {
    console.log(e)
    var that = this;
    var info = e.detail.value;
    if (info.username=="" || info.academy==0 || info.subject=="" || info.dorm=="" || info.phone=="" ||
      info.sns=="" || info.dep1==0 || info.dep2==0 || info.introduce=="") {
        this.setData({
          errorInfo: true,
          errorContent: "有部分信息没有填写，请稍作检查后再次提交",
        })
    } else if (info.phone.length!=11) {
      this.setData({
        errorInfo: true,
        errorContent: "姓名格式错误，请填写中文姓名",
      })
    } else if (that.isChinese(info.username)) {
      this.setData({
        errorInfo: true,
        errorContent: "手机号格式错误，请稍作检查后再次提交",
      })
    } else if (parseInt(info.dep1)+1==parseInt(info.dep2)) {
      this.setData({
        errorInfo: true,
        errorContent: "一志愿部门不能和二志愿相同",
      })
    } else {
      app.globalData.userDetails = info;
      wx.requestSubscribeMessage({
        tmplIds: ["R72BPq5w-C-4NVFWSm-3B-JkTI-a0HrqcwXYDbtCse0"],
        success: res => {
          if (res["R72BPq5w-C-4NVFWSm-3B-JkTI-a0HrqcwXYDbtCse0"] == "accept") {
            this.setData({
              showLoading: true,
            })
            wx.cloud.callFunction({
              name: "updateData",
              data: {
                code: "signupInfo",
                userDetails: info,
              },
              success: res => {
                wx.reLaunch({
                  url: "../signup-qrcode/signup-qrcode",
                })
              },
            })
          } else {
            this.setData({
              subscribeFailed: true
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (app.globalData.userStatus.editTimes == 0) {
      var userDetails = app.globalData.userDetails;
      this.setData({
        userDetails: app.globalData.userDetails,
      })
      console.log(this.data)
      // that.bindSexChange({
      //   detail: {
      //     value: userDetails.sex,
      //   }
      // })
      that.bindBirthChange({
        detail: {
          value: userDetails.birth,
        }
      })
      // that.bindRegionChange({
      //   detail: {
      //     value: userDetails.region,
      //   }
      // })
      // that.bindAcademyChange({
      //   detail: {
      //     value: userDetails.academy,
      //   }
      // })
      // that.bindDep1Change({
      //   detail: {
      //     value: userDetails.dep1,
      //   }
      // })
      // that.bindDep2Change({
      //   detail: {
      //     value: userDetails.dep2,
      //   }
      // })
    }
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