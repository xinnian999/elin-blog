<template>
  <TablePlus
    :columns="columns"
    :rowActions="moreAction"
    table="user"
    :formData="formData"
    :defaultSort="{ prop: 'id', order: 'descending' }"
    ref="tableRef"
  />
</template>

<script setup lang="jsx">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { handleDelete } from "@/utils";

const tableRef = ref();

const columns = [
  {
    title: "头像",
    dataIndex: "headPicture",
    fixed: "left",
    width: 100,
    render: (record) => (
      <el-image src={record.headPicture} style="width: 50px; height: 50px" />
    ),
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "角色",
    dataIndex: "power",
    render: (record) => {
      if (record.power === 2) return "超级管理员";
      return "普通用户";
    },
  },
];

const moreAction = [
  {
    status: "danger",
    title: "删除",
    handle: (record) => {
      if (record.power !== 2) {
        return handleDelete("/user/delete", record.id, tableRef);
      }
      return ElMessage.warning("无权限");
    },
  },
];

const formData = [
  {
    label: "头像",
    value: "headPicture",
    component: "uploadPicture",
    uploadName: "image",
  },
  {
    label: "用户名",
    value: "username",
    component: "input",
    required: true,
  },
  {
    label: "角色",
    value: "power",
    component: "select",
    defaultValue: "weizhi",
    config: {
      mode: "static",
      label: "name",
      value: "value",
    },
    selectData: [
      { name: "普通用户", value: 0 },
      { name: "超级管理员", value: 2 },
    ],
  },
];
</script>
