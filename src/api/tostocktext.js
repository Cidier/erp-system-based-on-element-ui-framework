import request from '@/utils/request'

export function getListTest(params) {
  return request({
    url: '/toStockText',
    method: 'get',
    params
  })
}

export function addtoStockText(data) {
  return request({
    url: '/toStockText',
    method: 'POST',
    data
  })
}

export function updatetoStockText(data) {
  return request({
    url: '/toStockText',
    method: 'put',
    data
  })
}

export function deletetoStockText(data) {
  return request({
    url: '/toStockText/{toStockText}',
    method: 'delete',
    data

  })
}
