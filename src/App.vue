<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      setTimeout(() => {
        this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
        console.log(this.$store.state)
      }, 1000)
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
})
</script>

<style lang="scss">
.app {
  height: 100%;
}
</style>
