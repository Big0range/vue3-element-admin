<template>
  <div class="dashboard-container">
    <keep-alive>
      <component :is="currentRole" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { useGetters } from '@/hooks/index'
import adminDashboard from './admin/index.vue'
import editorDashboard from './editor/index.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    adminDashboard,
    editorDashboard
  },
  setup() {
    const currentRole = ref('adminDashboard')
    const { roles } = useGetters(['roles'])
    watchEffect(() => {
      if (roles.value.includes('admin')) {
        currentRole.value = 'adminDashboard'
      } else {
        currentRole.value = 'editorDashboard'
      }
    })
    return {
      currentRole
    }
  }
})
</script>

<style scoped lang="scss">
/*  */
</style>
