import Request from '../utils/request'

// 轮播图查询
export function queryAllCarousel () {
  return Request({
    url: '/carousel/queryAllCarousel',
    method: 'get'
  })
}
// 轮播图增加
export function carouselAdd (data) {
  return Request({
    url: '/carousel/carouselAdd',
    method: 'post',
    data
  })
}

// 轮播图删除
export function carouselDelete (_id) {
  return Request({
    url: '/carousel/carouselDelete',
    method: 'get',
    params: { _id }
  })
}

export function carouselUpdate (data) {
  return Request({
    url: '/carousel/carouselUpdate',
    method: 'post',
    data
  })
}
