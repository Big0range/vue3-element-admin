import { request } from '@/utils/request'

interface ILogin {
  data: {
    token: string
  }
}
export function login(data: any): Promise<ILogin> {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

interface IGetInfo {
  data: {
    avatar: string
    introduction: string
    name: string
    roles: any[]
  }
}
export function getInfo(token: string): Promise<IGetInfo> {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(): Promise<any> {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
