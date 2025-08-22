type Lang = "zh" | "en";

type Theme = "light" | "dark";

declare module "daisyui";

type ListResponse<T> = {
  list: T[];
  total: number;
  pageTotal: number;
};

type ListServiceParams = {
  pageNum?: number;
  pageSize?: number;
  order?: Record<string, 'asc' | 'desc'>;
  where?: Record<string, any>;
};