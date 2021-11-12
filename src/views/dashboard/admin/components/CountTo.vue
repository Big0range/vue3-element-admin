<template>
  <span> {{ count.number.toFixed(0) }} </span>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import gsap from 'gsap'
export default defineComponent({
  props: {
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      default: 100
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  setup(props: { start: number; end: number; duration: number }) {
    const count = reactive({ number: props.start })
    gsap.to(count, { duration: props.duration / 1000, number: props.end })
    return {
      count
    }
  }
})
</script>
