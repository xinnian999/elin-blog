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
      <Form v-model="values" :schema="schema" :schemaId="schemaId" ref="form" />
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
import { useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'
import Form from './Form.vue'
const form = useTemplateRef('form')

defineProps<{
  width?: number | string
  title?: string
  schemaId?: String
  schema?: FormSchema
  loading?: boolean
}>()

const visible = defineModel<boolean>('visible')

const values = defineModel<Record<string, any>>('values')

const emits = defineEmits(['onOk'])

const handleOk = async () => {
  await form.value?.validate()

  emits('onOk', values.value)
}
</script>

<style lang="less">
.formContent {
  padding: 20px;
}
</style>
