import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/stock/find_dangerous',
    method: 'get',
    params
  })
}
