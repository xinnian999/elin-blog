import { LinkStatus } from "@/db";
import linkApi from "@/api/link";
import ClientPage from "./ClientPage";

export default async function LinkPage() {
  const { list } = await linkApi.getLinkList({
    filters: {
      status: LinkStatus["审核通过"],
    },
  });

  return <ClientPage dataSource={list} />;
}
