<template>
  <div :class="className" ref="el" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { defineComponent, markRaw, ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import resize from './hooks/useResize'
require('echarts/theme/macarons')

const animationDuration = 2000

export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  setup() {
    const chart = ref<echarts.ECharts | null>(null)
    const resizeHooks = resize({ chart: chart })
    const el = ref<HTMLElement>()
    const initChart = () => {
      if (el.value) {
        chart.value = markRaw(echarts.init(el.value, 'macarons'))
        chart.value.setOption({
          tooltip: {
            trigger: 'axis',
            textStyle: {
              // 提示框浮层的文本样式。
              color: '#fff'
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false
              }
            }
          ],
          series: [
            {
              name: 'pageA',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [79, 52, 200, 334, 390, 330, 220],
              animationDuration
            },
            {
              name: 'pageB',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [80, 52, 200, 334, 390, 330, 220],
              animationDuration
            },
            {
              name: 'pageC',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [30, 52, 200, 334, 390, 330, 220],
              animationDuration
            }
          ]
        })
      }
    }
    onMounted(() => {
      nextTick(() => {
        initChart()
      })
    })
    onBeforeUnmount(() => {
      if (chart.value) {
        chart.value.dispose()
        chart.value = null
      }
    })
    return { chart, el, ...resizeHooks }
  }
})
</script>

<style scoped lang="scss">
/*  */
</style>
