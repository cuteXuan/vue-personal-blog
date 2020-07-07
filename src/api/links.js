import Request from '../utils/request'

// 友链查询
export function queryAllLinks () {
  return Request({
    url: '/links/queryAllLinks',
    method: 'get'
  })
}
// 友链增加
export function linksAdd (data) {
  return Request({
    url: '/links/linksAdd',
    method: 'post',
    data
  })
}
// 友链删除
export function linksDelete (_id) {
  return Request({
    url: '/links/linksDelete',
    method: 'get',
    params: { _id }
  })
}
// 友链修改
export function linksUpdate (data) {
  return Request({
    url: '/links/linksUpdate',
    method: 'post',
    data
  })
}
