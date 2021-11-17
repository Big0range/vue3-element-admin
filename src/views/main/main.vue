<template>
  <div>
    <div v-permission="['admin']">admin</div>
    <div v-permission="['editor']">editor</div>
    <div v-parseTime>2020-02-02 02:02:02</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {}
})
</script>
