import { asyncRoutes, constantRoutes } from '../../router/index'

/***
 * 没有定义权限的时候，默认是有权限
 * @param roles
 * @param router
 * @returns {boolean|*}
 */
function hasPer (roles, router) {
  if (router.meta && router.meta.roles) {
    // some 命中一条，即返回true
    return roles.some(role => router.meta.roles.includes(role))
  } else {
    return true
  }
}

// 过滤符合权限的路由
/***
 * @param asyncRoutes
 * @param roles
 * @returns {Array}
 */
export function filterAsyncRoutes (asyncRoutes, roles) {
  const res = []
  asyncRoutes.forEach(router => {
    const tmp = { ...router }
    if (hasPer(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routers: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // 作为缓存用的
    state.addRoutes = routes
    // 侧边栏
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 判断路由是否包含admin
      // 如果包含，将加载所有的路由
      // 否则根据权限加载路由
      let resultRouters
      if (roles.includes('admin')) {
        resultRouters = asyncRoutes || []
      } else {
        resultRouters = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', resultRouters)
      resolve(resultRouters)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
