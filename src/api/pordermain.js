import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/pOrderMain',
    method: 'get',
    params
  })
}

export function updatePOrder(data) {
  return request({
    url: '/pOrderMain',
    method: 'put',
    data
  })
}
export function addPOrderByPlan(id) {
  return request({
    url: '/pOrderMain/' + id,
    method: 'POST'
  })
}

export function deletePOrder(id) {
  return request({
    url: '/pOrderMain/' + id,
    method: 'delete'
  })
}

export function createInByPO(id) {
  return request({
    url: '/tocheck/' + id,
    method: 'post'
  })
}

export function createInCheckByPO(id) {
  return request({
    url: '/toStock/' + id,
    method: 'post'
  })
}
