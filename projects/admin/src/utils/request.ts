import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { ElMessage, ElMessageBox } from "element-plus";

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
    // if (res.data.message) {
    //   ElMessageBox.alert(res.data.message, "操作失败", { type: "error" });
    // }

    return res
  },
  (error) => {
    const { status, data } = error.response    

    switch (status) {
      case 500:
        ElMessage({
          type: 'error',
          message: `500：${data ? data.code.replace('ER_ROW_IS_REFERENCED_2', '删除失败，因其被其他数据引用') : '服务器错误'}`,
        })
        break
      case 404:
        ElMessage({
          message: '接口不存在404',
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
