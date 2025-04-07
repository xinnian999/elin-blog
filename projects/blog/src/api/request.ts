import { paramsSerializer } from "@/utils";

const baseUrl = `http://${process.env.BLOG_HOST}:${process.env.BLOG_PORT}/api`;

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
}) => {
  let url = `${baseUrl}${path}`;

  const options = {
    method,
  } as RequestInit;

  if (method === "GET") {
    const paramsString = paramsSerializer(params);
    url += `?${paramsString}`;
  }

  if (method === "POST") {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);

    return (await res.json()) as T;
  } catch (error: any) {
    return Promise.reject(`请求异常了，似乎没有请求到后端服务里面\n错误信息：\n${error.message}`);
  }
};

export default request;
