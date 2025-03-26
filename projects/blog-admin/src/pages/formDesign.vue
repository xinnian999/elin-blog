<template>
  <div class="form-design">
    <form-design :schema="route.query.formId" @onSave="onSave" />
  </div>
</template>

<script setup lang="jsx">
import { useRoute } from 'vue-router'
import { request } from '@/utils'
import { ElMessage } from 'element-plus'

const route = useRoute()

const onSave = async (schema) => {
  // if (!route.query.formId) {
  //   return ElMessage.error(`未指定表单id`);
  // }
  // await request({
  //   url: "/current/update/form",
  //   method: "put",
  //   data: {
  //     id: route.query.formId,
  //     formSchema: JSON.stringify(schema),
  //   },
  // });
  // ElMessage.success(`保存成功`);
}
</script>

<style>
.form-design{
  background-color: #fff;
  padding: 15px;
  height: 100%;
  overflow: hidden;
}
</style>