import { request } from '@/utils'

export default {
  fetch: (params: Record<string, any>) => request.get('/article', { params }),
  create: (data: Record<string, any>) => request.post('/article', data),
  update: (data: Record<string, any>) => request.put('/article', data),
  delete: (params: Record<string, any>) => request.delete('/article', { params }),
  fetchOne: (params: Record<string, any>) => request.get(`/article/${params.id}`),
}
