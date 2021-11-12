import { Component, App } from 'vue'
// 注册全局el-icon
import * as ElIcons from '@element-plus/icons'

export default function (app: App) {
  for (const key in ElIcons) {
    const icon: Component = (ElIcons as any)[key]
    app.component(key, icon)
  }
}
// 导入本地svg
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
requireAll(req)
