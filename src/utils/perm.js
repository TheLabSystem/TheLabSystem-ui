export function getPermName(perm) {
  if (perm === 255) {
    return "超级管理员";
  } else if (perm === 5) {
    return "财务处";
  } else if (perm === 4) {
    return "设备管理员";
  } else if (perm === 3) {
    return "教师";
  } else if (perm === 2) {
    return "学生";
  } else if (perm === 1) {
    return "校外人员";
  }
}