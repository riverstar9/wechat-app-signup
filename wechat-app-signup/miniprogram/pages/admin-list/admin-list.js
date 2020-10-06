const pinyin = require('pinyin.js');
const app = getApp();

var allListData = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    // showPage: true,
    statusArray: ["填写报名信息","第一次面试","第二次面试","最终结果查询"],
    depArray1: ['请选择部门','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
    depArray2: ['请选择部门','不接受调剂','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'],
    sortItem1: [
      {id: 0, value: 99, name: '所有部门', isChecked: true},
      {id: 1, value: 1, name: '事务企划部', isChecked: false},
      {id: 2, value: 2, name: '采编部', isChecked: false},
      {id: 3, value: 3, name: '新媒体部', isChecked: false},
      {id: 4, value: 4, name: '技术部', isChecked: false},
      {id: 5, value: 5, name: '摄影部', isChecked: false},
      {id: 6, value: 6, name: '素质拓展部', isChecked: false},
    ],
    sortItem2: [
      {id: 0, value: 99, name: '所有状态', isChecked: true},
      {id: 1, value: -1, name: '尚未评价', isChecked: false},
      {id: 2, value: 0, name: '未通过当前阶段', isChecked: false},
      {id: 3, value: 1, name: '已通过当前阶段', isChecked: false},
    ],
    sortItem3: [
      {id: 0, value: 99, name: '所有时间', isChecked: true},
      {id: 1, value: 9, name: '尚未预约', isChecked: false},
      {id: 2, value: 0, name: '时间段1', isChecked: false},
      {id: 3, value: 1, name: '时间段2', isChecked: false},
      {id: 4, value: 2, name: '时间段3', isChecked: false},
      {id: 5, value: 3, name: '时间段4', isChecked: false},
    ],
    sortItem4: [
      {id: 0, value: 99, name: '所有记录', isChecked: true},
      {id: 1, value: 1, name: '本用户曾经审核', isChecked: false},
    ]
  },

  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    });
  },

  backToTop: function() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  search: function(e) {
    let key = e.detail.value;
    console.log(key)
    let tempData = JSON.parse(JSON.stringify(this.data.searchData)); 
    for (let item of tempData) {
      for (let i=item.length ; i>0 ;i--) {
        if (item[i-1].username.indexOf(key) == -1) {
          item.splice((i-1), 1);
        }
      }
    }
    this.setData({
      listData: tempData,
    })
  },

  switchTab: function(e) {
    let that = this;
    let key = e.detail.currentIndex;
    console.log(key)

    if (key == 7) {
      this.setData({
        popupShow: true,
      });
    } else if (key == 0) {
      this.setData({
        listData: allListData,
      })
    } else {
      that.sortList({detail:{
        value:{
          dep: key,
          status: 99,
          time: 99,
          evaluate: 99,
        }
      }})
    }
  },

  sortList: function(e) {
    console.log(e.detail.value)
    let key = e.detail.value;
    let tempData = JSON.parse(JSON.stringify(allListData));
    // console.log(tempData)

    if (this.data.appStatus == 1 || this.data.appStatus == 4) {
      key.time = 99;
    }

    for (let item of tempData) {
      for (let i=item.length ; i>0 ;i--) {
        let judge = true;
        // console.log(item[i-1])
        if (key.dep != 99) {
          judge = judge && (((parseInt(item[i-1].dep1) == key.dep) || ((parseInt(item[i-1].dep2) - 1) == key.dep)));
        }
        if (key.status != 99) {
          judge = judge && (parseInt(item[i-1].userStatus) == key.status);
        }
        if (key.time != 99) {
          judge = judge && (parseInt(item[i-1].interviewTime) == key.time);
        }
        if (key.evaluate != 99) {
          if (item[i-1].evaluate.indexOf(this.data.username) == -1) {
            judge = judge && false;
          }
        }
        // console.log(judge)
        if (!judge) {
          item.splice((i-1), 1);
        }
      }
    }
    this.setData({
      listData: tempData,
      searchData: tempData,
      popupShow: false,
    })
  },

  switch2Details: function(e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "../admin-details/admin-details",
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {id: e.currentTarget.id})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const promise = new Promise((resolve,reject)=>{
      let tempListData = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
      let listData = [];
      let sideBarData = [];

      wx.cloud.callFunction({
        name: "getAllUserInfo",
        data: {},
      }).then(res => {
        console.log(res)

        let tempDatas = res.result.data.map(function(data){
          let userStatus;
          let interviewTime;
          switch (app.globalData.appStatus) {
            case 1: userStatus=data.userStatus.firstInterview; interviewTime=-1; break;
            case 2: userStatus=data.userStatus.secondInterview; interviewTime=data.userStatus.firstInterviewTime; break;
            case 3: userStatus=data.userStatus.result; interviewTime=data.userStatus.secondInterviewTime; break;
            case 4: userStatus=data.userStatus.result; interviewTime=-1; break;
            default: break;
          }
          return {
            id: data._id,
            userAvatar: data.userInfo.avatarUrl,
            username: data.userDetails.username,
            editTimes: data.userStatus.editTimes,
            dep1: data.userDetails.dep1,
            dep2: data.userDetails.dep2,
            userStatus: userStatus,
            interviewTime: interviewTime,
            star: data.userStatus.star,
            evaluate: data.userStatus.evaluate,
          }
        })

        console.log(tempDatas)

        for (let item of tempDatas) {
          if (item.editTimes != -1) {
            console.log(item)
            let firstChar = pinyin.toPY(item.username).acronym.charCodeAt(0) - 'a'.charCodeAt(0);
            tempListData[firstChar].push(item);
          }
        }
  
        for (let i=0 ; i<26 ; i++) {
          if (tempListData[i].length != 0) {
            listData.push(tempListData[i])
            sideBarData.push(String.fromCharCode(65 + i))
          }
        }

        allListData = listData;

        this.setData({
          listData: listData,
          searchData: listData,
          sideBarData: sideBarData,
          appStatus: app.globalData.appStatus,
        })

        console.log()

        if (sideBarData.length != 0) {
          resolve(true)
        } else {
          reject(false)
        }
        
      })
    })

    promise.then(res=>{
      wx.getUserInfo({
        success: e => {
          this.setData({
            showPage: res,
            username: e.userInfo.nickName
          })
        }
      })
    },err=>{
      console.log(err)
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