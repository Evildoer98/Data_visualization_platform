// 服务器入口文件
// 创建koa实例对象
const Koa = require('koa')
const app = new Koa()
// 绑定中间件

// 绑定第一层中间件
// 计算服务器总耗时的中间件
const respDurationMiddleware = require('./middlerware/koa_respoense_duration')
app.use(respDurationMiddleware)

// 绑定第二层中间件
// 设置响应头的中间件
const respHeaderMiddleware = require('./middlerware/koa_respoense_header')
app.use(respHeaderMiddleware)

// 绑定第三层中间件
// 处理业务逻辑的中间件，读取某个json文件的数据
const respDataMiddleware = require('./middlerware/koa_respoense_data')
app.use(respDataMiddleware)
// 绑定端口号 8888
app.listen(8888)

const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听,监听客户端的连接
// 当某个客户端连接成功之后，就会对这个客户端进行message事件的监听
webSocketService.listen()