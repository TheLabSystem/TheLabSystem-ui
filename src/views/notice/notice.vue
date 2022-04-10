<template>
  <div class="notice-header clearfix">
    <h3>通知公告</h3>
    <!-- 这里要改成具有权限的用户才能进行操作 -->
    <div class="func-bar" v-if="true">
      <n-button
        round
        secondary
        size="small"
        @click="addNewNotice"
        type="success"
      >
        增加新通知
      </n-button>
      <n-button
        round
        secondary
        size="small"
        @click="deleteSelectedNotice"
        type="error"
      >
        删除选中通知
      </n-button>
      <n-button
        round
        secondary
        size="small"
        @click="updateSelectedNotice"
        type="warning"
      >
        修改选中通知
      </n-button>
    </div>
  </div>
  <n-scrollbar style="max-height: 83vh">
    <n-menu :options="allNotice" accordion :on-update:value="selectNotice">
    </n-menu>
  </n-scrollbar>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      :title="'Title:' + title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      {{ content }}
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, h, reactive, toRefs } from 'vue'
import {
  NMenu,
  NIcon,
  NButton,
  useDialog,
  NInput,
  useMessage,
  NScrollbar,
  NModal,
  NCard,
} from 'naive-ui'
import {
  getNotice,
  addNotice,
  deleteNotice,
  updateNotice,
} from '@/api/notice.js'
import { FishOutline as FishIcon } from '@vicons/ionicons5'
import { useStore } from 'vuex'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
export default defineComponent({
  setup() {
    const events = reactive({
      allNotice: [],
      selectedId: '',
      showModal: false,
      title: '',
      content,
    })
    const dialog = useDialog()
    const message = useMessage()
    const store = useStore()
    const getAllNotice = async function () {
      let res = await getNotice()
      events.allNotice = res.Data.Notice.map((cur, index) => {
        return {
          label: `No.${index} Title：${cur.Title}`,
          key: cur.NoticeID,
          icon: renderIcon(FishIcon),
          children: [{ label: cur.Content, key: cur.NoticeID }],
        }
      })
      events.allNotice.reverse()
    }
    function selectNotice(key) {
      events.selectedId = key
      events.allNotice.some((value) => {
        if (value.key == events.selectedId) {
          events.title = value.label.split('：')[1]
          events.content = value.children[0].label
          return true
        }
      })
      events.showModal = true
    }
    function generateDialog(add, title, content) {
      store.commit('changeNotice', {
        title,
        content,
      })
      dialog.success({
        title: `请${add ? '输入' : '修改'}通知的标题${add ? '和' : '或'}内容`,
        content: () =>
          h('div', {}, [
            h(NInput, {
              type: 'text',
              placeholder: '在这里输入通知标题',
              style: 'margin:10px 0;',
              'default-value': title,
              'v-model:value': title,
              'on-update:value': (value) => {
                store.commit('changeNotice', {
                  title: value,
                })
              },
            }),
            h(NInput, {
              type: 'textarea',
              placeholder: '在这里输入通知正文',
              'default-value': content,
              'v-model:value': content,
              'on-update:value': (value) => {
                store.commit('changeNotice', {
                  content: value,
                })
              },
            }),
          ]),
        positiveText: add ? '发布' : '修改',
        negativeText: '取消',
        onPositiveClick: async () => {
          if (!store.state.noticeTitle || !store.state.noticeContent) {
            message.error('标题或者内容不能为空！')
            return
          }
          let res = null
          if (add) {
            res = await addNotice({
              Title:
                store.state.noticeTitle +
                '：发布者：' +
                store.getters.getUser.display_name,
              Content: store.state.noticeContent,
            })
          } else {
            res = await updateNotice({
              ID: parseInt(events.selectedId),
              Title:
                store.state.noticeTitle +
                '：发布者：' +
                store.getters.getUser.display_name,
              Content: store.state.noticeContent,
            })
          }
          if (res.Code == 0) {
            message.success(`${add ? '发布' : '修改'}成功！`)
            getAllNotice()
          }
          store.commit('changeNotice', { title: '', content: '' })
        },
      })
    }
    function addNewNotice() {
      let title = ''
      let content = ''
      generateDialog(true, title, content)
    }
    async function deleteSelectedNotice() {
      if (events.selectedId === '') {
        message.warning('请先选择一条通知')
        return
      }
      const res = await deleteNotice({ ID: parseInt(events.selectedId) })
      if (res.Code == 0) {
        message.success('删除成功！')
        getAllNotice()
      }
    }
    function updateSelectedNotice() {
      if (events.selectedId === '') {
        message.warning('请先选择一条通知')
        return
      }
      let title = '',
        content = ''
      events.allNotice.some((value) => {
        if (value.key == events.selectedId) {
          title = value.label.split('：')[1]
          content = value.children[0].label
          return true
        }
      })
      generateDialog(false, title, content)
    }
    getAllNotice()
    return {
      ...toRefs(events),
      addNewNotice,
      selectNotice,
      deleteSelectedNotice,
      updateSelectedNotice,
    }
  },
  components: {
    NMenu,
    NButton,
    NScrollbar,
    NModal,
    NCard,
  },
})
</script>

<style lang="scss" scoped>
.notice-header {
  > * {
    padding: 1vh 1vw;
  }
  h3 {
    float: left;
  }
  .func-bar {
    float: right;
    .n-button {
      margin: 0 1vh;
    }
  }
}
</style>
