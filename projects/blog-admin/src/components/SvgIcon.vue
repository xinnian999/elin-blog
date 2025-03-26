<template>
  <svg class="svg-icon">
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  name: String,
});
</script>
<style lang="less" scoped>
//这里可以自定义一些样式，例如：
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
