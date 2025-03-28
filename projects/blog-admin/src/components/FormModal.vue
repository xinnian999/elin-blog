<template>
  <el-dialog
    :center="true"
    v-model="visible"
    :title="title"
    :width="width"
    top="5vh"
    custom-class="dialogForm"
    :append-to-body="true"
    destroy-on-close
  >
    <div class="formContent">
      <form-render v-model="values" :schema="formSchema" ref="form" />
      <slot />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleOk" :loading>提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'
import formApi from '@/api/form'

const form = useTemplateRef('form')

const props = defineProps<{
  width?: number | string
  title?: string
  schemaId?: String
  schema?: FormSchema
  loading?: boolean
}>()

const visible = defineModel<boolean>('visible')

const values = defineModel<Record<string, any>>('values')

const emits = defineEmits(['onOk'])

const formSchema = ref<FormSchema>({
  items: [],
})

const handleOk = async () => {
  await form.value?.validate()

  emits('onOk', values.value)
}

onMounted(async () => {
  // 如果传入了schema，则直接使用传入的schema
  if (props.schema) {
    formSchema.value = props.schema
    return
  }

  // 如果传入了schemaId，则从后端获取schema
  if (props.schemaId) {
    const res = await formApi.fetchOne({ id: props.schemaId })

    formSchema.value = JSON.parse(res.data.schema)
    console.log(formSchema.value)
  }
})
</script>

<style lang="less">
.formContent {
  padding: 20px;
}
</style>
