import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/outStock',
    method: 'get',
    params
  })
}

export function SetCheck(id) {
  return request({
    url: '/outStock/statue/' + id,
    method: 'POST'
  })
}

// export function deletePlan(id) {
//   return request({
//     url: '/planMain/' + id,
//     method: 'delete'
//   })
// }

