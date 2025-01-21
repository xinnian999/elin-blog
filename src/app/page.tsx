import { Card } from "@/components";
import { fetchArticleList } from "@/db";

export default async function Home() {
  // const t = useT();
  const list = await fetchArticleList();

  // console.log(global.t)

  return (
    <div className="flex gap-6">
      <div className="basis-2/3 flex-grow flex flex-col gap-6">
        {list.map((item) => (
          <Card key={item.id}>{item.title}</Card>
        ))}
      </div>
      <div className="basis-1/3 flex-grow">
        {/* <Card className="h-60" title={t("Home Comment Title")}></Card> */}
      </div>
    </div>
  );
}
