import { request } from '@/utils/request'

import { ID } from './type'

export function getRoutes(): Promise<any> {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles(): Promise<any> {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data: any): Promise<any> {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id: ID, data: any): Promise<any> {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id: ID): Promise<any> {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
