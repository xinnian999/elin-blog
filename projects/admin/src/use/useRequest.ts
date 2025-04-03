import { reactive, ref } from 'vue'

// 封装请求，返回一个Request响应式对象，包含loading状态和请求方法等
// 不可解构，如需解构，请使用toRef
const useRequest = (api: (params: Record<string, any>) => Promise<any>) => {
  const loading = ref(false)

  const run = async (pars: Record<string, any> = {}) => {
    loading.value = true

    try {
      return await api(pars)
    } finally {
      loading.value = false
    }
  }

  return reactive({ loading, run })
}

export default useRequest
