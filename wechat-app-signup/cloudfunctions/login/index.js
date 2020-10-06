const cloud = require('wx-server-sdk')

cloud.init({
  env: "clouddata-odmpc"
})

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var searchForUser = db.collection("userInfo").where({
    _openid: wxContext.OPENID,
  })

  await searchForUser.get().then(res => {
    console.log(res)
    if (res.data.length == 0) {
      db.collection('userInfo').add({
        data: {
          _openid: wxContext.OPENID,
          userInfo: event.userInfo,
          userDetails: {},
          userStatus: {
            isAdmin: -1,
            editTimes: -1,
            switchTo: -1,
            firstInterview: -1,
            firstInterviewTime: 9,
            secondInterview: -1,
            secondInterviewTime: 9,
            result: -1,
            evaluate: [],
          }
        }
      })
    }
  }).catch( res=>{
    console.log("fail");
  })

  return await db.collection("userInfo").where({
    _openid: wxContext.OPENID,
  }).get()
}

