import axios from "axios";
// import { ElMessage, ElMessageBox } from "element-plus";

const request = axios.create({
  baseURL: "/api",
  paramsSerializer: (params) => {
    return Object.keys(params)
      .map((key) => {
        if (typeof params[key] !== "object") return `${key}=${params[key]}`;
        return `${key}=${encodeURI(JSON.stringify(params[key]))}`;
      })
      .join("&");
  },
});

// request.interceptors.response.use(
//   (res) => {
//     if (res.data.message) {
//       ElMessageBox.alert(res.data.message, "操作失败", { type: "error" });
//     }

//     return res?.data;
//   },
//   (error) => {
//     const { status } = error.response;
//     switch (status) {
//       case 500:
//         ElMessage({
//           message: "接口异常500",
//           type: "error",
//         });
//         break;
//       case 404:
//         ElMessage({
//           message: "接口不存在404",
//           type: "error",
//         });
//         break;
//       default:
//         break;
//     }
//   }
// );

export default request;
