<template>
  <div id="main" style="width: 800px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "flow",
  mounted() {
    this.drawCharts()
  },
  methods: {
    drawCharts() {
      let myChart = echarts.init(document.getElementById('main'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      myChart.setOption({
        title: {
          show: true,
          text: '数据流向',
          subtext: '从初始的评论数据集到最后我们合并冲突的数据集整体的数据信息变化过程与数量',
          // textAlign:'center',
        },
        legend: {
          data: ['数量']
        },
        tooltip: {},
        grid: {
          top: 100,
          left: 80
        },
        xAxis: {
          name: '阶段',
          data: ['初始products', '合并前电影', '合并后电影']
        },
        yAxis: {
          name: '数量',
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: 60,
            data: [253059, 203971, 146869]
          }
        ]
      })
    },
  }
}
</script>

<style scoped>
#main {
  margin-top: 20px;
  margin-left: 30px;
}
</style>
