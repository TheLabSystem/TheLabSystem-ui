<template>
  <NCard title="学生管理" style="width: 98%; margin: 10px 1%; min-height: 85%;">
    <NDataTable :columns="columns" />
  </NCard>
</template>
<script>
import { NCard, NDataTable, NButton } from 'naive-ui';

const columns = [
  {
    title: "学号",
  },
  {
    title: "姓名",
  },
  {
    title: "操作",
    render(row) {
      return  h(NButton, {
        type: "error",
        onClick: () => removeStudent(row),
      }, { default: "删除" });
    }
  },
];
export default {
  setup() {

  },
  components: {
    NCard,
    NDataTable
  },
}
</script>