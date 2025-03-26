<template>
  <el-dialog
    :center="true"
    v-model="modelVisible"
    :title="title"
    :width="width"
    top="5vh"
    custom-class="dialogForm"
    :append-to-body="true"
    destroy-on-close
  >
    <schema-form
      v-if="schema"
      v-model="formValues"
      :schema="schema"
      ref="formRef"
    />

    <remote-schema-form
      v-else
      v-model="formValues"
      :schemaId="schemaId"
      ref="formRef"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleOk">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="jsx">
import { ref, defineProps, computed, defineEmits } from "vue";

const formRef = ref();

const props = defineProps({
  width: {},
  title: {},
  currentRecord: {},
  visible: {},
  schemaId: String,
  modelValue: Object,
  schema: Object,
});

const emit = defineEmits(["update:modelValue", "onSave", "update:visible"]);

const formValues = computed({
  get() {
    return props.modelValue;
  },
  set(values) {
    emit("update:modelValue", values);
  },
});

const modelVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emit("update:visible", val);
  },
});

const handleOk = async () => {
  const values = await formRef.value.submit();

  emit("onSave", values);
};
</script>

<style lang="less">
.avatar-uploader .avatar {
  width: 278px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 178px;
  text-align: center;
}

.md-title {
  font-size: 20px;
  font-weight: bold;
  flex: 1;
  text-indent: 2em;
}
</style>
