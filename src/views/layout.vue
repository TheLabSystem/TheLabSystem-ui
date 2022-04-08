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
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>

<script>
import { h, defineComponent, reactive, toRefs } from 'vue'
import { NLayout, NLayoutSider, NIcon, NMenu } from 'naive-ui'
import Header from '../components/header.vue'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions0 = [
  // 设备管理员可用功能
  {
    label: '借用申请审批',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: '可借用设备查询',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
  },
  {
    label: '记录设备状态',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
  },
  {
    label: '借用资格核查',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
  },
  {
    label: '管理计划查看',
    key: 'dan1',
    icon: renderIcon(BookIcon),
  },
]

const menuOptions = [
  //实验室负责人
  {
    label: '借用申请审批',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: '可借用设备查询',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
  },
  {
    label: '管理计划制定',
    key: 'h1231234',
    icon: renderIcon(BookIcon),
  },
  {
    label: '设备管理',
    key: 'pi12313213',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '设备采购',
        key: 'shebeicaigou',
        icon: renderIcon(BookIcon),
      },
      {
        label: '设备报废',
        key: 'h888',
        icon: renderIcon(BookIcon),
      },
    ],
  },
]

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
