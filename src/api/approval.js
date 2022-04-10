import request from '@/utils/request';

export function getApproval(status) {
  return request({
    url: '/api/v1/reservation/getApproval',
    method: 'post',
    data: {
      status,
    },
  });
}

export function setApproval(reservation_id, approval, money) {
  return request({
    url: '/api/v1/reservation/setApproval',
    method: 'post',
    data: {
      reservation_id,
      approval,
      money,
    },
  });
}
