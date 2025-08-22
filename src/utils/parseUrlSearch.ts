import { NextRequest } from "next/server";
import filtersToWhere from "./filtersToWhere";

const parseUrlSearch = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const params = [...searchParams.entries()].reduce<Record<string, any>>(
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

  if (params.orderBys) {
    params.order = params.orderBys;
  }

  if(params.filters) {
    params.where = filtersToWhere(params.filters);
  }

  return params;
};

export default parseUrlSearch;
