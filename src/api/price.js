import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/price',
    method: 'get',
    params
  })
}

export function updatePrice(data) {
  return request({
    url: '/price',
    method: 'put',
    data
  })
}
export function getPer(params) {
  return request({
    url: '/price/getPer',
    method: 'get',
    params
  })
}
