import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sellMain',
    method: 'get',
    params
  })
}

export function addSell(data) {
  return request({
    url: '/sellMain',
    method: 'POST',
    data
  })
}

export function updateSell(data) {
  return request({
    url: '/sellMain',
    method: 'put',
    data
  })
}

export function updateSellState(data) {
  return request({
    url: '/sellMain/statue',
    method: 'put',
    data
  })
}

export function deleteSell(id) {
  return request({
    url: '/sellMain/' + id,
    method: 'delete'
  })
}

export function createToBySellId(id) {
  return request({
    url: '/outStock/' + id,
    method: 'post'
  })
}

export function createProduceBySellId(id) {
  return request({
    url: '/produce/' + id,
    method: 'post'
  })
}
