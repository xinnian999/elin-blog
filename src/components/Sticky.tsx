'use client';

import { useEffect, useState } from 'react';

type StickyProps = {
  children: React.ReactNode;
  top?: number;
  bottomBoundary?: string;
};

export default function SafeSticky({
  children,
  top = 80,
  bottomBoundary,
}: StickyProps) {
  const [StickyComponent, setStickyComponent] = useState<any>(null);

  useEffect(() => {
    import('react-stickynode').then((mod) => {
      setStickyComponent(() => mod.default);
    });
  }, []);

  if (!StickyComponent) {
    return <>{children}</>; // 初始时只渲染 children
  }

  return (
    <StickyComponent enabled={true} top={top} bottomBoundary={bottomBoundary}>
      {children}
    </StickyComponent>
  );
}
