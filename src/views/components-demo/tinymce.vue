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
      content: `<h1 style="text-align: center;">异地鸡 牛逼!</h1><p style="text-align: center; font-size: 15px;"><img title="Image Demo" src="https://p1-ppx.byteimg.com/obj/tos-cn-i-8gu37r9deh/060a032159d243a3b3efd2b50fdb81de" alt="TinyMCE Logo" width="110" height="97" />  <img title="Image Demo" src="https://p3-ppx.byteimg.com/obj/tos-cn-i-8gu37r9deh/01e2e4b4f8294c07851259c70e9283f1" alt="TinyMCE Logo" width="110" height="97" /><ul>
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
