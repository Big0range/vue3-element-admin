<template>
  <div class="components-container">
    <div>
      <tinymce v-model:value="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">异地鸡 牛逼!</h1><p style="text-align: center; font-size: 15px;"><img title="Image Demo" src="//s3.bmp.ovh/imgs/2021/11/098a3592a679895c.gif" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Tinymce <a href="//www.tinymce.com/docs/">官方文档</a> 可能需科学上网.</li><li><a href="https://community.tinymce.com/forum/">社区</a>.</li><li><a href="https://tinymce.com/pricing">企业 </a>级支持.</li>
      </ul>`
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
