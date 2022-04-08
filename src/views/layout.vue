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
        :inverted="inverted"
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
import { h, defineComponent, reactive, toRefs } from 'vue'
import { NLayout, NLayoutSider, NIcon, NMenu } from 'naive-ui'
import router from '@/router'
import Header from '../components/header.vue'
import { BookOutline as BookIcon } from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// const menuOptions = [
//   {
//     label: '且听风吟',
//     key: 'hear-the-wind-sing',
//     icon: renderIcon(BookIcon),
//   },
// ]
const getMenuOptions = () => {
  const routes = router.getRoutes()
  const userPerm = 255 // TODO: get user perm from vuex
  const options = routes.reduce((prev, curr) => {
    if (curr.meta.perm && userPerm >= curr.meta.perm) {
      prev.push({
        label: curr.name,
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
    })
    function toggleCollapsed() {
      events.collapsed = !events.collapsed
    }
    return {
      ...toRefs(events),
      toggleCollapsed,
      menuOptions: getMenuOptions(),
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
