define({ "api": [
  {
    "type": "get",
    "url": "/index",
    "title": "约定字段",
    "version": "1.0.0",
    "name": "约定字段",
    "group": "index",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"getData\"",
              "\"fullScreen\"",
              "\"themeChange\""
            ],
            "optional": false,
            "field": "action",
            "description": "<p>代表某些行为；分别是获取图表数据、全屏事件、主题切换事件</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"trendData\"",
              "\"sellerData\"",
              "\"mapData\"",
              "\"rankData\"",
              "\"hotData\"",
              "\"stockData\"",
              "\"fullScreen\"",
              "\"themeChange\""
            ],
            "optional": false,
            "field": "socketType",
            "description": "<p>代表业务模块类型和前端响应函数的标识</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"trend\"",
              "\"seller\"",
              "\"map\"",
              "\"rank\"",
              "\"hotproduct\"",
              "\"stock\""
            ],
            "optional": false,
            "field": "charName",
            "description": "<p>图表的名称（如果是主题事件，可以不传递此值。因为主题切换事件是需要所有组件都要切换，而全屏和获取数据需要标识出是哪个图表）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"true\"",
              "\"false\"",
              "\"chalk\"",
              "\"vintage\""
            ],
            "optional": false,
            "field": "value",
            "description": "<p>代表具体的数据值。如果全屏事件，true 代表全屏 false 代表非全屏；如果是主题切换事件，可选值有 chalk 或者 vintage</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "allowedValues": [
              "\"getData\"",
              "\"fullScreen\"",
              "\"themeChange\""
            ],
            "optional": false,
            "field": "action",
            "description": "<ol> <li> <p>action == getData: 1.取出数据中的charName字段 2.拼接json文件的路径 3.读取该文件的内容 4.在接收到的数据基础之上，增加data字段；</p> </li> <li> <p>action != getData: 原封不动的将客户端接收到的数据，转发给每一个处于连接状态的客户端</p> </li> </ol>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Request:",
          "content": "{\n   \"action\": \"getData\",\n   \"socketType\": \"trendData\",\n   \"chartName\": \"trend\",\n   \"value\": \"\"\n}\n\n{\n   \"action\": \"fullScreen\",\n   \"socketType\": \"fullScreen\",\n   \"chartName\": \"trend\",\n   \"value\": true\n}\n\n{\n   \"action\": \"themeChange\",\n   \"socketType\": \"themeChange\",\n   \"chartName\": \"\",\n   \"value\": \"chalk\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "{\n   \"action\": \"getData\",\n   \"socketType\": \"trendData\",\n   \"charName\": \"trend\",\n   \"value\": \"\",\n   \"data\": \"从文件读取出来的json文件的内容\"\n}\n\n{\n   \"action\": \"fullScreen\",\n   \"socketType\": \"fullScreen\",\n   \"charName\": \"trend\",\n   \"value\": true\n}\n\n{\n   \"action\": \"themeChange\",\n   \"socketType\": \"themeChange\",\n   \"charName\": \"\",\n   \"value\": \"chalk\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/router/api.js",
    "groupTitle": "index"
  }
] });
