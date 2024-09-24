import request from '@/utils/request'
// 查询
export function getList(params) {
  return request({
    url: '/price/sup',
    method: 'get',
    params
  })
}

export function addPurchasePrice(data) {
  return request({
    url: '/price/sup',
    method: 'POST',
    data
  })
}
export function updatePurchasePrice(data) {
  return request({
    url: '/price/sup',
    method: 'put',
    data
  })
}

export function deletePurchasePrice(id) {
  return request({
    url: '/price/sup/' + id,
    method: 'delete'
  })
}
