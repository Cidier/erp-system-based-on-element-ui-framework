import request from '@/utils/request'

export function getListTest(params) {
  return request({
    url: '/outStocktext',
    method: 'get',
    params
  })
}

export function addoutStockText(data) {
  return request({
    url: '/outStocktext',
    method: 'POST',
    data
  })
}

export function updateoutStockText(data) {
  return request({
    url: '/outStocktext',
    method: 'put',
    data
  })
}

export function deleteoutStockText(data) {
  return request({
    url: '/outStocktext',
    method: 'delete',
    data

  })
}
