import { useRequest } from "ahooks";
import { useState } from "react";

const useFetchList = <T = any>({
  api,
  deps = [],
}: {
  api: () => Promise<T[]>;
  deps?: any[];
}) => {
  const [data, setData] = useState<T[]>([]);

  const { run, loading } = useRequest(api, {
    refreshDeps: deps,
    onSuccess(data = []) {
      setData(data);
    },
  });

  return { data, refresh: run, loading };
};

export default useFetchList;
