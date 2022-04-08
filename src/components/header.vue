<template>
  <div class="header-container">
    <h2>xxx实验室设备管理系统</h2>
    <div class="welcome">
      <img src="../assets/logo-small.png" />
      <span
        >你好！{{ user ? user.user_type + '-' + user.display_name : '' }}</span
      >
      <n-dropdown
        trigger="hover"
        placement="bottom-start"
        :options="options"
        @select="handleSelect"
      >
        &gt;
      </n-dropdown>
    </div>
  </div>
</template>

<script>
import { NButton, NDropdown } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
const options = [
  {
    label: '个人中心',
    key: 'personal center',
  },
  {
    label: '登出',
    key: 'logout',
  },
]
export default defineComponent({
  setup(props) {
    const user = ref(useStore())
    function handleSelect(key) {
      alert(key)
    }
    return {
      user,
      options,
      handleSelect,
    }
  },
  components: {
    NButton,
    NDropdown,
  },
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
