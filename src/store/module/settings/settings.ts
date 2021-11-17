import { Module } from 'vuex'
import type { IRootState } from '../../type'
import type { ISettingsState } from './type'

import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/utils/settings'
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

export const settingsState: Module<ISettingsState, IRootState> = {
  namespaced: true,
  state: {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  },
  mutations: {
    CHANGE_SETTING: (state: ISettingsState, payload: { key: keyof ISettingsState; value: boolean | string }) => {
      const { key, value } = payload
      if (typeof state[key] === 'boolean' && typeof value === 'boolean') {
        ;(state[key] as boolean) = value
        return
      }
      if (typeof state[key] === 'string' && typeof value === 'string') {
        ;(state[key] as string) = value
        return
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}
