import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/stocklog',
    method: 'get',
    params
  })
}
