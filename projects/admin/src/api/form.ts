import { request } from '@/utils'

export default {
  fetch: (params: Record<string, any>) => request.get('/form', { params }),
  create: (data: Record<string, any>) => request.post('/form', data),
  update: (data: Record<string, any>) => request.put('/form', data),
  delete: (params: Record<string, any>) => request.delete('/form', { params }),
  fetchOne: (params: Record<string, any>) =>
    request.get(`/form/${params.id}`) as Promise<Record<string, any>>,
}
