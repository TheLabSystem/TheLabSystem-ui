<template>
  <NCard title="设备预约" style="width: 98%; margin: 10px 1%; min-height: 85%;">
    <NTabs type="line" animated>
      <NTabPane name="查看设备" tab="查看设备">
        <AllReservation />
      </NTabPane>
      <NTabPane name="我的预约" tab="我的预约">
        <MyReservation />
      </NTabPane>
    </NTabs>
  </NCard>
</template>
<script>
import { NTabs, NTabPane, NCard } from 'naive-ui';
import AllReservation from './components/AllReservation.vue';
import MyReservation from './components/MyReservation.vue';

export default {
  setup() {
    
  },
  components: {
    NTabs,
    NTabPane,
    NCard,
    AllReservation,
    MyReservation,
  },
}
</script>
<style>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>