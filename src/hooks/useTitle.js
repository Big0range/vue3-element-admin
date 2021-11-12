import { ref, readonly } from 'vue'
export default function (initValue) {
  // return ref(initValue)
  const title = ref(initValue)
  document.title = title.value
  const setTitle = (value) => {
    title.value = value
    document.title = value
  }
  return [readonly(title), setTitle]
}
