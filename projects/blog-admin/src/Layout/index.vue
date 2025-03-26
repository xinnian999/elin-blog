<template>
  <el-container id="layout" v-if="globalStore.loginStatus">
    <el-aside :width="globalStore.isCollapse ? '64px' : '250px'" id="side">
      <el-menu
        :router="true"
        :default-active="route.path"
        class="menu"
        :collapse="globalStore.isCollapse"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
      >
        <div :class="`${globalStore.isCollapse ? 'logoBarBack' : 'logoBar'}`">
          <div class="logoBox">
            <el-tag class="logo" type="warning" v-if="!globalStore.isCollapse"
              >Elin's Blog 后台管理系统</el-tag
            >
          </div>
        </div>
        <el-menu-item v-for="item in menus" :key="item.title" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header id="header">
        <el-button :icon="globalStore.isCollapse ? Right : Back" @click="toggleCollapse" />
        <el-space class="headToolbar" :size="20">
          <el-tooltip
            v-for="{ name, icon, event } in toolbarBtn"
            class="box-item"
            effect="dark"
            :content="name"
            placement="bottom"
            :key="name"
          >
            <span class="headerBtn" @click="event">
              <i :class="`iconfont ${icon}`"></i>
            </span>
          </el-tooltip>
        </el-space>
      </el-header>
      <el-main id="main">
        <router-view></router-view>
      </el-main>
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
</script>

<style lang="less">
@import '//at.alicdn.com/t/c/font_3569918_ek26kxlmkqw.css';

#layout {
  height: 100%;

  #side {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: width 0.5s;
    // background-color: #545c64;
    .menu {
      height: 100%;
      padding-top: 10px;
      overflow: auto;
      color: #fff;
      .back {
        color: #fff;
        cursor: pointer;
        &:hover {
          color: rgb(248, 82, 82);
        }
      }
      .logoBar {
        display: flex;
        height: 56px;
        position: relative;

        .logoBox {
          margin: auto;
        }

        .logo {
          padding: 15px 10px;
          margin: auto;
          font-weight: bold;
          font-size: 14px;
        }
        .back {
          position: absolute;
          top: 50%;
          margin-top: -8px;
          right: 18px;
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
  }
  #header {
    position: relative;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 40%);
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    #title {
      position: absolute;
      left: 30px;
      line-height: 50px;
    }
    .headerBtn {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background-color: rgb(224, 219, 219);
        box-shadow: 0 0 10px rgb(0 0 0 / 80%);
      }
      .iconfont {
        font-size: 20px;
      }
    }
  }
  #main {
    padding: 15px;
    height: 100%;
  }
}
</style>
