<template>
  <div class="header-container">
    <h2>HIT实验室设备管理系统</h2>
    <div class="welcome">
      <img src="../assets/logo-small.png" />
      <n-dropdown
        trigger="hover"
        placement="bottom-start"
        :options="options"
        @select="handleSelect"
      >
        <span>
          你好！{{ user && user.display_name }} &gt;&nbsp;&nbsp;
        </span>
      </n-dropdown>
    </div>
  </div>
</template>

<script>
import { NButton, NDropdown } from "naive-ui";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { whoAmI, logout } from "@/api/auth";
import { useStore } from "vuex";
const options = [
  {
    label: "个人中心",
    key: "personal center",
  },
  {
    label: "登出",
    key: "logout",
  },
];
export default defineComponent({
  setup(props) {
    const store = useStore();
    const router = useRouter();
    let user = ref(store.getters.getUser);
    const getUserInfo = async () => {
      const res = await whoAmI();
      store.commit("changeUser", res.Data.User);
      user.value = res.Data.User;
    };
    if (user.value === null) {
      getUserInfo();
    }
    function handleSelect(key) {
      if (key === "logout") {
        logout().then(() => {
          store.commit("changeUser", null);
          user.value = null;
          router.push("/login");
        });
      } else if (key === "personal center") {
        router.push("/profile");
      }
    }
    return {
      user,
      options,
      handleSelect,
    };
  },
  components: {
    NButton,
    NDropdown,
  },
});
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  width: 100%;
  height: 8vh;
  padding: 1vh 1vw;
  line-height: 8vh;
  vertical-align: middle;
  border-bottom: 1px solid #666666;
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
