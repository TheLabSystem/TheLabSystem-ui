import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/api/v1/auth/login',
    method: 'post',
    data
  });
}

export function whoAmI() {
  return request({
    url: '/api/v1/auth/whoAmI',
    method: 'post',
  });
}

export function logout() {
  return request({
    url: '/api/v1/auth/logout',
    method: 'post',
  });
}