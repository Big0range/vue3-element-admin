import { computed } from 'vue'
import { useStore, mapGetters } from 'vuex'

export default (mapper: string[]) => {
  const store = useStore()

  const storeGettersFns = mapGetters(mapper)

  const storeState: any = {}

  for (const key in storeGettersFns) {
    const fn = storeGettersFns[key]
    storeState[key] = computed(fn.bind({ $store: store }))
  }

  return storeState
}
