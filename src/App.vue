<template>
  <n-message-provider>
    <login></login>
  </n-message-provider>
</template>

<script>
import { NMessageProvider } from 'naive-ui'
import mainView from '@/view/mainView.vue'
import login from '@/view/login.vue'
export default {
  setup() {},
  components: {
    NMessageProvider,
    mainView,
    login,
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
a {
  color: #000;
  text-decoration: none;
}
a:hover {
  color: #18a058;
}
</style>
