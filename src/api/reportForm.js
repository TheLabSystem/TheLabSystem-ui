import request from '@/utils/request';

export function getReportForm(start_date, end_date) {
  return request({
    url: '/api/v1/reportForm/getReportForm',
    method: 'post',
    data: {
      start_date,
      end_date,
    }
  });
}
