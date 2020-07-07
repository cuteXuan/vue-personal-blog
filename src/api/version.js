import Request from '../utils/request'

// 版本查询
export function queryAllVersion () {
  return Request({
    url: '/version/queryAllVersion',
    method: 'get'
  })
}
// 版本增加
export function versionAdd (data) {
  return Request({
    url: '/version/versionAdd',
    method: 'post',
    data
  })
}
// 版本删除
export function versionDelete (_id) {
  return Request({
    url: '/version/versionDelete',
    method: 'get',
    params: { _id }
  })
}
// 版本修改
export function versionUpdate (data) {
  return Request({
    url: '/version/versionUpdate',
    method: 'post',
    data
  })
}
