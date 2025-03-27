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
import type { TablePlusColumns } from '@/global'
import { useRequest } from '@/use'
import { formatTime } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, onDeactivated, onMounted, onUnmounted, reactive, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'

defineOptions({
  name: 'Form',
})

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
    formatter(row) {
      return (
        <el-space>
          <el-button type="primary" size="small" onClick={() => onClickEdit(row)}>
            修改
          </el-button>
          <el-button type="danger" size="small" onClick={() => onClickDelete(row)}>
            删除
          </el-button>
        </el-space>
      )
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

const onClickEdit = (data: Record<string, any>) => {
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
}

const onClickDelete = async (data: Record<string, any>) => {
  await ElMessageBox.confirm('确认删除吗？')
  await formApi.deleteForm({ id: data.id })
  ElMessage.success('删除成功！')
  table.value?.refresh()
}

onMounted(() => {
  console.log('🚀 组件首次加载');
});

onActivated(() => {
  console.log('✅ 组件被 KeepAlive 缓存并重新激活');
});

onDeactivated(() => {
  console.log('❌ 组件被 KeepAlive 缓存，但暂时失活');
});

onUnmounted(() => {
  console.log('💀 组件被彻底销毁');
});
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
