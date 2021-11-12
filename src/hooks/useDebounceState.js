import { customRef, readonly } from 'vue'

export default function (initValue, delay = 1000) {
  const state = debounce(initValue, delay)
  const setSate = (newValue) => {
    state.value = newValue
  }
  return [readonly(state), setSate, state]
}

function debounce(value, delay) {
  let timer = null
  return customRef((track, trigger) => {
    return {
      get() {
        // 收集依赖
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          // 更新依赖
          trigger()
        }, delay)
      }
    }
  })
}
