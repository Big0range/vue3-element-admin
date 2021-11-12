<template>
  <div>
    <sticky :z-index="10" class-name="sub-navbar">
      <el-dropdown trigger="click">
        <el-button plain> Platform<i class="el-icon-caret-bottom el-icon--right" /> </el-button>
        <template #dropdown>
          <el-dropdown-menu class="no-border">
            <el-checkbox-group v-model="platforms" style="padding: 5px 15px">
              <el-checkbox v-for="item in platformsOptions" :key="item.key" :label="item.key">
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button plain> Link<i class="el-icon-caret-bottom el-icon--right" /> </el-button>
        <template #dropdown>
          <el-dropdown-menu class="no-padding no-border" style="width: 300px">
            <el-input v-model="url" placeholder="Please enter the content">
              <template #prepend> Url </template>
            </el-input>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker v-model="time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Release time" />
      </div>

      <el-button style="margin-left: 10px" type="success"> publish </el-button>
    </sticky>

    <div class="components-container">
      <aside>Sticky 定位组件.</aside>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <sticky :sticky-top="200">
        <el-button type="primary"> placeholder</el-button>
      </sticky>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Sticky from '@/components/Sticky/index.vue'

export default defineComponent({
  name: 'StickyDemo',
  components: { Sticky },
  setup() {
    const time = ref('')
    const url = ref('')
    const platforms = reactive(['a-platform'])
    const platformsOptions = reactive([
      { key: 'a-platform', name: 'platformA' },
      { key: 'b-platform', name: 'platformB' },
      { key: 'c-platform', name: 'platformC' }
    ])
    const pickerOptions = reactive({
      disabledDate(time: Date) {
        return time.getTime() > Date.now()
      }
    })
    return {
      time,
      url,
      platforms,
      platformsOptions,
      pickerOptions
    }
  }
})
</script>

<style scoped>
.components-container div {
  margin: 10px;
}

.time-container {
  display: inline-block;
}
</style>
