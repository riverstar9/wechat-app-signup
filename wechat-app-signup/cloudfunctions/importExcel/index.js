// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "clouddata-odmpc"
})

var xlsx = require('node-xlsx');
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let {fileID} = event;

  const res = await cloud.downloadFile({
    fileID: fileID,
  });
  const buffer = res.fileContent;

  const tasks = []; //用来存储所有的添加数据操作

  //解析excel文件里的数据
  var sheets = xlsx.parse(buffer); //获取到所有sheets
  sheets.forEach(function(sheet) {
    console.log(sheet['name']);
    for (var rowId in sheet['data']) {
      console.log(rowId);
      var row = sheet['data'][rowId]; //第几行数据
      if (rowId > 1 && row) { //前几行是表格标题，所有我们要从第3行开始读
        let firstInterview;
        let secondInterview;
        let result;
        let switchTo;
        let dep1;
        let dep2;

        if (row[2] == "未通过审核") {
          firstInterview = 0;
        }
        else if (row[2] == "通过审核") {
          firstInterview = 1;
        }

        if (row[3] == "未通过审核") {
          secondInterview = 0;
        }
        else if (row[3] == "通过审核") {
          secondInterview = 1;
        }

        if (row[4] == "未通过审核") {
          result = 0;
        }
        else if (row[4] == "通过审核") {
          firstInterview = 1;
        }

        if (row[5] == "被调剂至事务企划部") {
          switchTo = 0;
          dep1 = 1;
          dep2 = 1;
        }
        else if (row[5] == "被调剂至采编部") {
          switchTo = 1;
          dep1 = 2;
          dep2 = 1;
        }
        else if (row[5] == "被调剂至新媒体部") {
          switchTo = 2;
          dep1 = 3;
          dep2 = 1;
        }
        else if (row[5] == "被调剂至技术部") {
          switchTo = 3;
          dep1 = 4;
          dep2 = 1;
        }
        else if (row[5] == "被调剂至摄影部") {
          switchTo = 4;
          dep1 = 5;
          dep2 = 1;
        }
        else if (row[5] == "被调剂至素质拓展部") {
          switchTo = 5;
          dep1 = 6;
          dep2 = 1;
        }

        //把解析到的数据存到excelList数据表里
        const promise = db.collection('userInfo').doc(row[0]).update({
          data: {
            userStatus: {
              firstInterview: firstInterview,
              secondInterview: secondInterview,
              result: result,
              switchTo: switchTo,
            },
            userDetails: {
              de1: dep1,
              dep2: dep2,
            }
          }
        })
        tasks.push(promise)
      }
    }
  });

  // 等待所有数据添加完成
  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return result
}