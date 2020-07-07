import Request from '../utils/request'

// 发布文章
export function publishArticle (data) {
  return Request({
    url: '/article/publish',
    method: 'post',
    data
  })
}

// 通过id查看文章
export function getArticle (id) {
  return Request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

// 修改文章
export function upArticle (data) {
  return Request({
    url: '/article/update',
    method: 'post',
    data
  })
}

// 删除文章
export function delArticle(_id) {
  return Request({
    url: '/article/delete',
    method: 'get',
    params: { _id }
  })
}

// 查询文章
export function queryAll (pageSize, currentPage, group) {
  return Request({
    url: '/article/queryAll',
    method: 'get',
    params: { pageSize, currentPage, group }
  })
}

// 通过标签查询文章
export function queryByLabel (pageSize, currentPage, label) {
  return Request({
    url: '/article/queryByLabel',
    method: 'get',
    params: { pageSize, currentPage, label }
  })
}
// 查看关于我的id
export function getAboutId () {
  return Request({
    url: '/article/getAboutId',
    method: 'get',
    params: {}
  })
}


