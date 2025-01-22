import { Card } from "@/components";
import { fetchArticleList } from "@/db";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const list = await fetchArticleList();
  
  const t = await getTranslations("Home");

  return (
    <div className="flex gap-6">
      <div className="basis-2/3 flex-grow flex flex-col gap-6">
        {list.map((item) => (
          <Card key={item.id}>{item.title}</Card>
        ))}
      </div>
      <div className="basis-1/3 flex-grow">
        <Card className="h-60" title={t("Home Comment Title")}></Card>
      </div>
    </div>
  );
}
