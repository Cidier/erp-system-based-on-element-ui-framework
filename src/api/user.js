import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function addUser(data) {
  return request({
    url: '/user',
    method: 'POST',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function getListAll(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
