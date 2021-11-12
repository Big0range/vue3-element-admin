<template>
  <div>
    <aside>
      <div>不是很好用,找到好用的再替换</div>
    </aside>
    <editor v-model="text" editorClass="editor" :pageFullScreen="false"></editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Editor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
export default defineComponent({
  components: {
    Editor
  },
  setup() {
    const text = ref(`# H1`)
    return {
      text
    }
  }
})
</script>

<style scoped lang="scss">
/*  */
</style>
