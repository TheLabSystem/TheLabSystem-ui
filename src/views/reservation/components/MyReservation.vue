<template>
  <div>
    <NDataTable :columns="columns" :data="reservations" />
  </div>
</template>
<script>
import { NDataTable, NButton, useMessage } from "naive-ui";
import { ref, h } from "vue";
import { getPersonalReservations, revertReservation, getReservationInfoByReservationID } from "@/api/reservation";
import { getStatus } from '@/utils/reservation';

const getColumns = (revertMyReservation) => [
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
      return `${row.ReservationDay} , ${(row.ReservationTime * 2).toString().padStart(2, '0')}:00-${((row.ReservationTime + 1) * 2).toString().padStart(2, '0')}:00`;
    },
  },
  {
    title: "预约状态",
    render(row) {
      return getStatus(row.Status);
    },
  },
  {
    title: "操作",
    render(row) {
      const getDisabled = (ReservationDay) => {
        const end = new Date(ReservationDay);
        const now = new Date();
        console.log(end, now, end.getDate(), now.getDate());
        if (end < now || now.getDate() == end.getDate()) {
          return false;
        }
        return true;
      };
      return h(NButton, {
        type: "Error",
        disabled: row.Status === -1 || row.Status === -2 || !getDisabled(row.ReservationDay),
        onClick: () => revertMyReservation(row.ReservationID),
      }, { default: () => "撤销" });
    }
  },
];
export default {
  setup() {
    const message = useMessage();
    const reservations = ref([]);
    const getReservations = async () => {
      const res = await getPersonalReservations();
      let data = [];
      for (let reservation of res.Data.reservations) {
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
      reservations.value = data;
    };
    getReservations();
    const revertMyReservation = (reservation) => {
      revertReservation(reservation).then(() => {
        message.success("撤销成功");
        getReservations();
      });
    };
    const columns = getColumns(revertMyReservation);
    return {
      columns,
      reservations,
    };
  },
  components: {
    NDataTable,
  },
};
</script>