import { Module } from 'vuex'
import type { IRootState } from '../../type'
import type { IPermissionState } from './type'
import { asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any, roles: any) {
  const res: any[] = []

  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const permissionState: Module<IPermissionState, IRootState> = {
  namespaced: true,
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = [...constantRoutes, ...routes]
    },
    REMOVE_ADD_ROUTES: (state) => {
      state.addRoutes.forEach((route) => {
        router.removeRoute(route.name)
      })
      state.addRoutes = []
      state.routes = []
    }
  },
  actions: {
    generateRoutes({ commit }, roles) {
      return new Promise((resolve) => {
        commit('REMOVE_ADD_ROUTES')
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        accessedRoutes.forEach((route) => {
          // 如果路由不存name属性 则手动添加一个默认值Symbol
          if (!route.name) {
            route.name = Symbol(route.path)
          }
        })

        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
