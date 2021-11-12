import { ref, readonly } from 'vue'
export default function (initValue) {
  const state = ref(initValue)
  const setSate = (newValue) => {
    state.value = newValue
  }
  return [readonly(state), setSate, state]
}
