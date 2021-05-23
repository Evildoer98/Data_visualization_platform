### 总耗时中间件

1. 第一层中间件
2. 计算执行时间
    一进入时记录开始时间
    其他所有中间件执行完后记录结束时间
    两者相减
    
3. 设置响应头
    X-Response-Time：5ms

### 响应头中间件

1. 第2层中间件
2. 获取mime类型
    application/json
3. 设置响应头信息
    Content-Type:application/json; charset=UTF-8

### 业务逻辑中间件

1. 第三层中间件
2. 读取文件内容：http://127.0.0.1:8888/api/seller
    获取请求的路径，拼接文件路径
    获取该路径对应文件的内容
3. 设置响应体
    ctx.response.body

### 允许跨域
1. 实际是通过Ajax访问服务器
2. 同源策略
    同协议\同域名\同端口
    当前页面的地址和Ajax获取数据的地址