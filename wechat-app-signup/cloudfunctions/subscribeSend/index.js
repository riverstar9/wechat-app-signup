// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "clouddata-odmpc"
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let userdataObj = await cloud.callFunction({
      name: "getAllUserInfo",
      data: {},
    })
    let userdata = userdataObj.result.data

    console.log(userdata)

    const sendPromises = userdata.map(async item => {
      try {
        console.log(item)

        let id ="";
        let status = "";
        let result = "";
        let resultText = "";

        switch (event.appStatus) {
          case 2:
            id = "R72BPq5w-C-4NVFWSm-3B-JkTI-a0HrqcwXYDbtCse0";
            status = "信息审核结果";
            result = item.userStatus.firstInterview;
            break;
          case 3:
            id = "R72BPq5w-C-4NVFWSm-3B2Y8XNxfXwOxcjFQAeh3It8";
            status = "第一次面试结果";
            result = item.userStatus.secondInterview;
            break;
          case 4:
            id = "R72BPq5w-C-4NVFWSm-3B2bLNvbmMVD3PgKXMZrRou8";
            status = "第二次面试结果";
            result = item.userStatus.result;
            break;
          default:
            break;
        }

        switch (result) {
          case 0:
            resultText = "轻按查看";
            break;
          case 1:
            resultText = "已通过";
            break;
          default:
            resultText = "问题出现";
            break;
        }

        console.log(status)
        console.log(resultText)

        return await cloud.openapi.subscribeMessage.send({
          // touser: cloud.getWXContext().OPENID, // 通过 getWXContext 获取 OPENID
          touser: item._openid,
          templateId: id,
          page: 'pages/welcome/welcome',
          data: {
            name10: {
              value: item.userDetails.username
            },
            thing9: {
              value: status,
            },
            phrase5: {
              value: resultText,
            },
            thing8: {
              value: '轻按打开小程序「报名流程页」查看审核结果'
            }
          },
          miniprogramState: 'formal'
        })
      } catch (e) {
        return e
      }
    })
    return Promise.all(sendPromises)
  } catch (err) {
    return err
  }
}