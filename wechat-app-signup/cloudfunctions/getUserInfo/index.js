const cloud = require('wx-server-sdk')

cloud.init({
  env: "clouddata-odmpc"
})

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await db.collection("userInfo").where({
    _openid: wxContext.OPENID,
  }).get()
}