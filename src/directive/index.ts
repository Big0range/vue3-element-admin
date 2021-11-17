import { Plugin } from 'vue'
import { permission } from './permission'
import { waves } from './waves'
import { clipboard } from './clipboard'
import { parseTime } from './parseTime'
export const directive: Plugin = {
  install(app) {
    app.directive('permission', permission)
    app.directive('waves', waves)
    app.directive('clipboard', clipboard)
    app.directive('parseTime', parseTime)
  }
}
