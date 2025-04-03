<template>
  <el-container id="layout" v-if="store.loginStatus">
    <el-aside :width="store.isCollapse ? '64px' : '250px'" id="sidebar">
      <el-menu :default-active="route.path" class="menus" :collapse="store.isCollapse">
        <div class="logoBar">
          <div class="logo" v-show="!store.isCollapse">Elin's Blog Admin</div>

          <el-button :icon="store.isCollapse ? Expand : Fold" @click="toggleCollapse" text>
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
            v-for="item in store.cacheMenus"
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

        <el-button-group class="ml-4">
          <el-tooltip
            v-for="{ message, icon, onClick } in toolbarBtns"
            :content="message"
            placement="top"
          >
            <el-button :icon="icon" @click="onClick" />
          </el-tooltip>
        </el-button-group>
      </el-header>

      <el-main id="main">
        <router-view v-slot="{ Component }">
          <KeepAlive :include="cached" :max="10">
            <component :is="Component" />
          </KeepAlive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>

  <!-- 如果未登陆就全屏渲染登陆页 -->
  <router-view v-else />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Expand, Fold, Monitor, SwitchButton, FullScreen } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import routeList from '@/router/list'
import type { RouteItem } from '@/global'
import { computed, watch } from 'vue'
import Cookies from 'js-cookie'

const route = useRoute()
const router = useRouter()

const store= useStore()

const menus = routeList.filter((item) => item.title)

const cached = computed(() => {
  return store.cacheMenus.filter((item) => item.name).map((item) => item.name) as string[]
})

const toolbarBtns = [
  {
    message: '全屏',
    icon: FullScreen,
    onClick: () => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.documentElement.requestFullscreen()
      }
    },
  },
  {
    message: '前往博客首页',
    icon: Monitor,
    onClick: () => window.open('https://www.hyl999.co'),
  },
  {
    message: '退出登陆',
    icon: SwitchButton,
    onClick: () => {
      router.push({ path: '/login', query: { auth: 0 } })
      store.setLoginStatus(false)
    },
  },
]

const toggleCollapse = () => {
  store.setIsCollapse(!store.isCollapse)
}

const onMenuClick = (data: RouteItem) => {
  router.push(data.path)
}

const onTabClose = (data: RouteItem) => {
  store.reduceCacheMenus(data)

  // 如果关闭的当前页，自动跳转到最后一个缓存页
  if (data.path === route.path) {
    router.push(store.cacheMenus[store.cacheMenus.length - 1].path)
  }
}

watch(route, (newVal) => {
  const currentMenu = routeList.find((item) => item.path === newVal.path)!
  store.addCacheMenus(currentMenu)
})
</script>

<style lang="scss">
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
          white-space: nowrap;
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
    align-items: center;
    padding: 10px 0;
    justify-content: space-between;

    .header-tabs {
      display: flex;
      gap: 20px;

      .tab {
        cursor: pointer;
      }
    }
  }

  #main {
    padding: 0;
  }
}
</style>
