import request from '@/utils/request'

export function getListTest(params) {
  return request({
    url: '/sellText',
    method: 'get',
    params
  })
}

export function addSellTest(data) {
  return request({
    url: '/sellText',
    method: 'POST',
    data
  })
}

export function updateSellTest(data) {
  return request({
    url: '/sellText',
    method: 'put',
    data
  })
}

export function deleteSellTest(data) {
  return request({
    url: '/sellText/{sellText}',
    method: 'delete',
    data
  })
}
