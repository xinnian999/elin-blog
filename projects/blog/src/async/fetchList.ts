import { paramsSerializer } from "@/utils";

const baseUrl = "http://localhost:3000/api";

const fetchList = async <T = Record<string, any>>(
  path: string,
  params: Record<string, any>
) => {
  const paramsString = paramsSerializer(params);

  const url = `${baseUrl}${path}?${paramsString}`;

  const res = await fetch(url);
  return (await res.json()) as {
    list: T[];
    total: number;
    pageTotal: number;
  };
};

export default fetchList;
