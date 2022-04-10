<template>
  <div>
    <NSpace vertical>
      <h3> 选择预约时间 </h3>
      <Row>
        <Col span="13" offset="5">
          <NSpace>
            <NButton
              :disabled="offsetDay === 0"
              @click="changeDate(-1)"
            > &lt; </NButton>
            <NInput
              :value="formatDate(date)"
              autosize
            />
            <NButton
              :disabled="offsetDay === 7"
              @click="changeDate(1)"
            > &gt; </NButton>
          </NSpace>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <NSpace>
            <NButton
              v-for="(num, index) in details"
              :key="index"
              :type="timeSelected == index ? 'primary' : 'default'"
              @click="selectTime(index)"
              :disabled="!num"
            >
              {{ `${(index * 2).toString().padStart(2, '0')}:00 - ${((index + 1) * 2).toString().padStart(2, '0')}:00` }}
              {{ `可用: ${num} 台` }}
            </NButton>
          </NSpace>
        </Col>
      </Row>
      <Row>
        <Col span="12" offset="12">
          <NSpace>
            <NInput
              v-model:value="needNums"
              placeholder="输入台数"
              style="width: 90px"
            />
            <NButton @click="submitMyReservation" type="primary">
              确认预约
            </NButton>
          </NSpace>
        </Col>
      </Row>
    </NSpace>
  </div>
</template>
<script>
import { ref } from 'vue';
import { getReservationDetails, submitReservation } from '@/api/reservation';
import { useMessage, NGrid, NGridItem, NSpace, NButton, NInput } from 'naive-ui';
import { formatDate } from '@/utils/date';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    Row: NGrid,
    Col: NGridItem,
    NSpace,
    NButton,
    NInput,
  },
  setup(props) {
    const id = props.id;
    const timeSelected = ref(-1);
    const needNums = ref();
    const selectTime = (index) => {
      timeSelected.value = index;
    };
    const message = useMessage();
    const date = ref(new Date());
    date.value = new Date(date.value.getTime() + 24 * 60 * 60 * 1000);
    const details = ref([]);
    const offsetDay = ref(0);
    const getDetails = async () => {
      console.log(id);
      const res = await getReservationDetails(formatDate(date.value), id);
      console.log(res);
      details.value = res.Data.nums;
    };
    const changeDate = (d) => {
      offsetDay.value = offsetDay.value + d;
      date.value = new Date(date.value.getTime() + d * 24 * 60 * 60 * 1000);
      getDetails();
    };
    const submitMyReservation = () => {
      if (timeSelected.value < 0 || timeSelected.value >= details.value.length) {
        message.error('请选择预约时间');
        return;
      } else if (!needNums.value || needNums.value <= 0 || needNums.value > details.value[timeSelected]) {
        message.error('请输入合法预约台数');
        return;
      } else {
        console.log(props);
        submitReservation({
          deviceType: id,
          day: formatDate(date.value),
          time: Number(timeSelected.value),
          num: Number(needNums.value),
        }).then((res) => {
          console.log(res);
          message.success('预约成功');
          getDetails();
        });
      }
    }
    getDetails();
    return {
      offsetDay,
      details,
      date,
      changeDate,
      formatDate,
      needNums,
      nowDate: new Date(),
      timeSelected,
      selectTime,
      submitMyReservation,
    };
  },
}
</script>