import { Card } from "@/components";
import { getTranslations } from "next-intl/server";

export default async function Category() {
  const navT = await getTranslations("Nav");

  return (
    <div className="flex flex-col gap-6">
      <Card title={navT("Nav Category")}>
       
      </Card>
    </div>
  );
}
