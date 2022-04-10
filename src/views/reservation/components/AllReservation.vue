<template>
  <div>
    <NDataTable :columns="columns" :data="devices" />
  </div>
</template>
<script>
import { NDataTable, useDialog, NButton } from "naive-ui";
import { h, ref } from "vue";
import ReservationDetails from "./ReservationDetails.vue";
import { getDevices } from "@/api/reservation";

const getColumns = (showDetails) => [
  {
    title: "设备名称",
    key: "DeviceInfo",
  },
  {
    title: "操作",
    render(row) {
      return h(
        NButton,
        {
          type: "primary",
          onClick: () => showDetails(row),
        },
        { default: () => "预约" }
      );
    },
  },
];
const getDialogOptions = (device) => {
  return {
    title: "设备预约 - " + device.DeviceInfo,
    content: () => h(ReservationDetails, {
      id: device.DeviceID,
    }),
  }
};
export default {
  setup() {
    const dialog = useDialog();
    // Dialog.create(dialogOptions);
    const devices = ref([]);
    const getDeviceInfo = async () => {
      const res = await getDevices();
      // console.log(res);
      devices.value = res.Data.devices.reduce((acc, device) => {
        if (!acc.some(item => item.DeviceID === device.DeviceID)) {
          acc.push(device.info);
        }
        return acc;
      }, []);
    };
    getDeviceInfo();
    const showDetails = (device) => {
      dialog.create(getDialogOptions(device));
    };
    const columns = getColumns(showDetails);
    return {
      columns,
      devices,
    };
  },
  components: {
    NDataTable,
  },
};
</script>