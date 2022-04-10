<template>
  <NCard title="统计报表" style="width: 98%; margin: 10px 1%; min-height: 85%">
    <NSpace vertical>
      <NSpace>
        <span>选择日期范围:</span>
        <NDatePicker v-model:value="range" type="daterange" clearable />
      </NSpace>
      <NDataTable :columns="columns" :data="info" />
    </NSpace>
  </NCard>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NDatePicker, NCard, NSpace, NDataTable } from "naive-ui";
import { formatDate } from "@/utils/date";
import { getReportForm } from "@/api/reportForm";

const columns = [
  {
    label: "",
    key: "key",
  },
  {
    label: "",
    key: "value",
  }
];
export default defineComponent({
  components: { NDatePicker, NCard, NSpace, NDataTable, },
  setup() {
    const info = ref([]);
    const range = ref([Date.now() - 24 * 60 * 60 * 1000 * 7, Date.now()]);
    const getForm = async () => {
      const res = await getReportForm(formatDate(new Date(range.value[0])), formatDate(new Date(range.value[1])));
      const data = res.Data.reportForm;
      info.value = [
        {
          key: "校外人员预约数",
          value: data.foreignUserReservation,
        },
        {
          key: "学生预约数",
          value: data.studentReservation,
        },
        {
          key: "教师预约数",
          value: data.teacherReservation,
        },
        {
          key: "校外人员成功审批数",
          value: data.successfulForeignUserReservation,
        },
        {
          key: "学生成功审批数",
          value: data.successfulStudentReservation,
        },
        {
          key: "教师成功审批数",
          value: data.successfulTeacherReservation,
        },
        {
          key: "资金收入",
          value: data.moneyIn,
        },
        {
          key: "资金支出",
          value: data.moneyOut,
        },
      ];
    };
    getForm();
    return {
      range,
      info,
      columns,
    };
  },
});
</script>