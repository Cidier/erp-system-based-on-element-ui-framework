import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/employee',
    method: 'get',
    params
  })
}
export function addEmployee(params) {
  return request({
    url: '/employee',
    method: 'post',
    data: params
  })
}
export function updateEmployee(params) {
  return request({
    url: '/employee',
    method: 'put',
    data: params
  })
}
export function deleteEmployee(id) {
  return request({
    url: '/employee/' + id,
    method: 'delete'
  })
}