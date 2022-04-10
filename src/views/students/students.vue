<template>
  <NCard title="学生管理" style="width: 98%; margin: 10px 1%; min-height: 85%">
    <NSpace vertical>
      <NSpace>
        <NInput v-model:value="studentId" type="text" placeholder="输入学号" />
        <NButton type="primary" @click="insertStudent(studentId)"
          >添加学生</NButton
        >
      </NSpace>
      <NDataTable :columns="columns" :data="students" />
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
  useMessage,
} from "naive-ui";
import { viewStudent, deleteStudent, addStudent } from "@/api/student";
import { ref, h } from "vue";

const getColumns = (removeStudent) => [
  {
    title: "学号",
    key: "user_id",
  },
  {
    title: "姓名",
    key: "display_name",
  },
  {
    title: "操作",
    render(row) {
      return h(
        NButton,
        {
          type: "error",
          onClick: () => removeStudent(row.user_id),
        },
        { default: () => "删除" }
      );
    },
  },
];
export default {
  setup() {
    const students = ref([]);
    const getStudents = async () => {
      const res = await viewStudent();
      students.value = res.Data.users;
    };
    const removeStudent = (id) => {
      deleteStudent(id).then(() => {
        message.error("删除成功");
        getStudents();
      });
    };
    const insertStudent = (id) => {
      addStudent(id).then(async () => {
        message.success("添加成功");
        getStudents();
      });
    };
    getStudents();
    const message = useMessage();
    return {
      columns: getColumns(removeStudent),
      insertStudent,
      students,
      studentId: ref(null),
    };
  },
  components: {
    NCard,
    NDataTable,
    NButton,
    NSpace,
    NInput,
  },
};
</script>