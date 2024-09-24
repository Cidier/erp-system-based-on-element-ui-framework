import request from '@/utils/request'
// 查询
export function getList(params) {
  return request({
    url: '/supplier',
    method: 'get',
    params
  })
}

export function addSupplier(data) {
  return request({
    url: '/supplier',
    method: 'POST',
    data
  })
}

// export function updateSupplier(data) {
//   return request({
//     url: '/supplier',
//     method: 'put',
//     data
//   })
// }

// export function deleteSupplier(id) {
//   return request({
//     url: '/supplier' + id,
//     method: 'delete'
//   })
// }
// 查询列表
export function getListAll(params) {
  return request({
    url: '/supplier/list',
    method: 'get',
    params
  })
}
