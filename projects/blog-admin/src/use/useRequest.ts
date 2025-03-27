import { ref } from 'vue'

const useRequest = (api: (params: Record<string, any>) => Promise<any>) => {
  const loading = ref(false)

  const run = async (pars: Record<string, any> = {}) => {
    loading.value = true

    await api(pars)

    loading.value = false
  }

  return { loading, run }
}

export default useRequest
