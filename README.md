## Introduce

适用于大学校级组织大规模招新，以NJTECH校青年传媒中心为蓝本，完全基于微信小程序原生云开发能力开发的小程序

### 功能介绍

1. 完全由微信小程序实现的报名+审核系统，即开即用，无需安装app
2. 新颖的界面设计，拥有独特的排版方式和简洁明了的设计语言
3. 完整的用户端报名流程，包括报名流程引导、信息填写、生成面试二维码、结果查询、面试时间预约、结果通知等内容
4. 完整的管理员端操作，包括可筛选的信息列表、扫码查询、excel导出等内容
5. 拥有丰富的动画效果和优雅的跳转方式

### 问题分析

它能够帮助解决大学校级组织招新时遇到的如下问题：

1. 线上招新表和纸质招新表并行，整理难度高，耗费时间多
2. 线上招新表样式自由度低，且无法附带大量的组织宣传信息
3. 面试时无法快速查询面试者信息，也无法快速进行简单记录
4. 不能快速地进行面试结果的通知，发送短信效率低费用高，还可能出现无法送达的情况
5. 使用其他方式开发成本较高，维护困难

### 结构图

<img src="design/stu3.jpg/" alt="结构图1" style="zoom: 33%;" />

<img src="design/stu2.jpg/" alt="结构图2" style="zoom:33%;" />

<img src="design/stu1.jpg/" alt="结构图3" style="zoom:33%;" />

## Usage

### 数据库

#### userInfo

该集合存储了所有的用户信息，单条记录如下方所示

```json
{
    "_id":"",
    "_openid":"",
    "userInfo":{
        "avatarUrl":"",
        "city":"",
        "country":"",
        "gender":0,
        "language":"zh_CN",
        "nickName":"",
        "province":""
    },
    "userDetails":{
        "academy":"","birth":"","dep1":"","dep2":"","dorm":"","hobby":"","introduce":"","phone":"","region":["xx省","xx市","xx区"],"sex":0,"sns":"","subject":"","username":""
    },
    "userStatus":{
        "isAdmin":-1,
        "editTimes":0.0,
        "switchTo":-1,
        "firstInterview":0.0,
        "firstInterviewTime":99,
        "secondInterview":-1,
        "secondInterviewTime":99,
        "result":-1,
        "evaluate":[]
    }
}
```

* **userInfo**：通过wx.getUserInfo获得的用户信息，包括微信昵称、微信头像等
* **userDetails**：用户通过填写报名信息上传的数据，详见signup-info页；其中subject指专业和班级
* **userStatus**：用于判断用户状态
    * ***isAdmin***：默认为-1，只有值为1可开启管理员权限
    * ***editTimes***：默认为-1，已填写报名信息为0，修改一次信息后为1
    * ***firstInterview/secondInterview***：信息审核结果/第一次面试结果，默认为-1，未通过该阶段为0，通过该阶段为1，已预约面试时间为2
    * ***result***：第二次面试结果，默认为-1，未通过该阶段为0，通过该阶段为1
    * ***firstInterviewTime/secondInterviewTime***：第一次/第二次面试时间，默认为99，对应cloudStatus中的timeArray
    * ***switchTo***：调剂信息，默认为-1，对应部门数组
    * ***evaluate***：记录所有评价人员的微信昵称

#### cloudStatus

该集合存储了小程序需要使用的所有云端数据，这些数据被修改后可以立即在小程序中更新

只有一条记录，如下方所示

```json
{
    "_id":"",
    "timeArray1":["3月32日 12:30-14:30","","",""],
    "timeArray2":["4月32日 12:30-14:30","","",""],
    "appStatus":1.0,
    "group":["xx部QQ群:xxx","","","","",""],
    "sns":"337845818"
}

```

* **timeArray1**：用于预约第一次面试时间的选择，默认支持四个时间段
* **timeArray2**：用于预约第二次面试时间的选择，默认支持四个时间段
* **appStatus**：整个小程序现在处于的时间段，只允许1-4的整数值，详见结构图中的面试流程图
* **group**：用于第二次面试结果查询中，若面试成功，显示的相应部门联系方式，默认支持六个部门
* **sns**：用于联系管理员页，轻按按钮复制的管理员联系方式

#### peing

该集合存储了匿名提问箱中的所有数据，单条记录如下方所示

```json
{
    "_id":"",
    "_openid":"",
    "answer":"",
    "number":0.0,
    "question":""
}
```

* **answer**：问题的回答
* **number**：问题的状态，1为在小程序中展示，0则相反，请确认回答完毕后再修改此值
* **question**：来自匿名提问箱的问题

### 云函数

#### exportExcel 和 importExcel

用于导出用户数据为Excel，和处理上传的审核表格

需要安装**node-xlsx**类库：

```
npm install node-xlsx
```

### 云存储

云存储用来存储导出的用户数据和备份上传的审核表格

#### Excel下载

* 每次导出的Excel都会存储至 `/userdata.xlsx`
* 并会被备份至`/userdata/userdata202001010930.xlsx`，其中的时间为文件的生成时间

#### Excel上传

* 每次上传的Excel都会被备份到`/userdata/upload/202001010930User.xlsx`，其中的时间为文件的上传时间，User为上传用户的微信昵称

## Preview

*部分细节可能与最新版本不同*

#### 欢迎页与主页

<img src="design/preview1.png/" alt="预览图-欢迎页与主页" style="zoom:33%;" />

#### 报名流程

<img src="design/preview2.png/" alt="预览图-报名流程" style="zoom:33%;" />

#### 报名信息填写

<img src="design/preview3.png/" alt="预览图-报名信息填写" style="zoom:33%;" />

#### 审核结果

![预览图-审核结果](design/preview4.png/)

#### 个人信息

![预览图-个人信息](design/preview5.png/)

#### 管理员页

![预览图-管理员页](design/preview6.png/)

#### 管理员列表

<img src="design/preview7.png/" alt="预览图-管理员列表" style="zoom:33%;" />

## Todo

- [ ] 重新设计判断用户状态的方式，以数组方式存储
- [ ] 可视化回复匿名提问箱
- [ ] 增加切换主题功能

## Tips

* 使用了Lin UI实现部分组件功能，包括对话框、加载提示、索引列表等
* 第一次自行完成一个完整的项目，也是第一次写小程序，十分稚嫩，诸多问题还请多多包涵