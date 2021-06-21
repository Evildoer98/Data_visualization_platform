/**
 * @api {get} /index 约定字段
 * @apiVersion 1.0.0
 * @apiName 约定字段
 * @apiGroup index
 *
 *
 * @apiParam {String = "getData", "fullScreen", "themeChange"} action  代表某些行为；分别是获取图表数据、全屏事件、主题切换事件
 * @apiParam {String = "trendData", "sellerData", "mapData", "rankData", "hotData", "stockData", "fullScreen", "themeChange"} socketType 代表业务模块类型和前端响应函数的标识
 * @apiParam {String = "trend", "seller", "map", "rank", "hotproduct", "stock"} charName 图表的名称（如果是主题事件，可以不传递此值。因为主题切换事件是需要所有组件都要切换，而全屏和获取数据需要标识出是哪个图表）
 * @apiParam {String = "true", "false", "chalk", "vintage"} value 代表具体的数据值。如果全屏事件，true 代表全屏 false 代表非全屏；如果是主题切换事件，可选值有 chalk 或者 vintage
 *
 * @apiSuccess {String = "getData", "fullScreen", "themeChange"} action
 * 1. action == getData:
 * 1.取出数据中的charName字段
 * 2.拼接json文件的路径
 * 3.读取该文件的内容
 * 4.在接收到的数据基础之上，增加data字段；
 *
 * 2. action != getData:
 * 原封不动的将客户端接收到的数据，转发给每一个处于连接状态的客户端
 *
 * @apiSuccessExample Success-Request:
 * {
 *    "action": "getData",
 *    "socketType": "trendData",
 *    "chartName": "trend",
 *    "value": ""
 * }
 *
 * {
 *    "action": "fullScreen",
 *    "socketType": "fullScreen",
 *    "chartName": "trend",
 *    "value": true
 * }
 *
 * {
 *    "action": "themeChange",
 *    "socketType": "themeChange",
 *    "chartName": "",
 *    "value": "chalk"
 * }
 *
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "action": "getData",
 *    "socketType": "trendData",
 *    "charName": "trend",
 *    "value": "",
 *    "data": "从文件读取出来的json文件的内容"
 * }
 *
 * {
 *    "action": "fullScreen",
 *    "socketType": "fullScreen",
 *    "charName": "trend",
 *    "value": true
 * }
 *
 * {
 *    "action": "themeChange",
 *    "socketType": "themeChange",
 *    "charName": "",
 *    "value": "chalk"
 * }
 *
 */
