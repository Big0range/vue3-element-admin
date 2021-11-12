<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      上传
    </el-button>
    <el-dialog v-model="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button size="small" type="primary"> 点击上传 </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false"> 取消 </el-button>
      <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  emits: ['successCBK'],
  setup(props, context) {
    const dialogVisible = ref(false)
    let listObj: { [key: string]: any } = {}
    const fileList = reactive<any[]>([])

    const checkAllSuccess = () => {
      return Object.keys(listObj).every((item) => listObj[item].hasSuccess)
    }

    const handleSubmit = () => {
      const arr = Object.keys(listObj).map((v) => listObj[v])
      if (!checkAllSuccess()) {
        ElMessage(
          'Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!'
        )
        return
      }
      context.emit('successCBK', arr)
      listObj = {}
      fileList.splice(0)
      dialogVisible.value = false
    }

    const handleSuccess = (response: any, file: any) => {
      const uid = file.uid
      const objKeyArr = Object.keys(listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (listObj[objKeyArr[i]].uid === uid) {
          listObj[objKeyArr[i]].url = response.files.file
          listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    }

    const handleRemove = (file: any) => {
      const uid = file.uid
      const objKeyArr = Object.keys(listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (listObj[objKeyArr[i]].uid === uid) {
          delete listObj[objKeyArr[i]]
          return
        }
      }
    }

    const beforeUpload = function (file: any) {
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
    return {
      dialogVisible,
      listObj,
      fileList,
      handleRemove,
      handleSuccess,
      beforeUpload,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  :deepp .el-upload--picture-card {
    width: 100%;
  }
}
</style>
