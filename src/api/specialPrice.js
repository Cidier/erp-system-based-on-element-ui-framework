import request from '@/utils/request'
// 查询
export function getList(params) {
  return request({
    url: '/price/cus',
    method: 'get',
    params
  })
}

export function addSpecialPrice(data) {
  return request({
    url: '/price/cus',
    method: 'POST',
    data
  })
}
export function updateSpecialPrice(data) {
  return request({
    url: '/price/cus',
    method: 'put',
    data
  })
}

export function deleteSpecialPrice(id) {
  return request({
    url: '/price/cus/' + id,
    method: 'delete'
  })
}
