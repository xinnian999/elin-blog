<template>
  <form-render v-model="values" :schema="formSchema" ref="form" v-loading="fetchOneFormRequest.loading" />
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import type { FormSchema } from 'vue-form-craft'
import formApi from '@/api/form'
import { useRequest } from '@/use';

const props = defineProps<{
  schemaId?: String
  schema?: FormSchema
}>()

const values = defineModel<Record<string, any>>()

const form = useTemplateRef('form')

const formSchema = ref<FormSchema>({
  items: [],
})

const fetchOneFormRequest = useRequest(formApi.fetchOne)

onMounted(async () => {
  // 如果传入了schema，则直接使用传入的schema
  if (props.schema) {
    formSchema.value = props.schema
    return
  }

  // 如果传入了schemaId，则从后端获取schema
  if (props.schemaId) {
    const res = await fetchOneFormRequest.run({ id: props.schemaId })

    formSchema.value = JSON.parse(res.schema)
  }
})

defineExpose({
  validate: () => {
    return form.value?.validate()
  },
})
</script>

<style lang="scss">
.formContent {
  padding: 20px;
}
</style>
