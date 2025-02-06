"use client";

import { TablePlus } from "@/components";
import { deleteComment, fetchAllCommentList } from "@/db/service/comment";
import { Comment } from "@/db";
import { Avatar, Tag } from "antd";

const CommentAdmin: React.FC = () => {
  return (
    <TablePlus<Comment>
      columns={[
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.id - b.id,
          width: 120,
        },
        {
          title: "类型",
          dataIndex: "type",
          width: 150,
          key: "type",
          render: (_, record) => {
            console.log(record)
            return record.targetComment?<Tag color="blue">【留言板】回复</Tag>:<Tag>【留言板】</Tag>;
          },
        },
        {
          title: "用户头像",
          dataIndex: "avatar",
          key: "avatar",
          width: 130,
          render: (val) => <Avatar src={val} size={50} />,
        },
        {
          title: "昵称",
          dataIndex: "nickname",
          width: 180,
          key: "nickname",
        },
        {
          title: "评论内容",
          dataIndex: "content",
          key: "content",
        },
      ]}
      api={fetchAllCommentList}
      deleteApi={deleteComment}
    />
  );
};

export default CommentAdmin;
