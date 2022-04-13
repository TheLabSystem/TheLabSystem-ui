<template>
  <div class="device-header clearfix">
    <h3>设备管理</h3>
    <div class="func-bar" v-if="userType === 255">
      <n-button
        round
        secondary
        size="small"
        @click="addNewDevice"
        type="success"
      >
        增加新设备
      </n-button>
      <n-button
        round
        secondary
        size="small"
        @click="deleteSelectedDevice"
        type="error"
      >
        删除选中设备
      </n-button>
      <n-button
        round
        secondary
        size="small"
        @click="updateSelectedDevice"
        type="warning"
      >
        修改选中设备状态
      </n-button>
    </div>
  </div>
  <n-scrollbar style="max-height: 82vh">
    <n-menu :options="allDevice" accordion :on-update:value="selectDevice">
    </n-menu>
  </n-scrollbar>
</template>

<script>
import { defineComponent, h, reactive, toRefs } from 'vue'
import {
  NMenu,
  NIcon,
  NButton,
  useDialog,
  NInput,
  NSelect,
  NInputNumber,
  useMessage,
  NScrollbar,
} from 'naive-ui'
import {
  getDevice,
  addDevice,
  deleteDevice,
  updateDevice,
} from '@/api/device.js'
import {
  DeviceMeetingRoomRemote16Regular as DeviceIcon,
  ClipboardError24Regular as DeviceUnavailable,
} from '@vicons/fluent'
import { LoadBalancerClassic as DeviceClass } from '@vicons/carbon'
import { DeviceDesktopOff as DeviceDamage } from '@vicons/tabler'
import { useStore } from 'vuex'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export default defineComponent({
  setup() {
    const store = useStore()
    const events = reactive({
      allDevice: [],
      selectedId: -1,
      infoDisabled: false,
      deviceTypeId: null,
      deviceInfo: '',
      deviceStatus: 0,
      userType: !!store.getters.getUser && store.getters.getUser['user-type'],
    })
    const dialog = useDialog()
    const message = useMessage()
    const getAllDevice = async function () {
      events.allDevice = []
      let res = await getDevice()
      res.Data.devices.forEach((cur, index, array) => {
        let type_id = cur.info.DeviceTypeID
        if (!array.some((v, i) => i < index && v.info.DeviceTypeID == type_id))
          events.allDevice.push({
            label: `Type：${cur.info.DeviceInfo}—Type_id：${cur.info.DeviceTypeID}`,
            key: cur.info.DeviceTypeID,
            icon: renderIcon(DeviceClass),
            children: cur.devices.map((cur, index) => {
              return {
                label: `No.${index} 设备id：${cur.DeviceID}—设备状态：${
                  cur.DeviceStatus == 2
                    ? '设备可用'
                    : cur.DeviceStatus == 1
                    ? '设备不可用'
                    : '设备已损坏'
                }`,
                key: cur.DeviceID,
                icon: renderIcon(
                  cur.DeviceStatus == 2
                    ? DeviceIcon
                    : cur.DeviceStatus == 1
                    ? DeviceUnavailable
                    : DeviceDamage
                ),
              }
            }),
          })
      })
    }
    function selectDevice(key) {
      events.selectedId = parseInt(key)
    }
    function generateDialog(add) {
      store.commit('changeDevice', {
        type_id: events.deviceTypeId,
        info: events.deviceInfo,
        status: events.deviceStatus,
        money: 0,
      })
      let type_id = events.deviceTypeId,
        status = events.deviceStatus,
        device_number = 1,
        device_money = null
      dialog.success({
        title: `请${add ? '输入' : '修改'}设备的类型id${
          add ? '以及描述' : '或者状态'
        }`,
        content: () =>
          h('div', {}, [
            h(NInputNumber, {
              placeholder: '在这里输入类型id',
              style: 'margin:10px 0;',
              'default-value': type_id,
              'v-model:value': type_id,
              'on-update:value': (value) => {
                if (
                  !events.allDevice.some((v) => {
                    if (v.key == value) {
                      events.infoDisabled = true
                      events.deviceInfo = v.label.split('：')[1].split('—')[0]
                      store.commit('changeDevice', {
                        info: v.label.split('：')[1].split('—')[0],
                      })
                      return true
                    }
                  })
                ) {
                  events.infoDisabled = false
                  store.commit('changeDevice', {
                    info: '',
                  })
                }
                store.commit('changeDevice', {
                  type_id: value,
                })
              },
            }),
            add
              ? h(NInputNumber, {
                  placeholder: '在这里输入要添加的设备数量',
                  style: 'margin:10px 0;',
                  'default-value': 1,
                  'v-model:value': device_money,
                  'on-update:value': (value) => {
                    store.commit('changeDevice', {
                      num: value,
                    })
                  },
                })
              : '',
            add
              ? h(NInputNumber, {
                  placeholder: events.infoDisabled
                    ? '设备类型已存在'
                    : '在这里输入要添加的设备价格',
                  disabled: events.infoDisabled,
                  style: 'margin:10px 0;',
                  'v-model:value': events.infoDisabled
                    ? '设备类型已存在'
                    : device_number,
                  'on-update:value': (value) => {
                    store.commit('changeDevice', {
                      money: value,
                    })
                  },
                })
              : '',
            add
              ? h(NInput, {
                  type: 'textarea',
                  placeholder: events.infoDisabled
                    ? events.deviceInfo
                    : '在这里输入设备描述，若该种设备已经存在，则不必填写此项',
                  disabled: events.infoDisabled,
                  'default-value': events.deviceInfo,
                  'v-model:value': events.deviceInfo,
                  'on-update:value': (value) => {
                    store.commit('changeDevice', {
                      info: value,
                    })
                  },
                })
              : h(NSelect, {
                  'default-value': status,
                  'v-model:value': status,
                  options: [
                    {
                      label: '设备可用',
                      value: 2,
                    },
                    {
                      label: '设备不可用',
                      value: 1,
                    },
                    {
                      label: '设备已损坏',
                      value: -1,
                    },
                  ],
                  'on-update:value': (value) => {
                    store.commit('changeDevice', {
                      status: value,
                    })
                  },
                }),
          ]),
        positiveText: add ? '添加' : '修改',
        negativeText: '取消',
        onPositiveClick: async () => {
          if (!store.state.deviceTypeId || !store.state.deviceInfo) {
            message.error('设备的类型id或描述不能为空！')
            return
          }
          let res = null
          if (add) {
            let allPromise = []
            for (let i = 0; i < store.state.deviceNumber; i++) {
              allPromise.push(
                addDevice({
                  device_id: 1,
                  device_type_id: store.state.deviceTypeId,
                  device_info: store.state.deviceInfo,
                  money: store.state.deviceMoney,
                })
              )
            }
            res = await Promise.all(allPromise)
            res = res[0]
          } else {
            res = await updateDevice({
              device_id: events.selectedId,
              device_type_id: store.state.deviceTypeId,
              device_status: store.state.deviceStatus,
            })
          }
          if (res.Code == 0) {
            message.success(`${add ? '添加' : '修改'}成功！`)
            getAllDevice()
          }
          store.commit('changeDevice', {
            type_id: -1,
            info: '',
            status: 0,
            num: 1,
            money: 0,
          })
        },
        onNegativeClick: () => {
          store.commit('changeDevice', {
            type_id: -1,
            info: '',
            status: 0,
            num: 1,
            money: 0,
          })
        },
      })
      events.deviceInfo = ''
      events.deviceStatus = 0
      events.deviceTypeId = null
    }
    function addNewDevice() {
      generateDialog(true)
      events.selectedId = -1
    }
    async function deleteSelectedDevice() {
      if (events.selectedId === -1) {
        message.warning('请先选择一个设备')
        return
      }
      const res = await deleteDevice({
        device_id: events.selectedId,
      })
      if (res.Code == 0) {
        message.success('删除成功！')
        getAllDevice()
      }
    }
    function updateSelectedDevice() {
      if (events.selectedId === -1) {
        message.warning('请先选择一个设备')
        return
      }
      events.allDevice.some((value) => {
        value.children.some((val) => {
          if (val.key === events.selectedId) {
            events.deviceTypeId = parseInt(value.key)
            if (val.label.split('：')[2] == '设备可用') {
              events.deviceStatus = 2
            } else if (val.label.split('：')[2] == '设备不可用') {
              events.deviceStatus = 1
            } else if (val.label.split('：')[2] == '设备已损坏') {
              events.deviceStatus = -1
            }
            events.deviceInfo = val.label.split('：')[1].split('—')[0]
            return true
          }
        })
      })
      generateDialog(false)
    }
    getAllDevice()
    return {
      ...toRefs(events),
      addNewDevice,
      selectDevice,
      deleteSelectedDevice,
      updateSelectedDevice,
    }
  },
  components: {
    NMenu,
    NButton,
    NScrollbar,
  },
})
</script>

<style lang="scss" scoped>
.device-header {
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
