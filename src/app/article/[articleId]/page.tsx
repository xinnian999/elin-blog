import { Card } from "@/components";
import { fetchArticleById } from "@/db";
import { getTranslations } from "next-intl/server";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt();

export default async function Article({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleId = +(await params).articleId;

  const data = await fetchArticleById(articleId);

  const t = await getTranslations("Home");

  return (
    <div className="flex gap-6">
      <div className="flex-1 overflow-hidden">
        <Card>
          <p className="text-2xl">{data?.title}</p>

          {data && (
            <div
              className="overflow-hidden w-full "
              dangerouslySetInnerHTML={{
                __html: mdParser.render(data.content),
              }}
            />
          )}
        </Card>
      </div>

      <div className="w-2/6">
        <Card className="h-60" title={t("Home Comment Title")}></Card>
      </div>
    </div>
  );
}
