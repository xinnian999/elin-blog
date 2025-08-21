import { Alert, Card } from "@/components";
import { Comment } from "@/components";
import commentApi from "@/api/comment";

export default async function CommentPage() {
  const { list: commentList } = await commentApi.getCommentRootList({
    filters: {
      type: "comment",
    },
    orderBys: {
      id: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card title="留言板">
        <Alert>
          欢迎来到留言板! <br /> 可以在这里留言、吐槽。
        </Alert>
      </Card>

      <Comment type="comment" initialData={commentList} />
    </div>
  );
}
