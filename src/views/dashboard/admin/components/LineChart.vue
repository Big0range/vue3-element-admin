<template>
  <div :class="className" ref="el" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { defineComponent, markRaw, ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import resize from './hooks/useResize'
require('echarts/theme/macarons')

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const chart = ref<echarts.ECharts | null>(null)
    const resizeHooks = resize({ chart: chart })
    const el = ref<HTMLElement>()
    const initChart = () => {
      if (el.value) {
        chart.value = markRaw(echarts.init(el.value, 'macarons'))
        setOptions(props.chartData)
      }
    }
    const setOptions = (data: any = {}) => {
      const { expectedData, actualData } = data
      chart.value?.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          textStyle: {
            // 提示框浮层的文本样式。
            color: '#fff'
          },
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [
          {
            name: 'expected',
            lineStyle: {
              color: '#FF005A',
              width: 2
            },
            itemStyle: {
              color: '#FF005A'
            },
            smooth: true,
            type: 'line',
            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'actual',
            smooth: true,
            type: 'line',
            lineStyle: {
              color: '#3888fa',
              width: 2
            },
            itemStyle: {
              color: '#3888fa'
            },
            areaStyle: {
              color: '#f3f8ff'
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
    watch(
      props.chartData,
      (newValue: any) => {
        setOptions(newValue)
      },
      { deep: true }
    )
    onMounted(() => {
      nextTick(() => {
        initChart()
      })
    })
    onBeforeUnmount(() => {
      if (!chart.value) {
        return
      }
      chart.value.dispose()
      chart.value = null
    })
    return { el, chart, ...resizeHooks }
  }
})
</script>

<style scoped lang="scss">
/*  */
</style>
