import { request } from '@/utils//request'

export function fetchList(query: any): Promise<any> {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id: number): Promise<any> {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv: any): Promise<any> {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data: any): Promise<any> {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data: any): Promise<any> {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
