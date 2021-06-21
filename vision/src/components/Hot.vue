<template>
  <!-- 热销商品占比图表 -->
    <div class="com-container">
        <div class="com-chart" ref="hot_ref"></div>
        <span class="iconfont arr-left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
        <span class="iconfont arr-right" @click="toRight" :style="comStyle">&#xe6ed;</span>
        <span class="cat-name" :style="comStyle">{{catName}}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, // 当前所展示的一级数据
      titleFontSize: 0
    }
  },
  created () {
    // 在组件创建完成之后，进行回调函数的注册
    this.$socket.registerCallBack('hotData', this.getData)
  },
  mounted () {
    // 初始化图表
    this.initChart()
    // this.getData()
    // 向服务端发送需要获取的数据
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      charName: 'hotproduct',
      value: ''
    })
    // 监视窗口大小的变化，自适应窗口的大小
    window.addEventListener('resize', this.screenAdapter)
    // 开始时，自适应窗口大小
    this.screenAdapter()
  },
  destroyed () {
    // 移除窗口大小监听器
    window.removeEventListener('resize', this.screenAdapter)
    // 卸载注册的回调函数
    this.$socket.unRegisterCallBack('hotData')
  },
  computed: {
    catName () {
      if (!this.allData) {
        return ''
      } else {
        console.log(this.allData[this.currentIndex].name)
        return this.allData[this.currentIndex].name
      }
    },
    comStyle () {
      return {
        fontSize: this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor
      }
    },
    ...mapState(['theme'])
  },
  watch: {
    theme () {
      // console.log('主题切换了')
      // 销毁当前实例
      this.chartInstance.dispose()
      this.initChart()
      this.screenAdapter()
      this.updatedChart()
    }
  },
  methods: {
    initChart () {
      // 获取节点并设置主题样式
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, this.theme)
      const initOption = {
        // 标题组件（内容及位置）
        title: {
          text: '┃ 热销商品的占比',
          left: 20,
          top: 20
        },
        // 图例组件（位置及样式）
        legend: {
          top: '15%',
          icon: 'circle'
        },
        // 提示框组件（）
        tooltip: {
          show: true,
          formatter: arg => {
            const thirdCategory = arg.data.children
            // 计算出所有三级分类的数值综合
            let total = 0
            thirdCategory.forEach(item => {
              total += item.value
            })
            let retStr = ''
            thirdCategory.forEach(item => {
              retStr += `
                ${item.name} : ${parseInt(item.value / total * 100) + '%'}
                <br/>
              `
            })
            return retStr
          }
        },
        // 图表类型
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            // 扇区和标签样式
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    // async getData () {

    getData (ret) {
      // const { data: ret } = await this.$http.get('hotproduct')
      this.allData = ret
      // console.log(this.allData)
      this.updatedChart()
    },
    updatedChart () {
      const legendData = this.allData[this.currentIndex].children.map(item => {
        return item.name
      })
      const seriesData = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children
        }
      })
      const dataOption = {
        legend: {
          data: legendData
        },
        series: [
          {
            data: seriesData
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      this.titleFontSize = this.$refs.hot_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        series: {
          radius: this.titleFontSize * 4.5,
          center: ['50%', '60%']
        },
        legend: {
          itemWidth: this.titleFontSize,
          itemHight: this.titleFontSize,
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    // 向左切换
    toLeft () {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1
      }
      this.updatedChart()
    },
    // 向右切换
    toRight () {
      this.currentIndex++
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0
      }
      this.updatedChart()
    }
  }
}
</script>

<style lang='less' scoped>
.arr-left{
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.arr-right{
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}
.cat-name{
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>
