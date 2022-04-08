<template>
  <div>
    <NDataTable :columns="columns" />
  </div>
</template>
<script>
import { NDataTable, NButton } from "naive-ui";
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
    title: "预约状态",
  },
  {
    title: "操作",
    render(row) {
      return h(NButton, {
        type: "Error",
        disabled: row.status === "已撤销",
        onClick: () => revertReservation(row),
      }, { default: "撤销" });
    }
  },
];
export default {
  setup() {

    return {
      columns,
    };
  },
  components: {
    NDataTable,
  },
};
</script>