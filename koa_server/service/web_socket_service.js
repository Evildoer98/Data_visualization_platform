const path = require('path')
const fileUtils = require('../utils/file_utils')
const WebSocket = require('ws')
// 创建websocket服务端对象，绑定的端口号是9999
const wss = new WebSocket.Server({
    port: 9999
})
// 服务端开启了监听
module.exports.listen = () => {
    // 对客户端的连接事件进行监听
    // client：代表客户端的连接socke对象
    wss.on('connection', client => {
    console.log('有客户端连接成功了...');

    // 对客户端的连接对象进行message事件的监听
    // msg：由客户端发给服务器的数据
    client.on('message', async msg => {
        console.log('客户端发送数据给服务器了: ' + msg);
        let payload = JSON.parse(msg)
        const action = payload.action
        if (action === 'getData') {
            let filePath = '../data/' + payload.charName + '.json'
            // payload.charName // trend seller map rank hot stock
            filePath = path.join(__dirname, filePath)
            const ret = await fileUtils.getFileJsonData(filePath)
            // 需要在服务端获取到的数据的基础之上，增加一个data 的字段
            // data所对应的值，就是某个json文件的内容
            payload.data = ret
            client.send(JSON.stringify(payload))

        }else{
            // 原封不动的将所接受到的数据转发给每一个处于连接状态的客户端
            // wss.clients // 所有客户端的连接
            wss.clients.forEach(client => {
                client.send(msg)
                console.log('所有数据都来啦');
            })
        }
        // 由服务端往客户端发送数据
        // client.send('hello 我是后端来的')
    })
})

}
