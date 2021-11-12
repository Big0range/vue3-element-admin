<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SwitchRoles from './components/SwitchRoles.vue'

export default defineComponent({
  name: 'PagePermission',
  components: { SwitchRoles },
  methods: {
    handleRolesChange() {
      return console.log('/permission/index?' + +new Date())
      // this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
})
</script>
