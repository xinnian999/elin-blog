<template>
  <TablePlus table="mood" :columns="columns" :formData="formData" />
</template>

<script setup lang="jsx">
const columns = [
  {
    title: "说说",
    dataIndex: "content",
  },
  {
    title: "配图",
    dataIndex: "picture",
  },
  {
    title: "时间",
    dataIndex: "createTime",
    timeParse: true,
  },
];

const formData = [
  {
    label: "说说",
    value: "content",
    component: "textarea",
  },
  {
    label: "配图",
    value: "picture",
    component: "uploadPicture",
    uploadName: "image",
  },
  {
    label: "分类",
    value: "category",
    component: "select",
    defaultValue: "weizhi",
    selectData: [
      { name: "位置", value: "weizhi" },
      { name: "图片", value: "tupian" },
      { name: "视频", value: "shipin" },
    ],
    config: {
      mode: "static",
      label: "name",
      value: "value",
    },
  },
];
</script>
