import { Plugin } from 'vue'
import { permission } from './permission'
import { waves } from './waves'
export const directive: Plugin = {
  install(app) {
    app.directive('permission', permission)
    app.directive('waves', waves)
  }
}
