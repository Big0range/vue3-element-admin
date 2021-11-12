import { request } from '@/utils//request'

import type { ILoginResutData, IGetUserInfoResuData, IGetMenusResult } from './type'
import type { IAccount } from '@/store/module/login/type'

export function login(data: IAccount): Promise<ILoginResutData> {
  return request<ILoginResutData>({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo(id: number): Promise<IGetUserInfoResuData> {
  return request<IGetUserInfoResuData>({
    url: '/users/' + id,
    method: 'GET'
  })
}

export function getMenus(id: number): Promise<IGetMenusResult> {
  return request<IGetMenusResult>({
    url: '/role/' + id + '/menu',
    method: 'GET'
  })
}
