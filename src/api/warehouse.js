import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/warehouse/shipping',
    method: 'get',
    params
  })
}
export function addWarehouse(data) {
  return request({
    url: '/warehouse/shipping',
    method: 'POST',
    data
  })
}

export function updateWarehouse(data) {
  return request({
    url: '/warehouse/shipping',
    method: 'put',
    data
  })
}

export function deleteWarehouse(id) {
  return request({
    url: '/warehouse/shipping/' + id,
    method: 'delete'
  })
}
export function getListAll(params) {
  return request({
    url: '/warehouse/shipping',
    method: 'get',
    params
  })
}
