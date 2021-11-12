import { customRef } from 'vue'

export default function (value) {
  return customRef((track, trigger) => {
    return {
      get() {
        // 收集依赖
        track()
        return value
      },
      set(newVal) {
        value = newVal
        trigger()
      }
    }
  })
}
