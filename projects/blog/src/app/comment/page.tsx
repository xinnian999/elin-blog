import { Alert, Card } from "@/components";
import { Comment } from "@/components";
import { fetchCommentList } from "@/db";

export default async function CommentPage() {
  const commentList = await fetchCommentList({ type: "comment" });

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
