export function getStatus(status) {
  if (status == -1) {
    return '已取消';
  } else if (status == -2) {
    return '已拒绝';
  } else if (status == 1 || status == 2 || status == 3) {
    return '已通过';
  } else {
    return '审核中';
  }
}