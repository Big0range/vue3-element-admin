<template>
  <div v-if="errorLogs.length > 0">
    <el-badge :is-dot="true" style="line-height: 25px; margin-top: -5px" @click="openDialog">
      <el-button style="padding: 8px 10px" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </el-button>
    </el-badge>

    <el-dialog v-model="dialogTableVisible" title="Tips" width="80%" append-to-body>
      <template #title>
        <div>
          <span style="padding-right: 10px">错误日志</span>
          <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">清空</el-button>
        </div>
      </template>

      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template v-slot="{ row }">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px">Info: </span>
              <el-tag type="warning">{{ row.info }} </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px">Url: </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template v-slot="scope">
            <div style="overflow: scroll">
              <pre>{{ scope.row.err.stack }}</pre>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useGetters } from '@/hooks'
export default defineComponent({
  setup() {
    const store = useStore()
    const dialogTableVisible = ref(false)
    const { errorLogs } = useGetters(['errorLogs'])
    const clearAll = () => {
      store.dispatch('errorLog/clearErrorLog')
      closeDialog()
    }
    const openDialog = () => {
      console.log('open')
      dialogTableVisible.value = true
    }

    const closeDialog = () => {
      dialogTableVisible.value = true
    }
    return {
      dialogTableVisible,
      errorLogs,
      clearAll,
      openDialog
    }
  }
})
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
