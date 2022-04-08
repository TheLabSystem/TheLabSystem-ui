<template>
  <n-message-provider>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </n-message-provider>
</template>

<script>
import { NMessageProvider, NDialogProvider } from 'naive-ui'
export default {
  setup() {},
  components: {
    NMessageProvider,
    NDialogProvider,
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
