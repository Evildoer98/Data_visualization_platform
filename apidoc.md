# 开始
1. 搭建环境
    * npm install apidoc -g
2. 添加 apidoc.json 文件到项目工程的根目录
    ```javascript
        {
            "name": "example",
            "version": "1.0.0",
            "description": "apidoc basic example",
            "title": "api",
            "url": "https://localhost:3000"
        }
    ```
3. 在 router 文件下添加 api.js
    ```javascript
        /**
         * @api {get} /index 约定字段
         * @apiVersion 1.0.0
         * @apiName 约定字段
         * @apiGroup index
         *
         *
         * @apiParam {String = "getData", "fullScreen", "themeChange"} action  代表某些行为；分别是获取图表数据、全屏事件、主题切换事件
         * @apiParam {String = "trendData", "sellerData", "mapData", "rankData", "hotData", "stockData", "fullScreen", "themeChange"} socketType 代表业务模块类型和前端响应函数的标识
         * @apiParam {String = "trend", "seller", "map", "rank", "hotproduct", "stock"} charName 图表的名称（如果是主题事件，可以不传递此值。因为主题切换事件是需要所有组件都要切换，而全屏和获取* 数据需要标识出是哪个图表）
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

    ```
4. 在 package.json 中配置
    ```javascript
        "doc": "apidoc -i src/ -o apidoc/"
    ```
5. 控制台 npm run doc

# 配置api.js
1. @api 标签必填，只有使用 @api 标签的注释块才会被解析生成文档内容
    ```
    @api {method} path {title}
    ```
    | 参数名 | 描述 |
    |----|----|
    | method| 请求方法，如 POST、GET、PUT、DELETE 等|
    | path | 请求路径 |
    | title【选填】|简单的描述|

2. @apiDescription 对接口进行描述
    ```
    @apiDescription text
    ```

3. @apiGroup 表示分组名称，它会被解析成一级导航栏菜单
    ```
    @apiGroup name
    ```

4. @apiName 表示接口名称。注意的是，在同一个 @apiGroup 下，名称相同的 @api 通过 @apiVersion 区分，否则后面 @api 会覆盖前面定义的 @api
    ```
    @apiName name
    ```

5. @apiVersion 表示接口的版本，和 @apiName 一起使用
    ```
    @apiVersion version
    ```

6. @apiParam 定义 API 接口需要请求参数
    ```
    @apiParam [(group)] [{type}] [field=defaultValue] [description]
    ```
    | 参数名 | 描述 |
    |----|----|
    | (group)【选填】 | 参数进行分组 |
    | {type}【选填】 | 参数类型，包括{Boolean},{Number},{String},{Object},{String[]},{array of strings}... |
    | {type{size}}【选填】 | 可以声明参数范围，例如{string{...5}},{string{2..5}},{number{100-999}} |
    | {type=allowedValues}【选填】 | 可以声明参数允许的枚举值，例如{string="small","huge"},{number=1,2,3,99} |
    | field | 参数名称 |
    | [field] | 声明该参数可选 |
    | =defaultValue【选填】 | 声明该参数默认值 |
    | description【选填】 | 声明该参数描述 |

7. @apiHeader 定义 API 接口需要的请求头

8. @apiSuccess 定义 API 接口需要的响应成功

9. @apiError 定义 API 接口需要的响应错误

10. @apiPermission 定义 API 接口需要的权限点
    ```
        @apiPermission name
    ```