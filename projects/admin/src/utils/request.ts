import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: '/api',
  paramsSerializer: (params) => {
    return Object.keys(params)
      .map((key) => {
        if (typeof params[key] !== 'object') return `${key}=${params[key]}`
        return `${key}=${encodeURI(JSON.stringify(params[key]))}`
      })
      .join('&')
  },
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    // 全局统一处理后端报错
    const { status, data } = error.response

    // 如果后端报错并返回了message，则直接弹出message
    if (data?.message) {
      ElMessage.error(`${data.code}：${data.message}`)

      // 登录失效处理
      if (data.redirect === '/login') {
        useStore().setLoginStatus(false)
        router.push('/login')
      }

      return Promise.reject(error)
    }

    // 其他未知错误，根据status弹出不同的message
    switch (status) {
      case 500:
        ElMessage({
          type: 'error',
          message: `500：${data ? data.code.replace('ER_ROW_IS_REFERENCED_2', '删除失败，因其被其他数据引用') : '服务器错误'}`,
        })
        break
      case 404:
        ElMessage({
          message: '404：接口不存在',
          type: 'error',
        })
        break
      default:
        break
    }

    return Promise.reject(error)
  },
)

export default request
