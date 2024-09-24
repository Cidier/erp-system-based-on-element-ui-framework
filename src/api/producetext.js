import request from '@/utils/request'

export function getListTest(params) {
  return request({
    url: '/producetext',
    method: 'get',
    params
  })
}

export function updateText(data) {
  return request({
    url: '/producetext',
    method: 'put',
    data
  })
}

export function addText(data) {
  return request({
    url: '/producetext',
    method: 'post',
    data
  })
}

export function deleteByAll(data) {
  return request({
    url: '/tochecktext',
    method: 'delete',
    data
  })
}
