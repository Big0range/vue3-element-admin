<template>
  <div :style="{ height: height + 'px', zIndex: zIndex }" ref="el">
    <div
      :class="className"
      :style="{
        top: isSticky ? stickyTop + 'px' : '',
        zIndex: zIndex,
        position: position,
        width: width,
        height: height + 'px'
      }"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted, onActivated, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    interface Irefs {
      active: boolean
      position: string
      width: string | number | undefined
      height: string | number | undefined
      isSticky: boolean
    }
    const refs = toRefs(
      reactive<Irefs>({
        active: false,
        position: '',
        width: undefined,
        height: undefined,
        isSticky: false
      })
    )
    const sticky = () => {
      if (refs.active.value) {
        return
      }
      refs.position.value = 'fixed'
      refs.active.value = true
      refs.width.value = refs.width.value + 'px'
      refs.isSticky.value = true
    }

    const handleReset = () => {
      if (!refs.active.value) {
        return
      }
      reset()
    }

    const reset = () => {
      refs.position.value = ''
      refs.width.value = 'auto'
      refs.active.value = false
      refs.isSticky.value = false
    }

    const el = ref<HTMLElement>()
    const handleScroll = () => {
      const width = el.value?.getBoundingClientRect().width
      refs.width.value = width || 'auto'
      const offsetTop = el.value?.getBoundingClientRect().top || 0
      if (offsetTop < props.stickyTop) {
        sticky()
        return
      }
      handleReset()
    }

    const handleResize = () => {
      if (refs.isSticky.value) {
        refs.width.value = el.value?.getBoundingClientRect().width + 'px'
      }
    }

    onMounted(() => {
      refs.height.value = el.value?.getBoundingClientRect().height
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
    })

    onActivated(() => {
      handleScroll()
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    })
    return {
      ...refs,
      el
    }
  }
})
</script>

<style scoped lang="scss">
/*  */
</style>
