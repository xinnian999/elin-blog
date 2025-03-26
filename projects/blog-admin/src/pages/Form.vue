<template>
  <TablePlus
    :columns="columns"
    :api="{
      path: '/form',
    }"
    @onClickAdd="onClickAdd"
    ref="table"
  />

  <FormModal
    v-model:visible="formVisible"
    v-model:values="formValues"
    :schema
    :width="500"
    title="新增表单"
    :loading="createFormApi.loading"
    @onOk="onOk"
  />
</template>

<script setup lang="tsx">
import formApi from '@/api/form'
import { FormModal, TablePlus } from '@/components'
import type { TablePlusColumns } from '@/global'
import { useRequest } from '@/use'
import { formatTime } from '@/utils'
import { ElMessage } from 'element-plus'
import { ref, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const table = useTemplateRef('table')

const columns = [
  {
    label: '表单id',
    prop: 'id',
  },
  {
    label: '表单名称',
    prop: 'name',
  },
  {
    label: '创建时间',
    prop: 'created_at',
    formatter(row, column, cellValue, index) {
      return formatTime(cellValue)
    },
  },
  {
    label: '最后更新时间',
    prop: 'updated_at',
    formatter(row, column, cellValue, index) {
      return formatTime(cellValue)
    },
  },
  {
    label: '操作',
    prop: 'actions',
    formatter(row, column, cellValue, index) {
      return (
        <el-space>
          <el-button type="primary" size="small">
            表单设计
          </el-button>
          <el-button type="danger" size="small">
            删除
          </el-button>
        </el-space>
      )
    },
  },
] satisfies TablePlusColumns

const schema = {
  labelWidth: 150,
  labelAlign: 'top',
  size: 'default',
  items: [
    {
      label: '表单名称',
      component: 'Input',
      props: {
        placeholder: '请输入...',
      },
      name: 'name',
      required: true,
    },
  ],
} satisfies FormSchema

const formVisible = ref(false)

const formValues = ref({
  name: '',
})

const createFormApi = useRequest(() =>
  formApi.create({
    name: formValues.value.name,
    schema: JSON.stringify({}),
  }),
)

const onClickAdd = () => {
  formVisible.value = true
  formValues.value = {
    name: '',
  }
}

const onOk = async () => {
  await createFormApi.run()
  ElMessage.success('新增表单成功！')
  formVisible.value = false
  table.value?.refresh()
}
</script>
