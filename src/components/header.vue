<template>
  <div class="header-container">
    <n-breadcrumb>
      <n-breadcrumb-item href="#/home"> 首页 </n-breadcrumb-item>
      <n-breadcrumb-item href="#/home"> 首页 </n-breadcrumb-item>
      <n-breadcrumb-item href="#/home"> 首页 </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<script>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    return {}
  },
  components: {
    NBreadcrumb,
    NBreadcrumbItem,
  },
})
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 8vh;
  margin: 1vh 1vw;
  line-height: 8vh;
  vertical-align: bottom;
  > * {
    display: inline-block;
  }
  .n-icon {
    height: 8vh;
  }
  .n-breadcrumb {
    margin: 0 2vh;
  }
}
</style>
