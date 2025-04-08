import { paramsSerializer } from "@/utils";

const isServer = typeof window === "undefined";
const baseUrl = isServer
  ? `http://${process.env.BLOG_HOST}:${process.env.BLOG_PORT}/api`
  : "/api"; // 客户端组件只用相对路径即可

const request = async <T = any>({
  path,
  params = {},
  method = "GET",
  data = {},
}: {
  path: string;
  params?: Record<string, any>;
  method?: "GET" | "POST";
  data?: Record<string, any>;
}): Promise<T> => {
  let url = `${baseUrl}${path}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "GET") {
    const paramsString = paramsSerializer(params);
    url += paramsString ? `?${paramsString}` : "";
  } else {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);

    const contentType = res.headers.get("content-type") || "";

    // 判断不是 JSON 格式，防止 HTML 被 json() 解析时报错
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      return Promise.reject(
        `返回数据不是 JSON 格式，可能是 HTML 错误页\n地址：${url}\n返回内容：\n${text}`
      );
    }

    const result = await res.json();

    if (!res.ok) {
      return Promise.reject(
        `请求失败：${res.status} ${res.statusText}\n\n ${JSON.stringify(result)}`
      );
    }

    return result;
  } catch (error: any) {
    return Promise.reject(
      `与后端通信异常\n请求地址：${url}\n错误信息：${error.message}`
    );
  }
};

export default request;
