// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "clouddata-odmpc"
})

//操作excel用的类库
const xlsx = require('node-xlsx');

var sexArray = ['男','女'];
var academyArray = ["请选择学院","安全科学与工程学院","环境科学与工程学院","材料科学与工程学院","化工学院","化学与分子工程学院",
  "电气工程与控制科学学院","机械与动力工程学院","能源科学与工程学院","药学院","建筑学院","艺术设计学院","经济与管理学院",
  "法学院","外国语言文学学院","生物与制药工程学院","食品与轻工学院","计算机科学与技术学院","数理科学学院","测绘科学与技术学院",
  "城市建设学院","交通运输工程学院","土木工程学院","2011学院","海外教育学院"];
var depArray1 = ['请选择部门','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'];
var depArray2 = ['请选择部门','不接受调剂','事务企划部','采编部','新媒体部','技术部','摄影部','素质拓展部'];
var statusArray = ['未开始','未通过','通过','通过','通过'];
var switchArray = ['未调剂','调剂至 事务企划部','调剂至 采编部','调剂至 新媒体部','调剂至 技术部','调剂至 摄影部','调剂至 素质拓展部'];

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext)

  try {
    let userdataObj = await cloud.callFunction({
      name: "getAllUserInfo",
      data: {},
    })
    let userdata = userdataObj.result.data

    //1,定义excel表格名
    let dataCVS = "userdata/userdata" + event.time + ".xlsx"
    // let dataCVS = 'userdata.xlsx'

    //2，定义存储的数据
    let alldata1 = [];
    let alldata2 = [];
    let alldata3 = [];
    let alldata4 = [];
    let alldata5 = [];
    let alldata6 = [];
    let alldataArray = [alldata1, alldata2, alldata3, alldata4, alldata5, alldata6];

    let title = ["本表由【" + event.nickname + "】新建于【" + event.time + "】，请确保您与合作成员使用的表格为相同版本；请勿修改第一列id值"];
    let row = ['id', '姓名', '性别', '生日', '籍贯', '学院', '班级', '宿舍区', '手机', 'QQ', '第一志愿部门', '第二志愿部门',
      '自我介绍与申请理由', '兴趣爱好', '信息审核状态', '一面时间', '一面状态', '二面时间', '二面状态', '部门调剂状态']; //表属性

    for (let item of alldataArray) {
      item.push(title);
      item.push(row);
    }

    var timeArray1 = event.timeArray1;
    var timeArray2 = event.timeArray2;
    console.log(event.time)

    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key]._id);
      arr.push(userdata[key].userDetails.username);

      arr.push(sexArray[userdata[key].userDetails.sex]);
      arr.push(userdata[key].userDetails.birth);
      arr.push(userdata[key].userDetails.region);
      arr.push(academyArray[userdata[key].userDetails.academy]);
      arr.push(userdata[key].userDetails.subject);
      arr.push(userdata[key].userDetails.dorm);
      arr.push(userdata[key].userDetails.phone);
      arr.push(userdata[key].userDetails.sns);

      arr.push(depArray1[userdata[key].userDetails.dep1]);
      arr.push(depArray2[userdata[key].userDetails.dep2]);
      arr.push(userdata[key].userDetails.introduce);
      arr.push(userdata[key].userDetails.hobby);

      arr.push(statusArray[(userdata[key].userStatus.firstInterview + 1)]);
      arr.push(timeArray1[userdata[key].userStatus.firstInterviewTime + 1]);
      arr.push(statusArray[(userdata[key].userStatus.secondInterview + 1)]);
      arr.push(timeArray2[userdata[key].userStatus.secondInterviewTime + 1]);
      arr.push(statusArray[(userdata[key].userStatus.result + 1)]);
      arr.push(switchArray[(userdata[key].userStatus.switchTo + 1)]);

      switch(parseInt(userdata[key].userDetails.dep1)) {
        case 1: alldata1.push(arr); break;
        case 2: alldata2.push(arr); break;
        case 3: alldata3.push(arr); break;
        case 4: alldata4.push(arr); break;
        case 5: alldata5.push(arr); break;
        case 6: alldata6.push(arr); break;
        default: break;
      };
      switch(parseInt(userdata[key].userDetails.dep2)) {
        case 2: alldata1.push(arr); break;
        case 3: alldata2.push(arr); break;
        case 4: alldata3.push(arr); break;
        case 5: alldata4.push(arr); break;
        case 6: alldata5.push(arr); break;
        case 7: alldata6.push(arr); break;
        default: break;
      };
    }

    // 3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "事务企划部",
      data: alldata1
    }, {
      name: "采编部",
      data: alldata2
    }, {
      name: "新媒体部",
      data: alldata3
    }, {
      name: "技术部",
      data: alldata4
    }, {
      name: "摄影部",
      data: alldata5
    }, {
      name: "素质拓展部",
      data: alldata6
    }], {'!cols': [
      {wch: 4},
      {wch: 10},
      {wch: 6},
      {wch: 12},
      {wch: 28},
      {wch: 28},
      {wch: 12},
      {wch: 12},
      {wch: 12},
      {wch: 12},
      {wch: 12},
      {wch: 12},
      {wch: 64},
      {wch: 64},
      {wch: 12},
      {wch: 20},
      {wch: 12},
      {wch: 20},
      {wch: 12},
      {wch: 20},
    ]}
    )

    let promise = await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

    // promise.then(function() {
    //   console.log('resolved.');
    // });

    // 4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: "userdata.xlsx",
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}