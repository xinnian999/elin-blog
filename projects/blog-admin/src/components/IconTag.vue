<template>
  <div id="icon-tag">
    <div class="icon">
      <el-icon>
        <VNode :content="icon" />
      </el-icon>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { defineProps } from "vue";
defineProps({
  icon: {},
});
</script>

<style lang="less" scoped>
#icon-tag {
  display: inline-flex;
  color: #c41d7f;
  background: #fff0f6;
  line-height: 20px;
  font-size: 12px;
  border-radius: 4px;
  padding: 0 5px;
  .icon {
    position: relative;
    top: 1px;
  }
  .content {
    margin-left: 5px;
  }
}
</style>
>
