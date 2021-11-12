<template>
  <div>
    <div style="margin-bottom: 15px">Your roles: {{ roles }}</div>
    Switch roles:
    <br />
    <br />
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useGetters } from '@/hooks'
export default defineComponent({
  emits: ['change'],
  setup(props, context) {
    const store = useStore()
    const { roles } = useGetters(['roles'])
    const switchRoles = computed({
      get() {
        return roles.value[0]
      },
      set(val) {
        store.dispatch('user/changeRoles', val).then(() => {
          context.emit('change')
        })
      }
    })
    return {
      roles,
      switchRoles
    }
  }
})
</script>
