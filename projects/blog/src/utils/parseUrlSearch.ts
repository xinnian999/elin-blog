import { NextRequest } from "next/server";

const parseUrlSearch = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const res = [...searchParams.entries()].reduce<Record<string, any>>(
    (acc, [key, value]) => {
      acc[key] = JSON.parse(value);

      return acc;
    },
    {}
  );

  return res;
};

export default parseUrlSearch;
