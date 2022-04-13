<template>
  <NCard
    title="验证码管理"
    style="width: 98%; margin: 10px 1%; min-height: 85%"
  >
    <NSpace vertical>
      <NSpace>
        <NInput
          v-model:value="verifyCode"
          type="text"
          placeholder="输入验证码"
        ></NInput>
        <div style="width: 150px">
          <NSelect
            v-model:value="userType"
            :options="options"
            placeholder="选择用户类型"
          />
        </div>
        <NButton @click="addCode" type="primary"> 添加 </NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="code" />
    </NSpace>
  </NCard>
</template>
<script>
import {
  NCard,
  NDataTable,
  NButton,
  NSpace,
  NInput,
  NSelect,
  useMessage,
} from "naive-ui";
import { ref, h } from "vue";
import { getPermName } from "@/utils/perm";
import {
  viewAllVerifyCode,
  addVerifyCode,
  deleteVerifyCode,
} from "@/api/verify";

const options = [
  { label: "1.外来人员", value: 1 },
  { label: "2.学生", value: 2 },
  { label: "3.老师", value: 3 },
  { label: "4.设备管理员", value: 4 },
  { label: "5.财务处", value: 5 },
  { label: "255.实验室负责人", value: 255 },
];

const getColumns = (deleteCode) => [
  {
    title: "验证码身份",
    render(row) {
      return getPermName(row.UserType);
    },
  },
  {
    title: "验证码值",
    key: "VerifyCode",
  },
  {
    title: "操作",
    render: (row) =>
      h(
        NButton,
        {
          type: "error",
          onClick: () => deleteCode(row.VerifyCode),
        },
        { default: () => "删除" }
      ),
  },
];
export default {
  setup() {
    const message = useMessage();
    const code = ref([]);
    const verifyCode = ref();
    const userType = ref();
    const getCode = async () => {
      const res = await viewAllVerifyCode();
      code.value = res.Data.verify_codes;
    };
    const deleteCode = async (vcode) => {
      await deleteVerifyCode(Number(vcode));
      message.success("删除成功");
      getCode();
    };
    const addCode = async () => {
      if (userType.value == null || verifyCode.value == null) {
        message.warning("请输入合法数据");
        return;
      }
      await addVerifyCode(Number(verifyCode.value), userType.value);
      message.success("添加成功");
      getCode();
    };
    getCode();
    const columns = getColumns(deleteCode);
    return {
      columns,
      code,
      addCode,
      verifyCode,
      options,
      userType,
    };
  },
  components: {
    NCard,
    NDataTable,
    NInput,
    NSpace,
    NButton,
    NSelect,
  },
};
</script>