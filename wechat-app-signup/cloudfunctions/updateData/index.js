const cloud = require('wx-server-sdk')

cloud.init({
  env: "clouddata-odmpc"
})

const db = cloud.database();
const _ = db.command;

var statusArray1 = ['暂定淘汰','待定','暂定通过'];
var statusArray2 = ['未开始','未通过','通过','通过','通过'];
var switchArray = ['未调剂','调剂至 事务企划部','调剂至 采编部','调剂至 新媒体部','调剂至 技术部','调剂至 摄影部','调剂至 素质拓展部'];


exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.code == "") {

  }

  else if (event.code == "signupInfo") {
    return await db.collection("userInfo").where({
      _openid: wxContext.OPENID,
    }).update({
      data: {
        userDetails: event.userDetails,
        userStatus: {
          editTimes: _.inc(1),
        },
      }
    })
  }

  else if (event.code == "signupFirst") {
    return await db.collection("userInfo").where({
      _openid: wxContext.OPENID,
    }).update({
      data: {
        userStatus: {
          firstInterview: 2,
          firstInterviewTime: event.firstInterviewTime,
        },
      }
    })
  }

  else if (event.code == "signupSecond") {
    return await db.collection("userInfo").where({
      _openid: wxContext.OPENID,
    }).update({
      data: {
        userStatus: {
          secondInterview: 2,
          secondInterviewTime: event.secondInterviewTime,
        },
      }
    })
  }

  else if (event.code == "star") {
    return await db.collection("userInfo").doc(event.userId).update({
      data: {
        userStatus: {
          star: event.star,
        },
      }
    })
  }

  else if (event.code == "evaluate") {
    return await db.collection("userInfo").doc(event.userId).update({
      data: {
        userEvaluate: _.addToSet({
          kind: "评价",
          nickName: event.nickName,
          avatarUrl: event.avatarUrl,
          time: event.time,
          status: event.status,
          stars: event.evaluateDetails.stars,
          evaluate: statusArray1[parseInt(event.evaluateDetails.evaluate)],
          notes: event.evaluateDetails.notes,
        }),
        userStatus: {
          evaluate: _.addToSet(event.nickName),
        } 
      }
    })
  }

  else if (event.code == "result1") {
    if (event.switch == 0) {
      return await db.collection("userInfo").doc(event.userId).update({
        data: {
          userEvaluate: _.addToSet({
            kind: "审核",
            nickName: event.nickName,
            avatarUrl: event.avatarUrl,
            time: event.time,
            status: event.status,
            stars: "-",
            evaluate: statusArray2[event.result + 1],
            notes: switchArray[event.switch],
          }),
          userStatus: {
            firstInterview: event.result,
            evaluate: _.addToSet(event.nickName),
          }
        }
      })
    } else {
      return await db.collection("userInfo").doc(event.userId).update({
        data: {
          userEvaluate: _.addToSet({
            kind: "审核",
            nickName: event.nickName,
            avatarUrl: event.avatarUrl,
            time: event.time,
            status: event.status,
            stars: "-",
            evaluate: statusArray2[event.result + 1],
            notes: switchArray[event.switch],
          }),
          userStatus: {
            firstInterview: event.result,
            switchTo: event.switch,
            evaluate: _.addToSet(event.nickName),
          },
          userDetails: {
            dep1: event.switch,
            dep2: 1,
          }
        }
      })
    }
  }

  else if (event.code == "result2") {
    if (event.switch == 0) {
      return await db.collection("userInfo").doc(event.userId).update({
        data: {
          userEvaluate: _.addToSet({
            kind: "审核",
            nickName: event.nickName,
            avatarUrl: event.avatarUrl,
            time: event.time,
            status: event.status,
            stars: "-",
            evaluate: statusArray2[event.result + 1],
            notes: switchArray[event.switch],
          }),
          userStatus: {
            secondInterview: event.result,
            evaluate: _.addToSet(event.nickName),
          }
        }
      })
    } else {
      return await db.collection("userInfo").doc(event.userId).update({
        data: {
          userEvaluate: _.addToSet({
            kind: "审核",
            nickName: event.nickName,
            avatarUrl: event.avatarUrl,
            time: event.time,
            status: event.status,
            stars: "-",
            evaluate: statusArray2[event.result + 1],
            notes: switchArray[event.switch],
          }),
          userStatus: {
            secondInterview: event.result,
            switchTo: event.switch,
            evaluate: _.addToSet(event.nickName),
          },
          userDetails: {
            dep1: event.switch,
            dep2: 1,
          }
        }
      })
    }
  }

  else if (event.code == "result3") {
    if (event.switch == 0) {
      return await db.collection("userInfo").doc(event.userId).update({
        data: {
          userEvaluate: _.addToSet({
            kind: "审核",
            nickName: event.nickName,
            avatarUrl: event.avatarUrl,
            time: event.time,
            status: event.status,
            stars: "-",
            evaluate: statusArray2[event.result + 1],
            notes: switchArray[event.switch],
          }),
          userStatus: {
            result: event.result,
            evaluate: _.addToSet(event.nickName),
          }
        }
      })
    } else {
      return await db.collection("userInfo").doc(event.userId).update({
        data: {
          userEvaluate: _.addToSet({
            kind: "审核",
            nickName: event.nickName,
            avatarUrl: event.avatarUrl,
            time: event.time,
            status: event.status,
            stars: "-",
            evaluate: statusArray2[event.result + 1],
            notes: switchArray[event.switch],
          }),
          userStatus: {
            result: event.result,
            switchTo: event.switch,
            evaluate: _.addToSet(event.nickName),
          },
          userDetails: {
            dep1: event.switch,
            dep2: 1,
          }
        }
      })
    }
  }
}