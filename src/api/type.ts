export interface ILoginResutData {
  code: number
  data: {
    id: number
    name: string
    token: string
  }
}

export interface IGetUserInfoResuData {
  code: number
  data: {
    id: number
    name: string
    realname: string
    cellphone: number
    enable: 1
    createAt: string
    updateAt: string
  }
  role: {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt: string
  }
  department: {
    id: number
    name: string
    leader: string
    parentId: number | null
    createAt: string
    updateAt: string
  }
}

interface IChildren {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children?: IChildren[] | null
}

export interface IGetMenusResult extends IChildren {
  code: number
  data?: IChildren[]
}

// export const demo: IGetMenusResult = {
//   code: 1,
//   data: null,
//   id: 1,
//   name: 'string',
//   type: 1,
//   url: 'string',
//   icon: 'string',
//   sort: 1
// }

export type ID = string | number
