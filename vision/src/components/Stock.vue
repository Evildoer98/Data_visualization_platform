<template>
  <!-- 库存与销量模块（多个圆环饼图） -->
    <div class="com-container">
        <div class="com-chart" ref="stock_ref">

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, // 当前显示的数据
      timeId: null, // 定时器的标识
      titleFontSize: 0
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme () {
      this.chartInstance.dispose()
      this.initChart()
      this.screenAdapter()
      this.updatedChart()
    }
  },
  created () {
    // 在组件创建完成之后，进行回调函数的注册
    this.$socket.registerCallBack('stockData', this.getData)
  },
  mounted () {
    this.initChart()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'stockData',
      charName: 'stock',
      value: ''
    })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timeId)
    this.$socket.unRegisterCallBack('stockData')
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref, this.theme)
      // 5个圆环对应的圆心点
      const centerPointers = [
        ['18%', '40%'],
        ['50%', '40%'],
        ['82%', '40%'],
        ['34%', '75%'],
        ['66%', '75%']
      ]
      const initOption = {
        title: {
          text: '┃ 库存销售量',
          left: 20,
          top: 20
        },
        series: [
          {
            type: 'pie',
            center: centerPointers[0],
            hoverAnimation: false,
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          }, {
            type: 'pie',
            center: centerPointers[1],
            hoverAnimation: false,
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          },
          {
            type: 'pie',
            center: centerPointers[2],
            hoverAnimation: false,
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          },
          {
            type: 'pie',
            center: centerPointers[3],
            hoverAnimation: false,
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          },
          {
            type: 'pie',
            center: centerPointers[4],
            hoverAnimation: false,
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // async getData () {
    getData (ret) {
      // const { data: ret } = await this.$http.get('stock')
      this.allData = ret
      this.updatedChart()
      this.startInterval()
    },
    updatedChart () {
      // 处理图表需要的数据

      // 增加5个圆环的渐变颜色范围
      const colorArrs = [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]
      const start = this.currentIndex * 5
      const end = (this.currentIndex + 1) * 5
      const showData = this.allData.slice(start, end)
      const seriesArr = showData.map((item, index) => {
        return {
          label: {
            color: colorArrs[index][0]
          },
          data: [
            {
              name: item.name + '\n\n' + item.sales,
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0,
                  [
                    {
                      offset: 0,
                      color: colorArrs[index][0]
                    },
                    {
                      offset: 1,
                      color: colorArrs[index][1]
                    }
                  ])
              }
            },
            {
              value: item.stock,
              itemStyle: {
                color: '#333843'
              }
            }
          ]
        }
      })
      const dataOption = {
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      this.titleFontSize = this.$refs.stock_ref.offsetWidth / 100 * 3.6
      const innerRadius = this.titleFontSize * 2.8
      const outterRadius = innerRadius * 1.125
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        series: [
          {
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: this.titleFontSize / 2
            }
          },
          {
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: this.titleFontSize / 2
            }
          },
          {
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: this.titleFontSize / 2
            }
          },
          {

            radius: [outterRadius, innerRadius],
            label: {
              fontSize: this.titleFontSize / 2
            }
          },
          {

            radius: [outterRadius, innerRadius],
            label: {
              fontSize: this.titleFontSize / 2
            }
          }
        ]

      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval () {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.currentIndex++
        if (this.currentIndex > 1) {
          this.currentIndex = 0
        }
        this.updatedChart() // 在更改完currentIndex之后，需要跟新界面
      }, 5000)
    }
  }
}
</script>
