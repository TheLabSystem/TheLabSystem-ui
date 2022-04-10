import request from '@/utils/request';

export function getDevice (data) {
  return request({
    url: '/api/v1/device/getDevices',
    method: 'post',
    data: {},
  });
}

export function addDevice (data) {
  return request({
    url: '/api/v1/device/addDevice',
    method: 'post',
    data
  });
}


export function deleteDevice (data) {
  return request({
    url: '/api/v1/device/deleteDevice',
    method: 'post',
    data
  });
}


export function updateDevice (data) {
  return request({
    url: '/api/v1/device/updateDevice',
    method: 'post',
    data
  });
}

