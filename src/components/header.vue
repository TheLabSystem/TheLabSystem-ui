<template>
  <div class="header-container">
    <h2>xxx实验室设备管理系统</h2>
    <div class="welcome">
      <img src="../assets/logo-small.png" />
      <span>你好！身份-姓名</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    return {}
  },
  components: {},
})
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  width: 100%;
  height: 8vh;
  margin: 1vh 1vw;
  line-height: 8vh;
  vertical-align: middle;
  > * {
    display: inline-block;
  }
  .welcome {
    position: absolute;
    right: 4vh;
    img {
      position: absolute;
      top: 1vh;
      left: -7vh;
      height: 6vh;
      width: 6vh;
      border-radius: 50%;
    }
  }
}
</style>
