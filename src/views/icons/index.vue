<template>
  <div class="icons-container">
    <aside>
      <a href="https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/icon.html" target="_blank"
        >添加和使用
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div
            v-for="item of svgIcons"
            :key="item"
            v-clipboard:copy="generateIconCode(item)"
            v-clipboard:success="handleClipboard"
          >
            <el-tooltip placement="top">
              <template #content>
                <div>
                  {{ generateIconCode(item) }}
                </div>
              </template>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div
            v-for="item of elementIcons"
            :key="item"
            v-clipboard:copy="generateElementIconCode(item)"
            v-clipboard:success="handleClipboard"
          >
            <el-tooltip placement="top">
              <template #content>
                <div>
                  {{ generateElementIconCode(item) }}
                </div>
              </template>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElMessage } from 'element-plus'

import svgIcons from './svg-icons'
import elementIcons from './element-icons'

export default defineComponent({
  name: 'Icons',
  setup() {
    const generateIconCode = (symbol: any) => {
      return `<svg-icon icon-class="${symbol}" />`
    }
    const generateElementIconCode = (symbol: any) => {
      return `<i class="el-icon-${symbol}" />`
    }
    const handleClipboard = () => {
      ElMessage({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
    const svgIcons2 = reactive(svgIcons)
    const elementIcons2 = reactive(elementIcons)
    return {
      generateIconCode,
      generateElementIconCode,
      handleClipboard,
      svgIcons: svgIcons2,
      elementIcons: elementIcons2
    }
  }
})
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
