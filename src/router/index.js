import Vue from 'vue'
import VueRouter from 'vue-router'
// 模板
import Layout from '../layout/index'
// 后台管理模板
import management from '../layout/management'
// 首页
import index from '../views/index.vue'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/redirect',
    component: index,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('../views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'index',
        component: index
      },
      {
        // 技术文章
        path: '/document',
        name: 'document',
        component: () => import('../views/document')
      },
      {
        // 随笔
        path: '/essay',
        name: 'essay',
        component: () => import('../views/essay')
      },
      {
        // 发展历程
        path: '/process',
        name: 'process',
        component: () => import('../views/process')
      },
      // 留言
      {
        path: '/comment',
        name: 'comment',
        component: () => import('../views/comment')
      },
      {
        // 关于我的页面
        path: '/about',
        name: 'about',
        component: () => import('../views/about')
      },
      {
        // 文章详情页面
        path: '/detail',
        name: 'detail',
        component: () => import('../views/detail')
      },
      {
        path: '/label',
        name: 'label',
        component: () => import('../views/label')
      }
    ]
  },
  {
    path: '/user/login',
    component: () => import('../views/login/login')
  },
  {
    path: '/user/register',
    component: () => import('../views/login/register')
  },
  {
    path: '/essays/write',
    name: 'write',
    component: () => import('../views/essays/write')
  }
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

export const asyncRoutes = [
  // 仪表盘
  {
    path: '/management',
    redirect: '/dashborad',
    component: management,
    meta: { title: '仪表盘', icon: 'el-icon-menu', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/dashborad',
        name: 'dashborad',
        component: () => import('../views/dashborad/dashborad'),
        meta: { title: '仪表盘', icon: 'el-icon-menu', roles: ['admin', 'editor'] }
      }
    ]
  },
  // 文章管理
  {
    path: '/essays',
    component: management,
    redirect: '/essays/view',
    meta: { title: '文章管理', icon: 'el-icon-document', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/essays/view',
        component: () => import('../views/essays/view'),
        meta: { title: '文章查看', icon: 'el-icon-notebook-2', roles: ['admin', 'editor'] }
      },
      {
        path: '/essays/editor',
        component: () => import('../views/essays/editor'),
        meta: { title: '文章修改', icon: 'el-icon-notebook-1', roles: ['admin'] }
      }
    ]
  },
  // 用户管理
  {
    path: '/user',
    component: management,
    redirect: '/user/setUp',
    meta: { title: '用户管理', icon: 'el-icon-s-custom', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/user/setUp',
        name: 'setUp',
        component: () => import('../views/user/management'),
        meta: { title: '用户管理', icon: 'el-icon-s-custom', roles: ['admin', 'editor'] }
      },
      {
        path: '/user/view',
        name: 'setUp',
        component: () => import('../views/user/view'),
        meta: { title: '用户查看', icon: 'el-icon-user', roles: ['admin'] }
      }
    ]
  },
  // 系统设置
  {
    path: '/carousel',
    component: management,
    redirect: '/carousel/carousel',
    meta: { title: '系统设置', icon: 'el-icon-warning-outline', roles: ['admin'] },
    children: [
      {
        path: '/carousel/carousel',
        name: 'setUp',
        component: () => import('../views/carousel/carousel'),
        meta: { title: '轮播图设置', icon: 'el-icon-warning-outline', roles: ['admin', 'editor'] }
      },
      {
        path: '/carousel/links',
        name: 'setUp',
        component: () => import('../views/carousel/links'),
        meta: { title: '友链设置', icon: 'el-icon-warning-outline', roles: ['admin', 'editor'] }
      },
      {
        path: '/carousel/version',
        name: 'setUp',
        component: () => import('../views/carousel/version'),
        meta: { title: '版本管理', icon: 'el-icon-warning-outline', roles: ['admin', 'editor'] }
      }
    ]
  }
]

const createRouter = new VueRouter({
  routes: constantRoutes
})

export default createRouter
