import { ILoginState } from './module/login/type'
import { IUserState } from './module/user/type'
import { IPermissionState } from './module/permission/type'
import { IAppState } from './module/app/type'
import { ITagsViewState } from './module/tagsView/type'
import { IErrorLogState } from './module/errorLog/type'
import { ISettingsState } from './module/settings/type'

export interface IRootState {
  name: string
  age: number
  height: number
}

interface IModule {
  login?: ILoginState
  user?: IUserState
  permission?: IPermissionState
  app?: IAppState
  tagsView?: ITagsViewState
  errorLog?: IErrorLogState
  settings?: ISettingsState
}

export type IStoreType = IRootState & IModule
