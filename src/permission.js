import router from './router'
import store from './store'
import NProgress from 'nprogress'
import title from './utils/page-title'
import { getToken } from './utils/auth'

const whiteList =
  ['/user/login',
   '/user/register',
  '/index',
  '/document',
   '/essay',
   '/process',
    '/comment',
    '/tools',
    '/tools/rgb',
   '/about',
   '/detail',
    '/label'
  ]
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 添加标题
  document.title = title(to.meta.title)

  // 判断有无token
  if (getToken()) {
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 判断是否有Token(是否为登录状态)
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户权限，动态生成路由
          const { roles } = await store.dispatch('user/getInfo')
          console.log(roles)
          const asyncRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 为基础路由，添加权限生成的路由
          router.addRoutes(asyncRoutes)
          next({ ...to, replace: true })
        } catch (e) {
          // 动态路由获取失败
          // token失效
          await store.dispatch('user/resetToken')
          next(`/user/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/user/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
