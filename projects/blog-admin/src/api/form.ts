import { request } from '@/utils'

const fetchOne = (params: Record<string, any>) => {
  return request.get(`/form/${params.id}`)
}

const fetchList = (params: Record<string, any>) => {
  return request.get('/form', { params })
}

const create = (data: Record<string, any>) => {
  return request.post('/form', data)
}

const update = (data: Record<string, any>) => {
  return request.put('/form', data)
}

const deleteForm = (params: Record<string, any>) => {
  return request.delete('/form', { params })
}

export default {
  fetchList,
  create,
  update,
  deleteForm,
  fetchOne
}
