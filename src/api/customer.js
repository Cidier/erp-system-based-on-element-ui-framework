import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/customer',
    method: 'get',
    params
  })
}

export function addCustomer(data) {
  return request({
    url: '/customer',
    method: 'POST',
    data
  })
}

export function updateCustomer(data) {
  return request({
    url: '/customer',
    method: 'put',
    data
  })
}

export function deleteCustomer(id) {
  return request({
    url: '/customer/' + id,
    method: 'delete'
  })
}
export function getListAll(params) {
  return request({
    url: '/customer/list',
    method: 'get',
    params
  })
}
