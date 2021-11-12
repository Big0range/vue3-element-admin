import { Module } from 'vuex'
import type { IRootState } from '../../type'
import type { IUserState } from './type'

import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import router from '@/router'

export const userState: Module<IUserState, IRootState> = {
  namespaced: true,
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token: string) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction: string) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name: string) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar: string) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles: any[]) => {
      state.roles = roles
    }
  },
  actions: {
    // user login
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // get user info
    async getInfo({ commit, state }) {
      console.log('getInfo')
      const result = await getInfo(state.token)
      const { data } = result
      // debugger
      if (!data) {
        throw 'Verification failed, please Login again.'
      }
      const { roles, name, avatar, introduction } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        throw 'getInfo: roles must be a non-null array!'
      }

      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      return data
    },

    // 用户退出
    logout({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        console.log('logout')
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            // 重置已访问视图和缓存视图
            dispatch('tagsView/delAllViews', null, { root: true })
            // 清空已注册路由
            commit('permission/REMOVE_ADD_ROUTES', null, { root: true })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 删除 token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 动态地修改权限
    async changeRoles({ commit, dispatch }, role) {
      const token = role + '-token'
      console.log('changeRoles')
      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      // 生成基于角色的可访问路由图
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      // 动态添加可访问路由
      accessRoutes.forEach((route: any) => {
        router.addRoute(route)
      })

      // 重置已访问视图和缓存视图
      dispatch('tagsView/delAllViews', null, { root: true })
    }
  }
}
