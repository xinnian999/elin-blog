import { request } from '@/utils'

export default {
  fetch: (params: Record<string, any>) => request.get('/comment/rootList', { params }),
  delete: (params: Record<string, any>) => request.delete('/comment', { params }),
}
