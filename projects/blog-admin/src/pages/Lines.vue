<template>
  <TablePlus table="linesDB" :columns="columns" :formData="formData" />
</template>

<script setup lang="jsx">
const columns = [
  {
    title: "名字",
    dataIndex: "name",
  },
  {
    title: "句子",
    dataIndex: "content",
  },
  {
    title: "配图",
    dataIndex: "picture",
  },
];

const formData = [
  {
    label: "名字",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "台词",
    value: "content",
    component: "textarea",
    required: true,
  },
  {
    label: "配图",
    value: "picture",
    required: true,
    component: "uploadPicture",
    uploadName: "image",
  },
];
</script>
