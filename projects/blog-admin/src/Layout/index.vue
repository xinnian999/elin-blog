<template>
  <el-container id="layout" v-if="globalStore.loginStatus">
    <el-aside :width="globalStore.isCollapse ? '64px' : '250px'" id="sidebar">
      <el-menu :default-active="route.path" class="menus" :collapse="globalStore.isCollapse">
        <div class="logoBar">
          <div class="logo" v-show="!globalStore.isCollapse">Elin's Blog Admin</div>

          <el-button :icon="globalStore.isCollapse ? Right : Back" @click="toggleCollapse" text>
          </el-button>
        </div>

        <el-menu-item
          v-for="item in menus"
          :key="item.path"
          :index="item.path"
          @click="onMenuClick(item)"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header id="header">
        <div class="header-tabs">
          <el-tag
            v-for="item in globalStore.cacheMenus"
            closable
            size="large"
            class="tab"
            :key="item.path"
            :effect="route.path === item.path ? 'dark' : 'light'"
            @close="onTabClose(item)"
            @click="onMenuClick(item)"
            >{{ item.title }}</el-tag
          >
        </div>
      </el-header>
      <el-main id="main"> <router-view></router-view></el-main>
    </el-container>
  </el-container>

  <!-- 如果未登陆就全屏渲染登陆页 -->
  <router-view v-else />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Back, Right } from '@element-plus/icons-vue'
import { useGlobalStore } from '@/stores/global'
import routeList from '@/router/list'
import type { RouteItem } from '@/global'

const route = useRoute()
const router = useRouter()

const globalStore = useGlobalStore()

const menus = routeList.filter((item) => item.title)

const toolbarBtn = [
  {
    name: '前往博客首页',
    icon: 'icon-home',
    event: () => window.open('https://www.hyl999.co'),
  },

  {
    name: '退出登陆',
    icon: 'icon-tuichu',
    event: () => {
      router.push({ path: '/login', query: { auth: 0 } })
      globalStore.setLoginStatus(false)
    },
  },
]

const toggleCollapse = () => {
  globalStore.setIsCollapse(!globalStore.isCollapse)
}

const onMenuClick = (data: RouteItem) => {
  globalStore.addCacheMenus(data)
  router.push(data.path)
}

const onTabClose = (data: RouteItem) => {
  globalStore.reduceCacheMenus(data)
}
</script>

<style lang="less">
#layout {
  height: 100%;
  padding: 15px;
  display: flex;
  gap: 20px;

  #sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: width 0.5s;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    border-radius: 4px;

    .menus {
      height: 100%;
      overflow: auto;
      border: none;

      .logoBar {
        display: flex;
        position: relative;
        padding: 10px;
        background-color: #fcfcfc;
        justify-content: space-between;
        align-items: center;

        .logo {
          font-weight: bold;
          font-size: 20px;
          color: rgb(64, 158, 255);
        }
      }

      .menu-icon {
        font-size: 18px;
        // margin-right: 15px;
      }
      .menu-title {
        margin-left: 10px;
      }

      .menu-child-title {
        margin-left: 5px;
        font-size: 13px;
      }

      .signOut {
        margin-bottom: 25px;
        position: absolute;
        bottom: 0;
        left: 25%;
      }

      .logoBarBack {
        &:hover {
          background-color: var(--el-menu-hover-bg-color);
          cursor: pointer;
        }
        .back {
          height: 56px;
          width: 100%;
        }
      }
    }

    .main {
      padding: 0;
    }
  }

  #header {
    padding: 0;
    display: flex;
    height: auto;

    .header-tabs {
      display: flex;
      gap: 20px;
      padding-top: 10px;
      padding-bottom: 15px;

      .tab{
        cursor: pointer;
      }
    }
  }

  #main {
    padding: 0;
  }
}
</style>
