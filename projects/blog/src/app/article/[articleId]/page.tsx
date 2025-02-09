import { Card } from "@/components";
import { fetchArticleById } from "@elin-blog/db";
import { getTranslations } from "next-intl/server";
import MarkdownIt from "markdown-it";
import anchor from 'markdown-it-anchor';

const mdParser = new MarkdownIt().use(anchor);;

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
        <Card className="h-60">
          <p className="text-xl">目录</p>
        </Card>
      </div>
    </div>
  );
}
