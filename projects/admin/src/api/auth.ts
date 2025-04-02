import { request } from '@/utils'

 const login = async (data: any) => {
  return await request.post('/auth', data)
}

export default {
  login,
}

