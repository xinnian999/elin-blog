import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteItem } from '@/global'

export const useStore = defineStore(
  'globalStore',
  () => {
    const isCollapse = ref(false)

    const cacheMenus = ref<RouteItem[]>([])

    const currentMenu = ref<RouteItem>()

    const setIsCollapse = (val: boolean) => {
      isCollapse.value = val
    }

    const addCacheMenus = (data: RouteItem) => {
      if (!data) return

      if (data.path === '/login') return

      if (cacheMenus.value.some((item) => item.path === data.path)) return

      cacheMenus.value.push(data)
    }

    const reduceCacheMenus = (data: RouteItem) => {
      cacheMenus.value = cacheMenus.value.filter((item) => item.path !== data.path)
    }

    return {
      isCollapse,
      cacheMenus,
      currentMenu,
      setIsCollapse,
      addCacheMenus,
      reduceCacheMenus,
    }
  },
  {
    persist: {
      pick: ['loginStatus', 'isCollapse'],
    },
  },
)
