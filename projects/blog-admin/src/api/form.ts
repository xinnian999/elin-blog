import { request } from '@/utils'

const fetchList = (params: Record<string, any>) => {
  return request.get('/form', { params })
}

const create = (params: Record<string, any>) => {
  return request.post('/form', params)
}

const update = (params: Record<string, any>) => {
  return request.put('/form', params)
}

const deleteForm = (params: Record<string, any>) => {
  return request.delete('/form', { params })
}

export default {
  fetchList,
  create,
  update,
  deleteForm,
}
