import Request from '../utils/request'

// 友链查询
export function queryAllLabel () {
  return Request({
    url: '/label/queryAllLabel',
    method: 'get'
  })
}
// 友链增加
export function labelAdd (data) {
  return Request({
    url: '/label/labelAdd',
    method: 'post',
    data
  })
}
