import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/stock',
    method: 'get',
    params
  })
}
export function addIventory(params) {
  return request({
    url: '/stock',
    method: 'post',
    data: params
  })
}
export function updateIventory(params) {
  return request({
    url: '/stock',
    method: 'put',
    data: params
  })
}