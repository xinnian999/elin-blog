<template>
  <div id="filterInput">
    <div class="ico">
      <svg-icon icon="search" />
    </div>
    <div class="filterTags" v-if="filterTags.length">
      <el-space>
        <el-tag
          v-for="{ label, value, q } in filterTags"
          :key="value"
          closable
          @close="closeFilter(value)"
        >
          {{ label }}:{{ q }}
        </el-tag>
      </el-space>
    </div>
    <div class="input" @click="openSearchDropdown">
      <el-dropdown
        ref="searchDropdownRef"
        trigger="contextmenu"
        placement="bottom-start"
        style="width: 100%"
      >
        <el-input
          v-model="searchQ"
          placeholder="请输入搜索关键词"
          @keyup.enter="handleSearch"
          clearable
          @focus="openSearchDropdown"
          ref="searchInputRef"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :key="item.value"
              @click="handleSelectSearchType(item)"
              v-for="item in filterOptions"
              >{{ item.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { omit } from "lodash";

const props = defineProps({
  modelValue: Object, //数据源，双向绑定
  options: { default: () => [], type: Array }, //下拉提示字段数据
});

const searchInputRef = ref(null);

const searchDropdownRef = ref(null);

const searchQ = ref("");

const emit = defineEmits(["update:modelValue"]);

const filterOptions = computed(() => {
  const filterTagsKeys = filterTags.value.map((item) => item.value);

  return props.options.filter((item) => !filterTagsKeys.includes(item.value));
});

const filterTags = computed(() => {
  const { modelValue, options } = props;

  return options
    .map((item) => ({
      ...item,
      q: modelValue[item.value],
    }))
    .filter((item) => !!item.q);
});

const handleSearch = () => {
  const [label, q] = searchQ.value.split(":");

  if (q) {
    const type = filterOptions.value.find(
      (item) => item.label === label
    )?.value;
    emit("update:modelValue", { ...props.modelValue, [type]: q });
  } else {
    ElMessage.error("输入不合法");
  }

  searchQ.value = "";
};

const handleSelectSearchType = (item) => {
  searchQ.value = item.label + ":";
  searchInputRef.value.focus();
};

const closeFilter = (key) => {
  emit("update:modelValue", omit(props.modelValue, [key]));
};

const openSearchDropdown = () => {
  if (!searchQ.value) {
    searchDropdownRef.value.handleOpen();
  }
};
</script>

<style lang="less">
#filterInput {
  margin-bottom: 10px;
  display: flex;
  flex: 1;
  padding: 2px 0;
  border-radius: 5px;
  color: #606266;

  box-sizing: border-box;
  background-color: #f5f7fa;
  box-shadow: 0 0 0 1px #e4e7ed inset;
  .ico {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #606266;
  }
  .filterTags {
    display: flex;
  }

  .searchLabel {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input {
    position: relative;
    flex: 1;
  }
  .el-input__wrapper {
    box-shadow: none;
    background-color: transparent;
    padding-left: 0;
  }
}
</style>
