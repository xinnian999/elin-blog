<template>
  <div id="Menu">
    <div class="list">
      <div class="topBar">
        <el-input v-model="q" placeholder="搜索菜单" @change="handleSearch" />
        <el-button type="primary" @click="handleAddFirst"
          >新增一级菜单</el-button
        >
      </div>
      <el-tree
        :data="MenuListData"
        @node-click="handleNodeClick"
        :render-content="renderContent"
        :props="{ class: 'menu-item', label: 'title' }"
        node-key="title"
        ref="treeRef"
        highlight-current
        :current-node-key="currentData.title"
      />
    </div>

    <div class="detail">
      <template v-if="Object.keys(currentData).length">
        <div class="info">
          <h4 class="title">基本信息</h4>

          <remote-schema-form
            schemaId="5"
            v-model="currentFormValues"
            :disabled="!isEdit"
            ref="formRef"
            style="width: 600px"
          />

          <el-button v-if="!isEdit" type="primary" @click="isEdit = true"
            >编辑</el-button
          >
          <el-button v-if="isEdit" @click="handleCancel">取消</el-button>
          <el-button v-if="isEdit" type="primary" @click="handleEditSave"
            >保存</el-button
          >
          <el-button type="danger" @click="handleDelete">删除</el-button>
        </div>

        <div class="children" v-if="!currentData.parentId">
          <h4 class="title">子菜单</h4>
          <ul class="childMenus">
            <li
              v-for="child in currentData.children"
              class="child"
              @click="handleNodeClick(child)"
            >
              <svg-icon :name="child.icon" /> {{ child.title }}
            </li>
            <li>
              <el-button type="primary" @click="handleAddChild"
                ><template #icon><svg-icon name="add" /></template>
                新增</el-button
              >
            </li>
          </ul>
        </div>
      </template>
    </div>

    <form-modal
      v-model:visible="modalState.visible"
      v-model="addFormValues"
      :title="modalState.title"
      schemaId="5"
      @onSave="onAddSave"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref, onBeforeMount, reactive } from "vue";
import { ElMessage } from "element-plus";
import { request } from "@/utils";
import { pickBy } from "lodash";

const modalState = reactive({ visible: false, title: "" });

const MenuListData = ref([]);

const addFormValues = ref({});

const currentData = ref({});

const currentFormValues = ref({});

const formRef = ref();

const treeRef = ref();

const q = ref("");

const isEdit = ref(false);

const getMenuListData = async () => {
  const { data } = await request({ url: "/menu/query" });
  MenuListData.value = data;
};

onBeforeMount(() => {
  getMenuListData();
});

const handleNodeClick = (data) => {
  currentData.value = data;
  currentFormValues.value = { ...data };
  treeRef.value.setCurrentKey(data.title, true);
};

const handleAddFirst = () => {
  modalState.visible = true;
  modalState.title = "新增一级菜单";
};

const handleAddChild = () => {
  modalState.visible = true;
  modalState.title = `新增【${currentData.value.title}】的子菜单`;
  addFormValues.value = { path: currentData.value.path };
};

const onAddSave = async (values) => {
  const data = pickBy(values, Boolean);

  if (currentData.value.id) {
    data.parentId = currentData.value.id;
  }

  const { status } = await request({
    url: "/current/add/menu",
    method: "POST",
    data,
  });
  if (status === 0) {
    modalState.visible = false;
    getMenuListData();
  }
};

const handleCancel = () => {
  currentFormValues.value = { ...currentData.value };
  isEdit.value = false;
};

const handleEditSave = async () => {
  const values = await formRef.value.submit();
  const { status } = await request({
    url: "/current/update/menu",
    method: "PUT",
    data: pickBy(values, Boolean),
  });
  if (status === 0) {
    getMenuListData();
    currentData.value = values;
    isEdit.value = false;
    ElMessage.success("修改成功");
  }
};

const handleDelete = async () => {
  const { status } = await request({
    url: "/current/delete/menu",
    method: "DELETE",
    params: { id: currentData.value.id },
  });
  if (status === 0) {
    getMenuListData();
    isEdit.value = false;
    currentData.value = {};
    ElMessage.success("删除成功");
  }
};

const getIndex = (id, list) => list.findIndex((item) => item.id === id);

const handleMove = async (type) => {
  const sourceId = currentData.value.id;

  let list = MenuListData.value;

  if (currentData.value.parentId) {
    list = MenuListData.value.find(
      (item) => item.id === currentData.value.parentId
    )?.children;
  }

  const index = getIndex(sourceId, list);

  const targetId = list[type === "top" ? index - 1 : index + 1]?.id;

  if (!targetId) return;

  const { status } = await request({
    url: "/menu/sort",
    method: "PUT",
    data: { sourceId, targetId },
  });

  if (status === 0) {
    getMenuListData();
  }
};

const renderContent = (h, { node, data }) => {
  let list = MenuListData.value;

  if (currentData.value.parentId) {
    list = MenuListData.value.find(
      (item) => item.id === currentData.value.parentId
    )?.children;
  }

  const index = getIndex(data.id, list);

  return (
    <div class="list-item">
      <div class="list-item-ico">
        <svg-icon name={data.icon} />{" "}
      </div>
      <span>{data.title}</span>
      {currentData.value.title === data.title && (
        <div class="move">
          <div
            class="list-item-ico"
            style={{ display: index === 0 ? "none" : "" }}
            onClick={() => handleMove("top")}
          >
            <svg-icon name="上移" />
          </div>
          <div
            class="list-item-ico"
            style={{
              display: index === list.length - 1 ? "none" : "",
            }}
            onClick={() => handleMove("down")}
          >
            <svg-icon name="下移" />
          </div>
        </div>
      )}
    </div>
  );
};

const handleSearch = () => {
  if (q.value) {
    const data = treeRef.value.getNode(q.value)?.data;
    if (data) {
      treeRef.value.setCurrentKey(q.value, true);
      currentData.value = { ...data };
    }
  }
};
</script>

<style lang="less">
#Menu {
  display: flex;
  background-color: #fff;
  height: 100%;

  .menu-item {
    --el-tree-node-hover-bg-color: #eee;

    .el-tree-node__content {
      height: 40px;
    }
  }

  .list {
    .topBar {
      display: flex;
      padding: 10px;
      gap: 10px;
    }
    width: 30vw;
    border-right: 1px solid #eee;

    .list-item {
      padding: 15px 0;
      display: flex;
      width: 100%;
      .list-item-ico {
        display: flex;
        align-items: center;
        margin-right: 3px;
      }
      .move {
        margin-left: auto;
        margin-right: 15px;
        display: flex;
        gap: 20px;
        .list-item-ico {
          padding: 0 3px;
          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }

  .detail {
    padding: 30px;
    width: 100%;
    .title {
      border-left: 5px solid #000;
      padding-left: 10px;
      margin-bottom: 20px;
    }

    .children {
      margin-top: 30px;
      .childMenus {
        list-style: none;
        display: flex;
        vertical-align: middle;
        gap: 20px;
        .child {
          line-height: 32px;
          padding: 0 15px;
          font-size: 12px;
          border: 1px solid #b7b2b2;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
            border-color: var(--el-color-primary);
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
