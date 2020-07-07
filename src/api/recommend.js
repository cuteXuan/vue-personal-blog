import Request from '../utils/request'

// 推荐文章查询
export function queryAllRecommend () {
  return Request({
    url: '/recommend/queryAllRecommend',
    method: 'get'
  })
}
// 推荐文章增加
export function recommendAdd (data) {
  return Request({
    url: '/recommend/recommendAdd',
    method: 'post',
    data
  })
}
// 推荐文章删除
export function recommendDelete (_id) {
  return Request({
    url: '/recommend/recommendDelete',
    method: 'get',
    params: { _id }
  })
}
