import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/planMain',
    method: 'get',
    params
  })
}

export function addPlan(data) {
  return request({
    url: '/planMain',
    method: 'POST',
    data
  })
}

export function updatePlan(data) {
  return request({
    url: '/planMain',
    method: 'put',
    data
  })
}

export function deletePlan(id) {
  return request({
    url: '/planMain/' + id,
    method: 'delete'
  })
}
