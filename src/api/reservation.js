import request from '@/utils/request';

export function getDevices() {
  return request({
    url: '/api/v1/device/getDeviceType',
    method: 'post',
    data: {}
  });
}