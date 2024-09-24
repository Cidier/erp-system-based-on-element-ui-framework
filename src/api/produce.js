import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/produce',
    method: 'get',
    params
  })
}
export function getById(id) {
  return request({
    url: '/produce/' + id,
    method: 'get'
  })
}
export function update(data) {
  return request({
    url: '/produce',
    method: 'put',
    data
  })
}
export function addBysell(id) {
  return request({
    url: '/produce/' + id,
    method: 'post'
  })
}

export function deleteById(id) {
  return request({
    url: '/produce/' + id,
    method: 'delete'
  })
}

export function createOutByProduce(id) {
  return request({
    url: '/outStock/pro/' + id,
    method: 'post'
  })
}
