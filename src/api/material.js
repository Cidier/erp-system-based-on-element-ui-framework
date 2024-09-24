import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/good',
    method: 'get',
    params
  })
}
export function addMaterial(params) {
  return request({
    url: '/good',
    method: 'post',
    data: params
  })
}
export function updateMaterial(params) {
  return request({
    url: '/good',
    method: 'put',
    data: params
  })
}
export function deleteMaterial(id) {
  return request({
    url: '/good/' + id,
    method: 'delete'
  })
}