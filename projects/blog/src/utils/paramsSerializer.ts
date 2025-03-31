const paramsSerializer = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => {
      if (typeof params[key] !== "object") return `${key}=${params[key]}`;
      return `${key}=${encodeURI(JSON.stringify(params[key]))}`;
    })
    .join("&");
};

export default paramsSerializer;
