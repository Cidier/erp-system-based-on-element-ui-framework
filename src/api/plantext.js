import request from '@/utils/request'

export function getListTest(params) {
  return request({
    url: '/planText',
    method: 'get',
    params
  })
}

export function addPlanText(data) {
  return request({
    url: '/planText',
    method: 'POST',
    data
  })
}

export function updatePlanText(data) {
  return request({
    url: '/planText',
    method: 'put',
    data
  })
}

export function deletePlanText(data) {
  return request({
    url: '/planText/{planText}',
    method: 'delete',
    data
  })
}
