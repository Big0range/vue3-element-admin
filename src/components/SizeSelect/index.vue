<template>
  <div>
    <el-dropdown trigger="click" @command="handleSetSize">
      <div>
        <svg-icon class-name="size-icon" icon-class="size" />
      </div>
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :disabled="size === item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElMessage } from 'element-plus'

import { useStore } from '@/store'
import { useGetters } from '@/hooks'

export default defineComponent({
  setup() {
    const sizeOptions = reactive([
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' }
    ])
    const { size } = useGetters(['size'])
    const store = useStore()
    const handleSetSize = (size: string) => {
      store.dispatch('app/setSize', size)
      refreshView()
      ElMessage({
        message: 'Switch Size Success',
        type: 'success'
      })
    }
    const refreshView = () => {
      // 源代码是这样写的 this.$store.dispatch('tagsView/delAllCachedViews', this.$route)
      // 但是没有看到route传过去有任何作用
      store.dispatch('tagsView/delAllCachedViews')
    }
    return { sizeOptions, size, handleSetSize, refreshView }
  }
})
</script>

<style scoped lang="scss">
:deep(.el-dropdown) {
  font-size: inherit;
}
</style>
