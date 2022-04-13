<template>
  <n-scrollbar style="height: 88vh">
    <div class="profile-header clearfix">
      <h3>个人中心</h3>
    </div>
    <table>
      <tr v-for="item in data" :key="item.key" @click="item.handler">
        <td class="prop">{{ item.prop }}</td>
        <td class="item">{{ item.value }}</td>
        <td class="icon">
          <n-icon size="24" :component="item.icon"></n-icon>
        </td>
      </tr>
    </table>
    <div class="profile-header clearfix">
      <h3>我的账单</h3>
    </div>
    <n-data-table :columns="columns" :data="bill" />
  </n-scrollbar>
</template>

<script>
import {
  findUserInfo as apiFindUserInfo,
  addMoney as apiAddmoney,
  changeUserInfo as apiChangeUserInfo,
} from '@/api/user.js'
import { getBill as apiGetBill, payBill as apiPayBill } from '@/api/bill.js'
import { reactive, toRefs, h } from 'vue'
import {
  useMessage,
  NIcon,
  useDialog,
  NInputNumber,
  NInput,
  NDataTable,
  NButton,
  NScrollbar,
} from 'naive-ui'
import { Pencil } from '@vicons/tabler'
import {
  DoNotDisturbAltFilled as NotAllowed,
  AddCircleOutlineOutlined as Add,
} from '@vicons/material'
import { useStore } from 'vuex'
const createColumns = (payBill) => {
  return [
    {
      title: '账单ID',
      key: 'billId',
    },
    {
      title: '账户ID',
      key: 'payerId',
    },
    {
      title: '金额',
      key: 'money',
    },
    {
      title: '支付选项',
      key: 'pay',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            size: 'small',
            disabled: row.statusCode === 1 || row.statusCode === -1,
            onClick: () => payBill(row),
          },
          {
            default: () =>
              row.statusCode === 1
                ? '已支付'
                : row.statusCode === -1
                ? '已取消'
                : '去支付',
          }
        )
      },
    },
  ]
}
export default {
  setup() {
    const events = reactive({
      data: [],
      bill: [],
      password: '',
      columns: createColumns(payBill),
    })
    const message = useMessage()
    const store = useStore()
    const dialog = useDialog()
    function generateAddMoneyDialog() {
      let money = 0
      dialog.success({
        title: '请输入要充值的金额',
        content: () =>
          h(NInputNumber, {
            placeholder: '在这里输入金额',
            style: 'margin:10px 0;',
            'default-value': 0,
            'v-model:value': money,
            'on-update:value': (value) => {
              store.commit('changeUserInfo', { money: value })
            },
          }),
        positiveText: '充值',
        negativeText: '取消',
        onPositiveClick: async () => {
          if (!store.state.addedMoney) {
            message.error('金额不能为空或为0！')
            return
          }
          const res = await apiAddmoney({
            money: store.state.addedMoney,
          })
          if (res.Code == 0) {
            message.success(`充值成功！`)
            findUserInfo()
            store.commit('changeUserInfo', { money: 0 })
          }
        },
        onNegativeClick: () => {
          store.commit('changeUserInfo', { money: 0 })
        },
      })
    }
    function generateChangeInfoDialog() {
      let display_name = events.data[3].value,
        password = events.password,
        user_info = ''
      store.commit('changeUserInfo', {
        name: display_name,
        password: password,
      })
      dialog.success({
        title: '在这里修改昵称以及密码',
        content: () =>
          h('div', {}, [
            h(NInput, {
              placeholder: '在这里输入昵称',
              style: 'margin:10px 0;',
              'default-value': display_name,
              'v-model:value': display_name,
              'on-update:value': (value) => {
                store.commit('changeUserInfo', { name: value })
              },
            }),
            h(NInput, {
              placeholder: '在这里输入密码',
              type: 'password',
              'show-password-on': 'click',
              'default-value': password,
              'v-model:value': password,
              'on-update:value': (value) => {
                store.commit('changeUserInfo', { password: value })
              },
            }),
          ]),
        positiveText: '修改',
        negativeText: '取消',
        onPositiveClick: async () => {
          if (!store.state.newDisplayName || !store.state.newPassword) {
            message.error('修改后的昵称或密码不能为空')
            return
          }
          const res = await apiChangeUserInfo({
            new_password: store.state.newPassword,
            display_name: store.state.newDisplayName,
            user_info: user_info,
          })
          if (res.Code == 0) {
            message.success(`修改成功！`)
            findUserInfo()
            store.commit('changeUserInfo', {
              name: '',
              password: '',
            })
          }
        },
        onNegativeClick: () => {
          store.commit('changeUserInfo', {
            name: '',
            password: '',
          })
        },
      })
    }
    async function findUserInfo() {
      events.data = []
      const res = await apiFindUserInfo({})
      if (res.Code === 0) {
        let userInfo = res.Data.User
        events.data.push({
          key: 0,
          prop: '用户ID',
          value: userInfo.user_id,
          icon: NotAllowed,
          handler() {},
        })
        events.data.push({
          key: 1,
          prop: '用户名',
          value: userInfo.user_name,
          icon: NotAllowed,
          handler() {},
        })
        events.password = userInfo.password
        events.data.push({
          key: 2,
          prop: '用户类型',
          value: '' + userInfo['user-type'],
          icon: NotAllowed,
          handler() {},
        })
        events.data.push({
          key: 3,
          prop: '用户昵称',
          value: userInfo.display_name,
          icon: Pencil,
          handler: generateChangeInfoDialog,
        })
        events.data.push({
          key: 4,
          prop: '用户密码',
          value: '********',
          icon: Pencil,
          handler: generateChangeInfoDialog,
        })
        events.data.push({
          key: 5,
          prop: '账户余额',
          value: '￥' + userInfo.money,
          icon: Add,
          handler: generateAddMoneyDialog,
        })
      } else {
        message.warning('获取用户信息失败，请稍后重试')
      }
    }
    async function getBill() {
      events.bill = []
      const res = await apiGetBill()
      for (const val of res.Data.bills) {
        events.bill.push({
          billId: val.BillID,
          payerId: val.PayerID,
          money: val.Money,
          statusCode: val.BillStatus,
        })
      }
    }
    async function payBill(row) {
      const res = await apiPayBill({
        bill_id: row.billId,
      })
      if (res.Code === 0) {
        message.success('支付成功')
        findUserInfo()
        getBill()
      }
    }
    findUserInfo()
    getBill()
    return {
      ...toRefs(events),
    }
  },
  components: {
    NIcon,
    NDataTable,
    NScrollbar,
  },
}
</script>

<style lang="scss" scoped>
.profile-header {
  > * {
    padding: 1vh 1vw;
  }
  h3 {
    float: left;
  }
}
table {
  width: 66vw;
  margin: 4vh auto;
  border-collapse: collapse;
  cursor: pointer;
  border: 1px solid #efeff5;
  tr {
    height: 40px;
    vertical-align: middle;
    td {
      line-height: 40px;
      display: inline-block;
    }
    .prop {
      padding: 0 12px;
      width: 12%;
      box-sizing: border-box;
    }
    .item {
      width: 80%;
    }
    .icon {
      width: 8%;
      .n-icon {
        position: relative;
        top: 8px;
      }
    }
  }
  tr:hover {
    background-color: #fafafa;
    color: #18a058;
  }
}
.n-data-table {
  width: 66vw;
  margin: 4vh auto;
}
</style>
