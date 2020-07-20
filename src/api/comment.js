import Request from '../utils/request'

// 评论查询
export function queryAllComment (commentType) {
  return Request({
    url: '/comment/queryAllComment',
    method: 'get',
    params: { commentType }
  })
}
// 评论增加
export function commentAdd (data) {
  return Request({
    url: '/comment/commentAdd',
    method: 'post',
    data
  })
}

// 子评论添加
export function commentAddChildren (data) {
  return Request({
    url: '/comment/commentAddChildren',
    method: 'post',
    data
  })
}
