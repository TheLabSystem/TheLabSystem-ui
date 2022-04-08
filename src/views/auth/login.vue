<template>
  <div class="container">
    <n-card class="login" title="欢迎使用xx实验室设备预约系统！">
      <n-tabs size="large" animated>
        <!-- 登陆部分开始 -->
        <n-tab-pane name="signin" tab="登录">
          <n-input
            size="large"
            clearable
            round
            class="form-component"
            placeholder="请输入用户名"
            v-model:value="user_name"
          >
            <template #prefix>
              <n-icon :component="UserCircle"> </n-icon>
            </template>
          </n-input>
          <n-input
            size="large"
            type="password"
            clearable
            round
            show-password-on="click"
            class="form-component"
            placeholder="请输入密码"
            v-model:value="password"
          >
            <template #prefix>
              <n-icon :component="Password"> </n-icon>
            </template>
          </n-input>
          <n-button
            type="primary"
            size="large"
            round
            block
            secondary
            strong
            @click="login(false)"
          >
            登录
          </n-button>
          <div class="more-operations">
            <a href="#">忘记密码？</a>
          </div>
        </n-tab-pane>
        <!-- 登陆部分结束 -->

        <!-- 注册部分开始 -->
        <n-tab-pane name="signup" tab="注册">
          <n-input
            size="large"
            clearable
            round
            class="form-component"
            placeholder="请输入用户名"
            v-model:value="user_name"
          >
            <template #prefix>
              <n-icon :component="UserCircle"> </n-icon>
            </template>
          </n-input>
          <n-input
            size="large"
            type="password"
            clearable
            round
            show-password-on="click"
            class="form-component"
            placeholder="请输入密码"
            v-model:value="password"
          >
            <template #prefix>
              <n-icon :component="Password"> </n-icon>
            </template>
          </n-input>
          <n-input
            size="large"
            clearable
            round
            class="form-component"
            placeholder="请输入要注册的用户类型"
            v-model:value="user_type"
          >
            <template #prefix>
              <n-icon :component="Types"> </n-icon>
            </template>
          </n-input>
          <n-input
            size="large"
            clearable
            round
            class="form-component"
            placeholder="请输入验证码（校外人员不必填写）"
            v-model:value="verify_code"
          >
            <template #prefix>
              <n-icon :component="Verify"> </n-icon>
            </template>
          </n-input>
          <n-button
            type="primary"
            size="large"
            round
            block
            secondary
            strong
            @click="login(true)"
          >
            注册
          </n-button>
        </n-tab-pane>
        <!-- 注册部分结束 -->
      </n-tabs>
    </n-card>
  </div>
</template>

<script>
import {
  NCard,
  NTabs,
  NTabPane,
  NInput,
  NButton,
  NFormItemRow,
  NIcon,
  useMessage,
} from 'naive-ui'
import { NumberRow24Regular as Verify } from '@vicons/fluent'
import { UserCircleRegular as UserCircle } from '@vicons/fa'
import { Password, Types } from '@vicons/carbon'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, toRefs } from 'vue'
import { login as apiLogin } from '@/api/login'

export default {
  setup() {
    const icons = { UserCircle, Password, Types, Verify }
    const message = useMessage()
    const router = useRouter()
    const store = useStore()
    const events = reactive({
      user_name: '',
      password: '',
      user_type: null,
      verify_code: null,
    })
    let msgReactive = null
    function createMessage(type = 'success', info = '', duration = 3000) {
      msgReactive = message.create(info, {
        type: type,
        duration: duration,
      })
    }
    async function login(register = false) {
      if (register) {
        console.log(events.user_type, typeof events.user_type)
        console.log(events.verify_code, typeof events.verify_code)
      }
      if (!events.user_name) {
        createMessage('warning', '请输入用户名')
        return
      } else if (!events.password) {
        createMessage('warning', '请输入密码')
        return
      }
      if (register && !events.user_type) {
        createMessage('warning', '请输入用户类型')
        return
      }
      if (register && events.user_type != 1 && !events.verify_code) {
        createMessage('warning', '非校外人员请输入验证码', 4000)
        return
      }
      createMessage('loading', !register ? '登陆中...' : '注册中...')
      if (!register) {
        const res = await apiLogin({
          username: events.user_name,
          password: events.password,
        })
        if (res.Code == 0) {
          const user = res.Data.User
          msgReactive.type = 'success'
          msgReactive.content = `登陆成功！欢迎，${user.display_name}`
          store.commit('changeUser', user)
          router.push('/')
        } else {
          msgReactive.type = 'error'
          msgReactive.content = res.Data.message
        }
      } else {
      }
    }
    return {
      ...icons,
      ...toRefs(events),
      login,
    }
  },
  components: {
    NCard,
    NTabs,
    NTabPane,
    NInput,
    NButton,
    NFormItemRow,
    NIcon,
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: center / cover
    url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fb579764dfeb722743dd366cd66af9a3956dfffd4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651903096&t=8f0033ffbe9c9f2f2f195420b804904a')
    no-repeat;
  .login {
    position: absolute;
    height: 68.6vh;
    width: 29.2vw;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3vh;
    background-color: rgba(255, 255, 255, 0.92);
    .form-component {
      background-color: transparent;
      width: 92%;
      margin: 1.2vh 4%;
    }
    .n-button {
      width: 92%;
      margin: 1.2vh 4%;
    }
    .more-operations {
      margin: 2vh 0;
    }
  }
}
</style>
