import request from '@/utils/request';

export function getDevices() {
  return request({
    url: '/api/v1/device/getDevices',
    method: 'post',
    data: {}
  });
}

export function getPersonalReservations() {
  return request({
    url: '/api/v1/reservation/getPersonalReservations',
    method: 'post',
    data: {}
  });
}

export function revertReservation(reservation_id) {
  return request({
    url: '/api/v1/reservation/revertReservation',
    method: 'post',
    data: {
      reservation_id
    },
  });
}

export function getReservationInfoByReservationID(reservation_id) {
  return request({
    url: '/api/v1/reservation/getReservationInfoByReservationID',
    method: 'post',
    data: {
      reservation_id
    },
  });
}

export function getReservationDetails(day, device_type_id) {
  return request({
    url: '/api/v1/reservation/getReservationDetails',
    method: 'post',
    data: {
      day,
      device_type_id
    },
  });
}