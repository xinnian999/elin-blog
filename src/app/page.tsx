"use client";

import { Card } from "@/components";
import { useT } from "@/hooks";

export default function Home() {
  const t = useT();

  return (
    <div className="flex gap-6">
      <div className="basis-2/3 flex-grow flex flex-col gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index}>文章{index + 1}</Card>
        ))}
      </div>
      <div className="basis-1/3 flex-grow">
        <Card className="h-60" title={t("Home Comment Title")}></Card>
      </div>
    </div>
  );
}
