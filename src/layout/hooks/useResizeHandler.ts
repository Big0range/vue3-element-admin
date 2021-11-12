import { watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

interface IProps {
  device: string
  sidebar: {
    opened: any
  }
}

export function useResizeHandler(props: IProps) {
  const store = useStore()
  const route = useRoute()
  watch(
    route,
    () => {
      if (props.device === 'mobile' && props.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    },
    { deep: true }
  )

  const isMobileFn = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = isMobileFn()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    }
  }
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    const isMobile = isMobileFn()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
