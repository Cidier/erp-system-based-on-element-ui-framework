import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/tocheck',
    method: 'get',
    params
  })
}
export function getById(id) {
  return request({
    url: '/tocheck/' + id,
    method: 'get'
  })
}
export function update(data) {
  return request({
    url: '/tocheck',
    method: 'put',
    data
  })
}
export function addBysell(id) {
  return request({
    url: '/tocheck/' + id,
    method: 'post'
  })
}

export function deleteById(id) {
  return request({
    url: '/tocheck/' + id,
    method: 'delete'
  })
}
