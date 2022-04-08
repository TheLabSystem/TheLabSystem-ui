<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>

<script>
import { NMessageProvider } from 'naive-ui'
export default {
  setup() {},
  components: {
    NMessageProvider,
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
