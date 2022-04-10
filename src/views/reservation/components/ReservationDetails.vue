<template>
  <div>
    {{ name }}
  </div>
</template>
<script>
import { ref } from 'vue';
import { getReservationDetails } from '@/api/reservation';

// 2022-04-10
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const id = props.info.DeviceID;
    const date = ref(new Date());
    const details = ref([]);
    const getDetails = async () => {
      const res = await getReservationDetails(formatDate(date.value), id);
      console.log(res);
      details.value = res.Data.nums;
    };
    getDetails();
    return {
      name: props.info.DeviceInfo,
      details,
    }
  },
}
</script>