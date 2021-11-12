import { onMounted, onUnmounted } from 'vue'
export default function (fun) {
  let cb = null
  onMounted(() => {
    cb = fun()
  })
  onUnmounted(() => cb())
}
