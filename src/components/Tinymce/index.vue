<template>
  <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  nextTick,
  onMounted,
  onActivated,
  onDeactivated,
  onUnmounted
} from 'vue'

import { ElMessage } from 'element-plus'

import editorImage from './components/EditorImage.vue'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'

const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default defineComponent({
  name: 'Tinymce',
  components: { editorImage },
  emits: ['update:value'],
  props: {
    id: {
      type: String,
      default: () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default: () => []
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  setup(props, context) {
    let hasChange = false
    let hasInit = false
    const tinymceId = ref(props.id)
    let fullscreen = ref(false)
    const languageTypeList = {
      en: 'en',
      zh: 'zh_CN',
      es: 'es_MX',
      ja: 'ja'
    }
    const containerWidth = computed(() => {
      const width = props.width + ''
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    })
    watch(
      () => props.value,
      (val) => {
        if (!hasChange && hasInit) {
          nextTick(() => window.tinymce.get(tinymceId).setContent(val || ''))
        }
      }
    )

    const init = () => {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err: Error) => {
        if (err) {
          ElMessage.error(err.message)
          return
        }
        initTinymce()
      })
    }
    const initTinymce = () => {
      window.tinymce.init({
        selector: `#${tinymceId.value}`,
        language: languageTypeList['zh'],
        height: props.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
        menubar: props.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor: any) => {
          console.log(props.value)
          if (props.value) {
            editor.setContent(props.value)
          }
          hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            hasChange = true
            context.emit('update:value', editor.getContent())
          })
        },
        setup(editor: any) {
          editor.on('FullscreenStateChanged', (e: any) => {
            fullscreen.value = e.state
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    }

    const destroyTinymce = () => {
      const tinymce = window.tinymce.get(tinymceId.value)
      if (fullscreen.value) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    }
    // const setContent = (value: string) => {
    //   window.tinymce.get(tinymceId.value).setContent(value)
    // }

    // const getContent = () => {
    //   window.tinymce.get(tinymceId.value).getContent()
    // }

    const imageSuccessCBK = (arr: any) => {
      arr.forEach((v: any) => window.tinymce.get(tinymceId.value).insertContent(`<img class="wscnph" src="${v.url}" >`))
    }

    onMounted(() => {
      init()
    })
    onActivated(() => {
      if (window.tinymce) {
        initTinymce()
      }
    })
    onDeactivated(() => {
      destroyTinymce()
    })
    onUnmounted(() => {
      destroyTinymce()
    })

    return {
      tinymceId,
      containerWidth,
      fullscreen,
      imageSuccessCBK
    }
  }
})
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
