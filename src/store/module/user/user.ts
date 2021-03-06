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

    // ????????????
    logout({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        console.log('logout')
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            // ????????????????????????????????????
            dispatch('tagsView/delAllViews', null, { root: true })
            // ?????????????????????
            commit('permission/REMOVE_ADD_ROUTES', null, { root: true })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // ?????? token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // ?????????????????????
    async changeRoles({ commit, dispatch }, role) {
      const token = role + '-token'
      console.log('changeRoles')
      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      // ???????????????????????????????????????
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      // ???????????????????????????
      accessRoutes.forEach((route: any) => {
        router.addRoute(route)
      })

      // ????????????????????????????????????
      dispatch('tagsView/delAllViews', null, { root: true })
    }
  }
}
