import Request from '../utils/request'

// 登录
export function login (data) {
  return Request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 注册
export function register (data) {
  return Request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo () {
  return Request({
    url: '/user/getInfo',
    method: 'get'
  })
}
