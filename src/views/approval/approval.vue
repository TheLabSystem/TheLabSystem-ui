<template>
  <NCard title="预约审批" style="width: 98%; margin: 10px 1%; min-height: 85%;">
    <NDataTable :columns="columns" />
  </NCard>
</template>
<script>
import { NCard, NDataTable, NButton, useDialog } from 'naive-ui';
import { App } from '@vicons/carbon';

const columns = [
  {
    title: "设备名称",
  },
  {
    title: "预约数量",
  },
  {
    title: "预约时间",
  },
  {
    title: "预约人",
  },
  {
    title: "操作",
    render(row) {
      return h('div', {}, [
        h(NButton, {
          type: "info",
          onClick: () => showApprovalDetails(row),
        }, { default: "详情" }),
        h(NButton, {
          type: "success",
          onClick: () => acceptApproval(row),
        }, { default: "通过" }),
        h(NButton, {
          type: "error",
          onClick: () => rejectApproval(row),
        }, { default: "拒绝" }),
      ]);
    }
  },
];
function showApprovalDetails(row) {
  const dialogOptions = {
  title: "预约申请详情",
  content: () => h(ApprovalDetails, {
    info: row,
  }),
};
}
export default {
  setup() {
    const dialog = useDialog();
  },
  components: {
    NCard,
    NDataTable
  },
}
</script>