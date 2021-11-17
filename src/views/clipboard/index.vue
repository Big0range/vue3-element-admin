<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width: 400px; max-width: 100%" />
        <el-button
          v-clipboard:copy="inputData"
          v-clipboard:success="clipboardSuccess"
          type="primary"
          icon="el-icon-document"
        >
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const activeName = ref('v-directive')
    const inputData = ref('https://gitee.com/li_mei_chao/vue3-element-admin')
    const clipboardSuccess = () => {
      ElMessage({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
    return {
      activeName,
      inputData,
      clipboardSuccess
    }
  }
})
</script>
