import request from '@/utils/request';

export function getBill () {
  return request({
    url: '/api/v1/bill/getBill',
    method: 'post',
    data: {}
  });
}

export function payBill (data) {
  return request({
    url: '/api/v1/bill/payBill',
    method: 'post',
    data
  });
}
