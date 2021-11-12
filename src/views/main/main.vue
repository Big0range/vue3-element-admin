<template>
  <div>
    <div v-permission="['admin']">admin</div>
    <div v-permission="['editor']">editor</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {}
})
</script>
