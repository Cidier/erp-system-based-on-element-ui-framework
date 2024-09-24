import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/toStock',
    method: 'get',
    params
  })
}
export function SetCheck(id) {
  return request({
    url: '/toStock/statue/' + id,
    method: 'POST'
  })
}
// export function deletePlan(id) {
//   return request({
//     url: '/planMain/' + id,
//     method: 'delete'
//   })
// }
