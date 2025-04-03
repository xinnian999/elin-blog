import { fetchList } from "@/async";
import DynamicPage from "./DynamicPage";
import { Link, LinkStatus } from "@/db";

export default async function LinkPage() {
  const { list } = await fetchList<Link>("/link", {
    filters: {
      status: LinkStatus["审核通过"],
    },
  });

  return <DynamicPage dataSource={list} />;
}
