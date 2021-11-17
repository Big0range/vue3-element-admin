<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const levelList = ref<any[]>()

    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched: any = route.matched.filter((item) => item.components && item.meta && item.meta.title)

      const first = matched[0]
      if (!isDashboard(first)) {
        // console.log('route.matched.filter((item) => item.components && item.meta && item.meta.title)')
        matched = [{ path: '/dashboard', meta: { title: '仪表盘' } }].concat(matched)
      }

      levelList.value = matched.filter((item: any) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    const isDashboard = (route: any) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    const handleLink = (item: any) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }

      router.push(path === '/dashboard' ? '/' : path)
    }
    watch(
      () => route.path,
      (newV) => {
        if (newV.startsWith('/redirect/')) {
          return
        }
        getBreadcrumb()
      }
    )

    getBreadcrumb()
    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
