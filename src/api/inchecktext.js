import request from '@/utils/request'

export function getListTest(params) {
  return request({
    url: '/tostockcheck',
    method: 'get',
    params
  })
}

export function updateCheck(data) {
  return request({
    url: '/tostockcheck',
    method: 'put',
    data
  })
}

export function getProblem(params) {
  return request({
    url: '/tochecktext',
    method: 'get',
    params: params
  })
}

export function deleteById(id) {
  return request({
    url: '/tochecktext/' + id,
    method: 'delete'
  })
}
export function updateProblem(data) {
  return request({
    url: '/tochecktext',
    method: 'put',
    data
  })
}
export function createProblem(params) {
  return request({
    url: '/tochecktext',
    method: 'post',
    data: params
  })
}
