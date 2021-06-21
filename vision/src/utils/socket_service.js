export default class SocketService {
  /**
   * 单例设计模式
   */
  static instance = null
  static get Instance () {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  // 和服务端连接的socket对象
  ws = null
  // 存储回调函数
  callBackMapping = {}
  // 是否已经连接成功
  connected = false
  // 记录重试的次数
  sendRetryCount = 0
  // 重新连接服务器的次数
  connectRetryCount = 0
  // 定义连接服务器的方法
  connect () {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9999')

    // 连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务端成功了')
      this.connected = true
      // 重置重新连接的次数
      this.connectRetryCount = 0
    }
    // 1.连接服务器失败
    // 2.当连接成功之后，服务器关闭的情况
    this.ws.onclose = () => {
      console.log('连接服务端失败')
      this.connected = false
      this.connectRetryCount++
      setTimeout(() => {
        this.connect()
      }, 500 * this.connectRetryCount)
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      // console.log(msg)
      // console.log('从服务端获取到了数据')
      // 真正服务端发送过来的原始数据在msg中的data字段
      // console.log(msg.data)
      // const recvData = JSON.stringify(msg.data)
      const recvData = JSON.parse(msg.data)
      // console.log(recvData)
      const socketType = recvData.socketType
      // console.log(socketType) // trendData、sellerData、mapData、rankData、hotData、stockData
      // 判断回调函数是否存在
      // console.log(this.callBackMapping) // 各个客户端的回调函数
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        // console.log('123')
        if (recvData.action === 'getData') {
          const realData = recvData.data // 得到该图表的数据
          // console.log(realData)
          // console.log(this.callBackMapping[socketType])
          this.callBackMapping[socketType].call(this, JSON.parse(realData))
        } else if (action === 'fullScreen') {
          this.callBackMapping[socketType].call(this, recvData)
        } else if (action === 'themeChange') {
          this.callBackMapping[socketType].call(this, recvData)
        }
      }
    }
  }

  registerCallBack (socketType, callBack) {
    // 往 callBackMap中存放回调函数
    this.callBackMapping[socketType] = callBack
  }

  unRegisterCallBack (socketType) {
    this.callBackMapping[socketType] = null
  }

  // 发送数据的方法
  send (data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {
      // console.log('发送数据给服务端')
      this.ws.send(JSON.stringify(data))
    } else {
      setTimeout(() => {
        this.sendRetryCount++
        this.send(data)
        // 发送数据尝试的次数越大, 则下一次连接的延迟也就越长
      }, 200 * this.sendRetryCount)
    }
  }
}
