<template>
  <NCard title="预约审批" style="width: 98%; margin: 10px 1%; min-height: 85%;">
    <NDataTable :columns="columns" :data="approvals" />
  </NCard>
</template>
<script>
import { NCard, NDataTable, NButton, useDialog, useMessage } from 'naive-ui';
import { getApproval, setApproval } from '@/api/approval';
import ApprovalDetails from './components/ApprovalDetail';
import { ref, h } from 'vue';

const getColumns = ({showApprovalDetails, acceptApproval, rejectApproval}) => [
  {
    title: "设备名称",
  },
  {
    title: "预约数量",
  },
  {
    title: "预约时间",
  },
  {
    title: "预约人",
  },
  {
    title: "状态",
    filterOptions: [
      {
        label: '已审批',
        value: 'London',
      },
      {
        label: '未审批',
        value: 'New York',
      },
    ],
    filter (value, row) {
      return 1;
    }
  },
  {
    title: "操作",
    render: (row) => {
      return h('div', {}, [
        h(NButton, {
          type: "info",
          onClick: () => showApprovalDetails(row),
        }, { default: "详情" }),
        // TODO: 已审批的不用按钮
        h(NButton, {
          type: "success",
          onClick: () => acceptApproval(row.ReservationID),
        }, { default: "通过" }),
        h(NButton, {
          type: "error",
          onClick: () => rejectApproval(row.ReservationID),
        }, { default: "拒绝" }),
      ]);
    }
  },
];
export default {
  setup() {
    const dialog = useDialog();
    const message = useMessage();
    const approvals = ref([]);
    const showApprovalDetails = (row) => {
      const dialogOptions = {
        title: "预约申请详情",
        content: () => h(ApprovalDetails, {
          info: row,
        }),
      };
      dialog.show(dialogOptions);
    };
    const getAllApproval = async () => {
      getApproval(1).then(res => {
        approvals.value = res.Data.Approval;
      });
    };
    const acceptApproval = (id) => {
      setApproval(id, 1).then(() => {
        message.success("操作成功");
        getAllApproval();
      });
    };
    const rejectApproval = (id) => {
      setApproval(id, 2).then(() => {
        message.success("操作成功");
        getAllApproval();
      });
    };
    getAllApproval();
    const columns = getColumns({
      showApprovalDetails,
      acceptApproval,
      rejectApproval,
    });
    return {
      approvals,
      columns,
      dialog,
    };
  },
  components: {
    NCard,
    NDataTable
  },
}
</script>