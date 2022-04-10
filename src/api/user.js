import request from '@/utils/request';

export function findUserInfo (data) {
  return request({
    url: '/api/v1/auth/whoAmI',
    method: 'post',
    data
  });
}

export function addMoney (data) {
  return request({
    url: '/api/v1/user/addMoney',
    method: 'post',
    data
  });
}

export function changeUserInfo (data) {
  return request({
    url: '/api/v1/user/changeUserInfo',
    method: 'post',
    data
  });
}
