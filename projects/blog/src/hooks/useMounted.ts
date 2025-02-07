import { useMount } from "ahooks";
import { useState } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useMount(() => {
    setMounted(true);
  });

  return mounted;
};

export default useMounted;
