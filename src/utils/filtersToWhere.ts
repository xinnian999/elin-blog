import { In, Like } from "typeorm";

const filtersToWhere = (filters: Record<string, any>) => {
  const where: Record<string, any> = {};

  Object.keys(filters).forEach((key) => {
    if (Array.isArray(filters[key]) && filters[key].length > 0) {
      where[key] = { id: In(filters[key]) }; // 让 TypeORM 处理多对多的 `IN` 查询
      return;
    }

    if (Array.isArray(filters[key]) && filters[key].length === 0) {
      return;
    }

    where[key] = Like(`%${filters[key]}%`); // 适用于 title 等字符串字段的模糊匹配
  });

  return where;
};

export default filtersToWhere;
