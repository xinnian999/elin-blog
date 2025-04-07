import { fetchList } from "@/async";
import ClientPage from "./ClientPage";
import { Link, LinkStatus } from "@/db";

export default async function LinkPage() {
  const { list } = await fetchList<Link>("/link", {
    filters: {
      status: LinkStatus["审核通过"],
    },
  });

  return <ClientPage dataSource={list} />;
}
