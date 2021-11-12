import { createStore, Store, useStore as useStoreCopy } from 'vuex'
import { loginState } from './module/login/login'
import { AppState } from './module/app/app'
import { userState } from './module/user/user'
import { permissionState } from './module/permission/permission'
import { settingsState } from './module/settings/settings'
import { errorLogState } from './module/errorLog/errorLog'
import { tagsViewState } from './module/tagsView/tagsView'
import type { IRootState, IStoreType } from './type'

export default createStore<IRootState>({
  state: {
    name: '123',
    age: 123,
    height: 123
  },
  mutations: {},
  actions: {},
  modules: {
    login: loginState,
    user: userState,
    permission: permissionState,
    app: AppState,
    settings: settingsState,
    errorLog: errorLogState,
    tagsView: tagsViewState
  },
  getters: {
    sidebar: (state: IStoreType) => state.app?.sidebar,
    size: (state: IStoreType) => state.app?.size,
    device: (state: IStoreType) => state.app?.device,
    showSettings: (state: IStoreType) => state.settings?.showSettings,
    needTagsView: (state: IStoreType) => state.settings?.tagsView,
    fixedHeader: (state: IStoreType) => state.settings?.fixedHeader,
    visitedViews: (state: IStoreType) => state.tagsView?.visitedViews,
    cachedViews: (state: IStoreType) => state.tagsView?.cachedViews,
    token: (state: IStoreType) => state.user?.token,
    avatar: (state: IStoreType) => state.user?.avatar,
    name: (state: IStoreType) => state.user?.name,
    introduction: (state: IStoreType) => state.user?.introduction,
    roles: (state: IStoreType) => state.user?.roles,
    permission_routes: (state: IStoreType) => state.permission?.routes,
    errorLogs: (state: IStoreType) => state.errorLog?.logs
  }
})

export function useStore(): Store<IStoreType> {
  return useStoreCopy()
}
