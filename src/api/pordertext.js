import request from '@/utils/request'

export function getListTest(params) {
  return request({
    url: '/pOrderText',
    method: 'get',
    params
  })
}

// export function addPOrderText(data) {
//   return request({
//     url: '/pOrderText',
//     method: 'POST',
//     data
//   })
// }

export function updatePOrderText(data) {
  return request({
    url: '/pOrderText',
    method: 'put',
    data
  })
}

// export function deletePOrderText(data) {
//   return request({
//     url: '/pOrderText/{pOrderText}',
//     method: 'delete',
//     data
//   })
// }
