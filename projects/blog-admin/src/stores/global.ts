import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore(
  'global',
  () => {
    const loginStatus = ref(false)

    const isCollapse = ref(false)

    const setLoginStatus = (val: boolean) => {
      loginStatus.value = val
    }

    const setIsCollapse = (val: boolean) => {
      isCollapse.value = val
    }

    return { loginStatus, setLoginStatus, isCollapse, setIsCollapse }
  },
  {
    persist: true,
  },
)
