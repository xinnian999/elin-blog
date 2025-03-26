import { request } from '@/utils'

const fetch = async () => {
  return
}

const create = (params: Record<string, any>) => {
  return request.post('/form', params)
}

export default {
  fetch,
  create,
}
