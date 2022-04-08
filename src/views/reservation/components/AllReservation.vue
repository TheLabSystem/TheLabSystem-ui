<template>
  <div>
    <NDataTable :columns="columns" />
  </div>
</template>
<script>
import { NDataTable, useDialog } from "naive-ui";
import { h } from "vue";
import ReservationDetails from "./ReservationDetails.vue";
const columns = [
  {
    title: "设备名称",
  },
  {
    title: "操作",
  },
];
const dialogOptions = {
  title: "设备预约",
  content: () => h(ReservationDetails),
};
export default {
  setup() {
    const Dialog = useDialog();
    Dialog.create(dialogOptions);
    return {
      columns,
    };
  },
  components: {
    NDataTable,
  },
};
</script>