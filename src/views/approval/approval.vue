<template>
  <NCard title="预约审批" style="width: 98%; margin: 10px 1%; min-height: 85%;">
    <NDataTable :columns="columns" :data="approvals" />
  </NCard>
</template>
<script>
import { NCard, NDataTable, NButton, useDialog, useMessage, NSpace } from 'naive-ui';
import { getApproval, setApproval } from '@/api/approval';
import { getReservationInfoByReservationID } from '@/api/reservation';
import { ref, h } from 'vue';

const getColumns = ({showApprovalDetails, acceptApproval, rejectApproval}) => [
  {
    title: "设备名称",
    key: "DeviceInfo",
  },
  {
    title: "预约数量",
    key: "nums",
  },
  {
    title: "预约时间",
    render(row) {
      return `${row.ReservationDay} - ${row.ReservationTime}`;
    },
  },
  {
    title: "预约人",
    key: "ApplicantID",
  },
  {
    title: "状态",
    key: "Status",
    filterOptions: [
      {
        label: '已审批',
        value: 'London',
      },
      {
        label: '未审批',
        value: 'New York',
      },
    ],
    filter (value, row) {
      return 1;
    }
  },
  {
    title: "操作",
    render: (row) => {
      return h(NSpace, {}, () => [
        h(NButton, {
          type: "info",
          onClick: () => showApprovalDetails(row),
        }, { default: () => "详情" }),
        // TODO: 已审批的不用按钮
        h(NButton, {
          type: "success",
          onClick: () => acceptApproval(row.ReservationID),
        }, { default: () => "通过" }),
        h(NButton, {
          type: "error",
          onClick: () => rejectApproval(row.ReservationID),
        }, { default: () => "拒绝" }),
      ]);
    }
  },
];
export default {
  setup() {
    const dialog = useDialog();
    const message = useMessage();
    const approvals = ref([]);
    const showApprovalDetails = (row) => {
      const dialogOptions = {
        title: "预约申请详情",
        content: row.description,
      };
      dialog.create(dialogOptions);
    };
    const getAllApproval = async () => {
      const res = await getApproval(1);
      let data = [];
      for (let reservation of res.Data.Approval) {
        const res = await getReservationInfoByReservationID(reservation.ReservationID);
        data.push({
          ...reservation,
          DeviceInfo: res.Data.reservationInfos[0].DeviceTypeInfo,
          nums: res.Data.reservationInfos.length,
          ReservationDay: res.Data.reservationInfos[0].ReservationDay,
          ReservationTime: res.Data.reservationInfos[0].ReservationTime,
        });
      }
      // console.log(data);
      approvals.value = data;
    };
    const acceptApproval = (id) => {
      setApproval(id, 1).then((res) => {
        // console.log(res);
        message.success("操作成功");
        getAllApproval();
      });
    };
    const rejectApproval = (id) => {
      setApproval(id, 2).then((res) => {
        // console.log(res);
        message.success("操作成功");
        getAllApproval();
      });
    };
    getAllApproval();
    const columns = getColumns({
      showApprovalDetails,
      acceptApproval,
      rejectApproval,
    });
    return {
      approvals,
      columns,
      dialog,
    };
  },
  components: {
    NCard,
    NDataTable
  },
}
</script>