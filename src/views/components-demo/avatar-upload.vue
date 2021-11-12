<template>
  <div class="components-container">
    <pan-thumb :image="imageUrl" />
    <ImageCropper v-model="dialogVisible" @upload="upload" :loading="loading" />
    <el-button
      type="primary"
      icon="el-icon-upload"
      style="position: absolute; bottom: 15px; margin-left: 40px"
      @click="dialogVisible = true"
    >
      修改头像
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from 'vue'

import PanThumb from '@/components/PanThumb/index.vue'
import ImageCropper from '@/components/ImageCropper/index.vue'

export default defineComponent({
  components: {
    PanThumb,
    ImageCropper
  },
  setup() {
    const imageUrl = ref('https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191')
    // emit 父传子组件
    const upload = (data: any) => {
      console.log(data, '在此进行上传')
      loading.value = true
      setTimeout(() => {
        imageUrl.value = data.src
        // 关闭loading
        loading.value = false
        // 关闭裁剪组件
        dialogVisible.value = false
      }, 1000)
      // 需要自己new 一个formdata 进行上传
      /**
      const fmData = new FormData()
      fmData.append(
        fileName,
        blob
      )
       */
    }
    const dialogVisible = ref(false)
    const loading = ref(false)
    return {
      upload,
      dialogVisible,
      loading,
      imageUrl
    }
  }
})
</script>

<style scoped lang="scss">
.components-container {
  .cropper {
    width: auto;
    height: 300px;
  }
}
</style>
