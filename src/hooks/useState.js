import { computed } from 'vue'
import { useStore, mapState } from 'vuex'

export default (mapper) => {
  const store = useStore()

  const storeStateFns = mapState(mapper)

  const storeState = {}

  for (const key in storeStateFns) {
    const fn = storeStateFns[key]
    storeState[key] = computed(fn.bind({ $store: store }))
  }

  return storeState
}
