import request from '@/utils/request';

export function whoAmI() {
  return request({
    url: '/api/v1/auth/whoAmI',
    method: 'post',
  });
}