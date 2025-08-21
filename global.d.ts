type Lang = "zh" | "en";

type Theme = "light" | "dark";

declare module "daisyui";

type ListResponse<T> = {
  list: T[];
  total: number;
  pageTotal: number;
};
