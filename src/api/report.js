import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/finance',
    method: 'get',
    params
  })
}
export function addReport(params) {
  return request({
    url: '/finance',
    method: 'post',
    data: params
  })
}
export function updateReport(params) {
  return request({
    url: '/finance',
    method: 'put',
    data: params
  })
}
export function deleteReport(id) {
  return request({
    url: '/finance/' + id,
    method: 'delete'
  })
}
