import { request } from '@/utils'

export default {
  fetch: (params: Record<string, any>) => request.get('/category', { params }),
  create: (data: Record<string, any>) => request.post('/category', data),
  update: (data: Record<string, any>) => request.put('/category', data),
  delete: (params: Record<string, any>) => request.delete('/category', { params }),
}
