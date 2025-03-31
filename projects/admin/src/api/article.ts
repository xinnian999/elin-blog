import { request } from '@/utils'

const fetchData = (params: Record<string, any>) => {
  return request.get('/article', { params })
}

const create = (data: Record<string, any>) => {
  return request.post('/article', data)
}

const update = (data: Record<string, any>) => {
  return request.put('/article', data)
}

const deleteData = (params: Record<string, any>) => {
  return request.delete('/article', { params })
}

export default {
  fetchData,
  create,
  update,
  deleteData,
}
