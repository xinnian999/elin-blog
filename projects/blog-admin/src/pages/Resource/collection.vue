<template>
  <TablePlus table="collection" :columns="columns" :formData="formData" />
</template>

<script setup lang="jsx">
import { globalConfig } from "@/utils";

const columns = [
  {
    title: "配图",
    dataIndex: "picture",
    width: 200,
    render: (record) => (
      <ElImage
        preview-src-list={[record.picture]}
        preview-teleported
        src={`${globalConfig.remoteStaticUrl}/image/${record.picture}`}
        style={{ height: "100px" }}
      />
    ),
  },
  {
    title: "名称",
    dataIndex: "title",
  },
  {
    title: "介绍",
    dataIndex: "autograph",
  },
  {
    title: "链接",
    dataIndex: "link",
    render: (record) => (
      <el-link type="primary" href={record.link} target="_blank">
        {record.link}
      </el-link>
    ),
  },
];

const formData = [
  {
    label: "名称",
    value: "title",
    component: "input",
  },
  {
    label: "简介",
    value: "autograph",
    component: "textarea",
  },
  {
    label: "配图",
    value: "picture",
    component: "uploadPicture",
    uploadName: "image",
  },
  {
    label: "链接",
    value: "link",
    component: "textarea",
  },
];
</script>
