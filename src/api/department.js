import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/department',
    method: 'get',
    params
  })
}
export function addDepartment(params) {
  return request({
    url: '/department',
    method: 'post',
    data: params
  })
}
export function updateDpartment(params) {
  return request({
    url: '/department',
    method: 'put',
    data: params
  })
}
export function deleteDepartment(id) {
  return request({
    url: '/department/' + id,
    method: 'delete'
  })
}