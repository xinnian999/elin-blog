<template>
  <TablePlus
    table="form"
    :columns="columns"
    :rowAction="rowAction"
    :schema="schema"
  />
</template>

<script setup lang="ts">
import { Share } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const columns = [
  {
    title: "表单id",
    dataIndex: "id",
  },
  {
    title: "表单名称",
    dataIndex: "name",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    timeParse: true,
    sortable: true,
  },
  {
    title: "最后更新时间",
    dataIndex: "updateTime",
    timeParse: true,
  },
];

const schema = {
  labelWidth: 150,
  labelAlign: "right",
  size: "default",
  items: [
    {
      label: "表单名称",
      component: "Input",
      props: {
        placeholder: "请输入...",
      },
      onlyId: "form-RD3J",
      name: "name",
      required: true,
    },
  ],
};

const rowAction = [
  {
    title: "表单设计",
    type: "info",
    icon: Share,
    onClick: (row) => {
      router.push({ path: "/formDesign", query: { formId: row.id } });
    },
  },
];
</script>
