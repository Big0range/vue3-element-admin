import { Directive } from 'vue'
import store from '@/store'

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const roles: string[] = store.getters && store.getters.roles
    if (value && value instanceof Array) {
      if (value.length > 0) {
        const permissionRoles = value

        const hasPermission = roles.some((role: string) => {
          return permissionRoles.includes(role)
        })

        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
