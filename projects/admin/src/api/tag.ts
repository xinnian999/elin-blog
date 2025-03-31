import { request } from '@/utils'

export default {
  fetch: (params: Record<string, any>) => request.get('/tag', { params }),
  create: (data: Record<string, any>) => request.post('/tag', data),
  update: (data: Record<string, any>) => request.put('/tag', data),
  delete: (params: Record<string, any>) => request.delete('/tag', { params }),
}
