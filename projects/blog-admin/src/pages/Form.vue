<template>
  <TablePlus
    :columns="columns"
    :rowActions="rowActions"
    :batchActions="batchActions"
    :api="formApi.fetchList"
    @onClickAdd="onClickAdd"
    ref="table"
  />

  <FormModal
    v-model:visible="formState.visible"
    v-model:values="formState.values"
    :schema="formState.schema"
    width="90vw"
    :title="formState.title"
    :loading="formState.loading"
    @onOk="formState.onOk"
  >
    <el-form-item label="表单" labelPosition="top">
      <FormDesign class="design" v-model="formState.values.schema" />
    </el-form-item>
  </FormModal>
</template>

<script setup lang="tsx">
import formApi from '@/api/form'
import { FormModal, TablePlus } from '@/components'
import type { TablePlusBatchActions, TablePlusColumns, TablePlusRowActions } from '@/global'
import { useRequest } from '@/use'
import { formatTime } from '@/utils'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const table = useTemplateRef('table')

const columns = [
  {
    label: '表单id',
    prop: 'id',
    sortable: true,
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
] satisfies TablePlusColumns

const formState = reactive({
  visible: false,
  values: {
    name: '',
    schema: { items: [] },
  },
  title: '新增表单',
  loading: false,
  onOk: () => {},
  schema: {
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
  } satisfies FormSchema,
})

const createFormRequest = useRequest(formApi.create)

const updateFormRequest = useRequest(formApi.update)

const onClickAdd = () => {
  Object.assign(formState, {
    title: '新增表单',
    visible: true,
    values: {
      name: '',
      schema: { items: [] },
    },
    loading: createFormRequest.loading,
    onOk: async () => {
      await createFormRequest.run({
        name: formState.values.name,
        schema: JSON.stringify(formState.values.schema),
      })
      ElMessage.success('新增表单成功！')
      formState.visible = false
      table.value?.refresh()
    },
  })
}

const rowActions = [
  {
    name: '修改',
    type: 'primary',
    icon: Edit,
    onClick: (data: Record<string, any>) => {
      Object.assign(formState, {
        title: '修改表单',
        visible: true,
        values: {
          name: data.name,
          schema: JSON.parse(data.schema),
        },
        loading: updateFormRequest.loading,
        onOk: async () => {
          await updateFormRequest.run({
            id: data.id,
            name: formState.values.name,
            schema: JSON.stringify(formState.values.schema),
          }),
            ElMessage.success('修改表单成功！')
          formState.visible = false
          table.value?.refresh()
        },
      })
    },
  },
  {
    name: '删除',
    type: 'danger',
    icon: Delete,
    onClick: async (data: Record<string, any>) => {
      await ElMessageBox.confirm('确认删除吗？')
      await formApi.deleteForm({ ids: data.id })
      ElMessage.success('删除成功！')
      table.value?.refresh()
    },
  },
] satisfies TablePlusRowActions

const batchActions = [
  {
    name: '删除',
    type: 'danger',
    icon: Delete,
    onClick:async ({keys}) => {
      await ElMessageBox.confirm('确认删除吗？')
      await formApi.deleteForm({ ids: keys })
      ElMessage.success('删除成功！')
      table.value?.refresh()
    },
  },
] satisfies TablePlusBatchActions
</script>

<style lang="scss">
.design {
  width: 100%;
  height: 70vh;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
