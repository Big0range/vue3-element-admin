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
            trigger: 'item',
            textStyle: {
              color: '#FFF'
            },
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
          },
          series: [
            {
              name: 'WEEKLY WRITE ARTICLES',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: [
                { value: 320, name: 'Industries' },
                { value: 240, name: 'Technology' },
                { value: 149, name: 'Forex' },
                { value: 100, name: 'Gold' },
                { value: 59, name: 'Forecasts' }
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 2600
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
