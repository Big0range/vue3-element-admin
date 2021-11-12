import { ref, onMounted, onBeforeMount, onActivated, onDeactivated } from 'vue'
import { debounce } from 'debounce'

export default function (props: { chart: any }) {
  const sidebarElm: any = ref(null)
  const resizeHandler: any = ref(null)
  const initResizeEvent = () => {
    if (typeof resizeHandler.value === 'function') {
      window.addEventListener('resize', resizeHandler.value)
    }
  }
  const destroyResizeEvent = () => {
    window.removeEventListener('resize', resizeHandler.value)
  }
  const sidebarResizeHandler = (e: any) => {
    if (e.propertyName === 'width') {
      resizeHandler.value()
    }
  }
  const initSidebarResizeEvent = () => {
    sidebarElm.value = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.value && sidebarElm.value.addEventListener('transitionend', sidebarResizeHandler)
  }
  const destroySidebarResizeEvent = () => {
    sidebarElm.value && sidebarElm.value.removeEventListener('transitionend', sidebarResizeHandler)
  }
  onMounted(() => {
    resizeHandler.value = debounce(() => {
      if (props.chart.value) {
        props.chart.value.resize()
      }
    }, 100)
    initResizeEvent()
    initSidebarResizeEvent()
  })
  onBeforeMount(() => {
    destroyResizeEvent()
    destroySidebarResizeEvent()
  })
  onActivated(() => {
    initResizeEvent()
    initSidebarResizeEvent()
  })
  onDeactivated(() => {
    destroyResizeEvent()
    destroySidebarResizeEvent()
  })
  return {
    sidebarElm,
    resizeHandler,
    initResizeEvent,
    destroyResizeEvent,
    sidebarResizeHandler,
    initSidebarResizeEvent,
    destroySidebarResizeEvent
  }
}
