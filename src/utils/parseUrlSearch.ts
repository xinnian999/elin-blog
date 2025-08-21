import { NextRequest } from "next/server";
import { In, Like } from "typeorm";
const parseUrlSearch = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const res = [...searchParams.entries()].reduce<Record<string, any>>(
    (acc, [key, value]) => {
      
      try {
        acc[key] = JSON.parse(value);
      } catch {
        acc[key] = value;
      }

      return acc;
    },
    {}
  );

  if (res.orderBys) {
    res.order = res.orderBys;
  }

  // 处理 filters
  if (res.filters) {
    const where: any = {};

    Object.keys(res.filters).forEach((key) => {
      if (Array.isArray(res.filters[key]) && res.filters[key].length > 0) {
        where[key] = { id: In(res.filters[key]) }; // 让 TypeORM 处理多对多的 `IN` 查询
        return;
      }

      if (Array.isArray(res.filters[key]) && res.filters[key].length === 0) {
        return;
      }

      where[key] = Like(`%${res.filters[key]}%`); // 适用于 title 等字符串字段的模糊匹配
    });

    res.where = where;
  }

  return res;
};

export default parseUrlSearch;
