<template>
  <div class="app-container">
    <div>
      <p>v-clipboard 复制文本</p>
      <el-input v-model="inputData" placeholder="Please input" style="width: 400px; max-width: 100%" />
      <el-button
        v-clipboard:copy="inputData"
        v-clipboard:success="clipboardSuccess"
        type="primary"
        icon="el-icon-document"
      >
        copy
      </el-button>
    </div>
    <div>
      <p>
        v-parseTime 时间格式化 详情参考
        <a href="https://dayjs.gitee.io/docs/zh-CN/display/format" style="color: #409eff">dayjs</a>
      </p>
      <el-button v-parseTime type="primary"> 2020-02-02 02:02:02 </el-button>
      <el-button v-parseTime="'YYYY年MM月DD日'" type="primary"> 2020-02-02 02:02:02 </el-button>
    </div>
    <div>
      <p>v-permission 权限控制</p>
      <el-button v-permission="['admin']" type="primary"> 只有admin可见 </el-button>
      <el-button v-permission="['editor']" type="primary"> 只有editor可见 </el-button>
      <el-button v-permission="['admin', 'editor']" type="primary"> admin和editor可见 </el-button>
    </div>
    <div>
      <p>v-waves 水波纹效果</p>
      <el-button v-waves type="primary"> 水波纹 </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const inputData = ref('https://gitee.com/li_mei_chao/vue3-element-admin')
    const clipboardSuccess = () => {
      ElMessage({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
    return {
      inputData,
      clipboardSuccess
    }
  }
})
</script>
