<template>
  <NCard title="预约审批" style="width: 98%; margin: 10px 1%; min-height: 85%;">
    <NDataTable :columns="columns" :data="approvals" />
  </NCard>
</template>
<script>
import { NCard, NDataTable, NButton, useDialog, NSpace, useMessage } from 'naive-ui';
import { getApproval, setApproval } from '@/api/approval';
import { getReservationInfoByReservationID } from '@/api/reservation';
import { ref, h } from 'vue';
import { getStatus } from '@/utils/reservation';

const getColumns = ({acceptApproval, rejectApproval}) => [
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
    key: "userName",
  },
  // {
  //   title: "状态",
  //   render(row) {
  //     return getStatus(row.Status);
  //   },
  //   filterOptions: [
  //     {
  //       label: '已审批',
  //       value: 1,
  //     },
  //     {
  //       label: '待审批',
  //       value: 0,
  //     },
  //   ],
  //   filter (value, row) {
  //     const end = [-2, -1, 1, 2, 3];
  //     return end.indexOf(row.Status) !== -1 ? value : !value;
  //   }
  // },
  {
    title: "操作",
    render: (row) => {
      return h(NSpace, {}, () => [
        // TODO: 已审批的不用按钮
        h(NButton, {
          type: "success",
          onClick: () => acceptApproval(row.ReservationID, row.userType),
          disabled: [-2, -1, 1, 2, 3].indexOf(row.Status) != -1,
        }, { default: () => "通过" }),
        h(NButton, {
          type: "error",
          onClick: () => rejectApproval(row.ReservationID),
          disabled: [-2, -1, 1, 2, 3].indexOf(row.Status) != -1,
        }, { default: () => "拒绝" }),
      ]);
    }
  },
];
export default {
  setup() {
    const dialog = useDialog();
    const approvals = ref([]);
    const message = useMessage();
    const getAllApproval = async () => {
      const res = await getApproval(1);
      let data = [];
      for (let reservation of res.Data.ApprovalRes) {
        const res = await getReservationInfoByReservationID(reservation.ReservationRes.ReservationID);
        data.push({
          ...reservation.ReservationRes,
          userName: reservation.UserRes.display_name,
          userType: reservation.UserRes['user-type'],
          DeviceInfo: res.Data.reservationInfos[0].DeviceTypeInfo,
          nums: res.Data.reservationInfos.length,
          ReservationDay: res.Data.reservationInfos[0].ReservationDay,
          ReservationTime: res.Data.reservationInfos[0].ReservationTime,
        });
      }
      // console.log(data);
      approvals.value = data.filter(item => item.Status != -1);
    };
    const acceptApproval = (id) => {
      setApproval(id, 1).then((res) => {
        message.success("操作成功");
        getAllApproval();
      });
    };
    const rejectApproval = (id, userType) => {
      setApproval(id, 2).then((res) => {
        message.error("拒绝成功");
        getAllApproval();
      });
    };
    getAllApproval();
    const columns = getColumns({
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