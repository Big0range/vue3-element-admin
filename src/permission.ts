import router from './router'
import store from '@/store/index'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // 顶部进度条
import 'nprogress/nprogress.css' // 顶部进度条 style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // 重定向白名单

router.beforeEach(async (to, form, next) => {
  // 进度条开始
  NProgress.start()

  // 设置页面 title
  document.title = getPageTitle(to.meta.title as string)

  // 判断用户是否已经登录
  const hasToken = getToken()
  // 已经登录
  if (hasToken) {
    if (to.path === '/login') {
      // 进度条结束
      NProgress.done()
      // 如果已登录，则重定向到主页
      next({ path: '/' })
    } else {
      // 判断用户是否通过getInfo获得了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // console.log(hasRoles, to)
      if (hasRoles) {
        next()
      } else {
        try {
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // console.log(accessRoutes)
          // 根据权限动态添加路由
          accessRoutes.forEach((route: any) => {
            router.addRoute(route)
          })
          NProgress.done()
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error: any) {
          console.log(error)
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          NProgress.done()
          // return `/login?redirect=${to.path}`
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // 在免费登录白名单，直接跳转
      NProgress.done()
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
