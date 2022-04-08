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
      <h1 style="text-align: center">
        <router-view />
      </h1>
      <h2 style="text-align: right; padding-right: 20px">
        旁边的logo是随便找了张图放上去（bushi
      </h2>
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

const menuOptions = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
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
