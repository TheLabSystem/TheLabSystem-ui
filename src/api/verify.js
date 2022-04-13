import request from '@/utils/request';

export function viewAllVerifyCode() {
  return request({
    url: '/api/v1/verifyCode/viewAllVerifyCode',
    method: 'post',
    data: {}
  });
}

export function addVerifyCode(verify_code, user_type) {
  return request({
    url: '/api/v1/verifyCode/addVerifyCode',
    method: 'post',
    data: {
      verify_code,
      user_type
    }
  });
}

export function deleteVerifyCode(deleteVerifyCode) {
  return request({
    url: '/api/v1/verifyCode/deleteVerifyCode',
    method: 'post',
    data: {
      deleteVerifyCode,
    },
  });
}
