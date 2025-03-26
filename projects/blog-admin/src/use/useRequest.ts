import { reactive, ref } from 'vue'

const useRequest = (api: () => Promise<any>) => {
  const loading = ref(false)
  const run = async () => {
    loading.value = true

    await api()

    loading.value = false
  }

  return reactive({ loading, run })
}

export default useRequest
