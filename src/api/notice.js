import request from '@/utils/request';

export function getNotice () {
  return request({
    url: '/api/v1/notice/getNotice',
    method: 'get',
  });
}

export function addNotice (data) {
  return request({
    url: '/api/v1/notice/addNotice',
    method: 'post',
    data
  });
}


export function deleteNotice (data) {
  return request({
    url: '/api/v1/notice/deleteNotice',
    method: 'post',
    data
  });
}


export function updateNotice (data) {
  return request({
    url: '/api/v1/notice/updateNotice',
    method: 'post',
    data
  });
}

