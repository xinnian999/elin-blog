"use client";
import { useMounted } from "@/hooks";
import ReactSticky from "react-stickynode";

function Sticky({
  children,
  top = 80,
  bottomBoundary,
}: {
  children: React.ReactNode;
  top?: number;
  bottomBoundary?: string;
}) {
  const mounted = useMounted();

  if (!mounted) {
    return children;
  }

  return (
    <ReactSticky enabled={mounted} top={top} bottomBoundary={bottomBoundary}>
      {children}
    </ReactSticky>
  );
}

export default Sticky;
