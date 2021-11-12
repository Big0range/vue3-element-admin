<template>
  <el-dialog title="图片剪裁" v-model="visible" width="600px">
    <div class="wrap" v-loading="$props.loading">
      <div v-if="step === 1" class="select step">
        <div class="box">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <el-icon class="avatar-uploader-icon"><plus /></el-icon>
            <span class="desc">点击选择图片上传</span>
          </el-upload>
        </div>
        <div class="btns">
          <el-button type="danger" @click="cancel">取消</el-button>
        </div>
      </div>
      <div v-else-if="step === 2" class="step">
        <div class="box flex-sb">
          <div class="cropper" style="text-align: center">
            <vueCropper
              ref="cropper"
              :img="imageUrl"
              :outputSize="option.size"
              :outputType="outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"
              :autoCropWidth="width"
              :autoCropHeight="height"
              @realTime="realTime"
            ></vueCropper>
          </div>

          <div class="preview" v-if="outputImage">
            <div class="square">
              <img :src="outputImage" alt="方形预览" />
            </div>
            <div class="circle">
              <img :src="outputImage" alt="圆形预览" />
            </div>
            <div class="title">预览</div>
          </div>
        </div>
        <div class="btns">
          <el-button type="primary" @click="lastStep">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, computed } from 'vue'
import { ElMessage } from 'element-plus'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { debounce } from 'debounce'

export default defineComponent({
  components: {
    VueCropper
  },
  props: {
    // 显示该控件与否
    value: {
      type: Boolean,
      default: true
    },
    maxSize: {
      type: Number,
      default: 2048
    },
    // 生成截图框宽度
    width: {
      type: Number,
      default: 200
    },
    // 生成截图框高度
    height: {
      type: Number,
      default: 200
    },
    // 图片上传格式
    imgFormat: {
      type: String,
      default: 'png'
    },
    // loading
    loading: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'upload'],
  setup(props, context) {
    const cropper = ref<typeof VueCropper>()
    const option = reactive({
      info: true, // 裁剪框的大小信息
      outputSize: 0.8, // 裁剪生成图片的质量
      outputType: 'jpeg', // 裁剪生成图片的格式
      canScale: true, // 图片是否允许滚轮缩放
      autoCrop: true, // 是否默认生成截图框
      fixedBox: true, // 固定截图框大小 不允许改变
      fixed: true, // 是否开启截图框宽高固定比例
      fixedNumber: [1, 1], // 截图框的宽高比例
      full: true, // 是否输出原图比例的截图
      canMoveBox: true, // 截图框能否拖动
      original: false, // 上传图片按照原始比例渲染
      centerBox: true, // 截图框是否被限制在图片里面
      infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    })

    const save = () => {
      cropper.value?.getCropBlob((blob: any) => {
        context.emit('upload', {
          file: blob,
          src: outputImage.value
        })
      })
    }

    const visible = computed({
      set(val) {
        step.value = 1
        context.emit('update:modelValue', val)
      },
      get() {
        return props.value
      }
    })
    // 步骤顺序
    const step = ref<1 | 2>(1)
    // img url
    const imageUrl = ref('')
    const beforeAvatarUpload = (file: any) => {
      if (file.size / 1024 > props.maxSize) {
        ElMessage.warning('图片大小超出限制: ' + props.maxSize)
        return
      }
      const src = window.URL.createObjectURL(file)
      imageUrl.value = src
      nextStep()
      return false
    }
    // 上一步
    const lastStep = () => {
      step.value = 1
    }
    // 下一步
    const nextStep = () => {
      step.value = 2
    }
    // 退出
    const cancel = () => {
      context.emit('update:modelValue', false)
    }
    const realTime = debounce(
      () => {
        cropper.value?.getCropBlob((data: any) => {
          const src = window.URL.createObjectURL(data)
          outputImage.value = src
        })
      },
      200,
      false
    )
    // 导出类型
    const outputType = computed(() => props.imgFormat)
    // 导出图片的url
    const outputImage = ref('')
    // key 用来让预览图片刷新
    return {
      cropper,
      option,
      save,
      step,
      imageUrl,
      visible,
      beforeAvatarUpload,
      lastStep,
      nextStep,
      cancel,
      realTime,
      outputType,
      outputImage
    }
  }
})
</script>

<style scoped lang="scss">
.wrap {
  width: 550px;
  .step {
    .flex-sb {
      display: flex;
      justify-content: space-between;
      .preview {
        .title {
          font-size: 22px;
          padding-top: 20px;
          text-align: right;
          clear: both;
        }
        .square,
        .circle {
          padding: 2px;
          font-size: 0;
          float: left;
          border: 1px solid rgba(0, 0, 0, 0.15);
          img {
            width: 100px;
            height: 100px;
            border-radius: inherit;
          }
        }
        .square {
          margin-right: 16px;
        }
        .circle {
          border-radius: 50%;
        }
      }
    }
    .box {
      height: 240px;
      .avatar-uploader {
        border: 1px solid var(--el-border-color-base);
        border-radius: 4px;
        .desc {
          line-height: 60px;
          color: #8c939d !important;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 550px;
          height: 130px;
          text-align: center;
          svg {
            margin-top: 61px;
          }
        }
      }
    }
    .btns {
      display: flex;
      justify-content: right;
      padding-top: 10px;
    }
  }
  .cropper {
    width: 240px;
    height: 240px;
  }
}
</style>
