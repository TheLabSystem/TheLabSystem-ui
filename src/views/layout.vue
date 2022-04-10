<template>
  <n-layout has-sider id="container">
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
      :inverted="inverted"
      :on-update:collapsed="toggleCollapsed"
    >
      <div :class="collapsed ? 'collapsed-logo' : 'logo'"></div>
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout>
      <Header></Header>
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script>
import { h, defineComponent, reactive, toRefs, ref } from 'vue'
import { NLayout, NLayoutSider, NIcon, NMenu } from 'naive-ui'
import { RouterLink } from 'vue-router'
import router from '@/router'
import Header from '../components/header.vue'
import { BookOutline as BookIcon } from '@vicons/ionicons5'
import { whoAmI } from "@/api/auth";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const getMenuOptions = (userPerm) => {
  const routes = router.getRoutes()
  // userPerm = 255;
  const options = routes.reduce((prev, curr) => {
    if (curr.meta.hasOwnProperty('perm') && userPerm >= curr.meta.perm) {
      if (curr.path === '/students') {
        if (userPerm != 3) {
          return prev;
        }
      }
      prev.push({
        label: () =>
          h(
            RouterLink,
            { to: { path: curr.path } },
            { default: () => curr.name }
          ),
        key: curr.path,
        icon: renderIcon(BookIcon),
      })
    }
    return prev
  }, [])
  return options
}

export default defineComponent({
  setup() {
    const events = reactive({
      collapsed: false,
      inverted: false,
    });
    const menuOptions = ref([]);
    const init = async() => {
      const res = await whoAmI();
      menuOptions.value = getMenuOptions(res.Data.User['user-type']);
    }
    init();
    function toggleCollapsed() {
      events.collapsed = !events.collapsed
    }
    return {
      ...toRefs(events),
      toggleCollapsed,
      menuOptions,
    }
  },
  components: {
    NIcon,
    NLayout,
    NLayoutSider,
    NMenu,
    Header,
  },
})
</script>

<style lang="scss">
#container {
  height: 100vh;
  .logo {
    height: 8vh;
    margin: 1vh 1vw;
    background: center / contain url('../assets/logo.png') no-repeat;
  }
  .collapsed-logo {
    height: 6vh;
    width: 6vh;
    margin: 2vh auto;
    background: center / contain url('../assets/logo-small.png') no-repeat;
  }
}
</style>
