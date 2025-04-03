import { request } from '@/utils'

export default {
  fetch: (params: Record<string, any>) => request.get('/link', { params }),
  create: (data: Record<string, any>) => request.post('/link', data),
  update: (data: Record<string, any>) => request.put('/link', data),
  delete: (params: Record<string, any>) => request.delete('/link', { params }),
  pass: (data: Record<string, any>) => request.put('/link/pass', data),
  refuse: (data: Record<string, any>) => request.put('/link/refuse', data),
}
