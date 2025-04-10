import { request } from '@/utils'

export default {
  fetch: () => request.get('/summary/article') as Promise<Record<string, any>>,
}
