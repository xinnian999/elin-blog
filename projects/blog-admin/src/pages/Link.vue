<template>
  <TablePlus table="link" :columns="columns" :formData="formData" />
</template>

<script setup lang="jsx">
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "简介",
    dataIndex: "descr",
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
  {
    title: "图标",
    dataIndex: "avator",
    render: (record) => (
      <el-link type="primary" href={record.avator} target="_blank">
        {record.avator}
      </el-link>
    ),
  },
];

// const avatorReg = /\u56fe\u6807|\u5934\u50cf|avatar/;
// const nameReg = /\u540d\u79f0|name/;
// const linkReg = /\u94fe\u63a5|\u5730\u5740|\u7f51\u5740|link/;
// const descrReg = /\u63cf\u8ff0|\u7b80\u4ecb|descr/;

const formData = [
  // {
  //   label: "导入",
  //   value: "import",
  //   component: "textarea",
  //   placeholder: "输入友链信息，脱离焦点后自动识别导入",
  //   // blur: () => {
  //   //   const form = formRef.value.form;
  //   //   let f = "：";
  //   //   form.import.split("\n").forEach((item) => {
  //   //     const [label, value] = item.split(f);

  //   //     // 判断用的中英文冒号
  //   //     if (item.search(f) === -1) {
  //   //       f = ": ";
  //   //     }

  //   //     avatorReg.test(label) && (form.avator = value);
  //   //     nameReg.test(label) && (form.name = value);
  //   //     linkReg.test(label) && (form.link = value);
  //   //     descrReg.test(label) && (form.descr = value);
  //   //   });
  //   // },
  // },
  {
    label: "名字",
    value: "name",
    component: "input",
    required: true,
  },
  {
    label: "简介",
    value: "descr",
    component: "textarea",
    required: true,
  },
  {
    label: "链接",
    value: "link",
    component: "input",
    required: true,
  },
  {
    label: "图标",
    value: "avator",
    component: "input",
    required: true,
  },
];
</script>
