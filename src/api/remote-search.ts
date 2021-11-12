import { request } from '@/utils/request'

export function searchUser(name: string): Promise<any> {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}
type ITransactionList = { data: { items: any[] } }
export function transactionList(query = ''): Promise<ITransactionList> {
  return request<ITransactionList>({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}
