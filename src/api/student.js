import request from '@/utils/request';

export function viewStudent() {
  return request({
    url: '/api/v1/mentalList/viewStudent',
    method: 'post',
    data: {},
  });
}

export function addStudent(student_id) {
  return request({
    url: '/api/v1/mentalList/addStudent',
    method: 'post',
    data: {
      student_id: Number(student_id),
    },
  });
}

export function deleteStudent(student_id) {
  return request({
    url: '/api/v1/mentalList/deleteStudent',
    method: 'post',
    data: {
      student_id: Number(student_id),
    },
  });
}