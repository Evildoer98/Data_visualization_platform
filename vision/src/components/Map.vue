<template>
  <!-- 商家分布图表 -->
    <div class="com-container" @dblclick="revertMap">
        <div class="com-chart" ref="map_ref">

        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      mapData: {} // 所获取的省份的地图矢量数据信息
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
    this.$socket.registerCallBack('mapData', this.getData)
  },
  mounted () {
    this.initChart()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'mapData',
      charName: 'map',
      value: ''
    })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('reszie', this.screenAdapter)
    this.$socket.unRegisterCallBack('mapData')
  },
  methods: {
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme)
      // 获取中国地图的矢量地图
      // http://localhost:8080/static/map/China.json
      // 由于我们现在获取的地图矢量数据并不是位于KOA2的后台
      const ret = await axios.get('http://localhost:8080/static/map/China.json')
      // console.log(ret)
      this.$echarts.registerMap('china', ret.data)
      const initOption = {
        title: {
          text: '┃ 商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click', async arg => {
        const provinceInfo = getProvinceMapInfo(arg.name)
        // 需要获取省份的地图矢量数据
        // 判断当前所点击的省份的地图矢量数据是否在mapData中
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get('http://localhost:8080' + provinceInfo.path)
          this.mapData[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    // async getData () {
    getData (ret) {
      // const { data: ret } = await this.$http.get('map')
      this.allData = ret
      this.updatedChart()
    },
    updatedChart () {
      // 图例的数据
      const legenArr = this.allData.map(item => {
        return item.name
      })

      // return这个对象就代表的是一个类别下的所有散点数据
      // 如果想在地图中显示数据，所以我们需要给散点的图标添加一个配置，coordinateSystem: geo
      const seriesArr = this.allData.map(item => {
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legenArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    // 回到中国地图
    revertMap () {
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.chartInstance.setOption(revertOption)
    }

  }
}
</script>
<style>

</style>
