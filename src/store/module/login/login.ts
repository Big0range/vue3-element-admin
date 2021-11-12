import { Module } from 'vuex'
import { IRootState } from '../../type'
import { ElMessage, ElLoading } from 'element-plus'

import router from '@/router/index'
import { login, getUserInfo, getMenus } from '@/api/login'

import type { ILoginState, IAccount } from './type'

export const loginState: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    userMenus: []
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // login(payload)
      //   .then(() => {})
      //   .catch(() => {})
      // commit('changeUserInfo', payload)
      const loading = ElLoading.service({ text: '登录中' })
      console.log('密码登录', payload)
      const result = await login(payload)
      console.log(result)
      const { token, id } = result.data
      window.localStorage.setItem('CMS_TOKEN', token)
      window.localStorage.setItem('CMS_ID', String(id))
      commit('changeToken', token)
      await dispatch('getUserInfoAndMenus', id)
      loading.close()
      // 去首页
      router.replace('main')
      console.log(1)
    },
    // 获取用户信息以及菜单
    async getUserInfoAndMenus({ commit }, id: number) {
      const loading = ElLoading.service({ text: '登录中' })
      // 获取用户信息
      const userResult = await getUserInfo(id)
      const userInfo = userResult.data
      commit('changeUserInfo', userInfo)
      // 获取菜单信息
      const menusResult = await getMenus(id)
      commit('changeUserMenus', menusResult.data)
      loading.close()
    },
    async phoneLoginAction() {
      ElMessage({
        type: 'error',
        message: '暂不支持手机号登录哦'
      })
      // commit('changeUserInfo', payload)
      // console.log('手机号登录', payload)
    }
  }
}
