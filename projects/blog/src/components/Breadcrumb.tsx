import { Card } from "@/components";
import Link from "next/link";

export default async function Breadcrumb({
  data,
}: {
  data: { title: string; to?: string }[];
}) {
  return (
    <Card className="mb-6">
      <div className="breadcrumbs">
        <ul>
          {data.map((item) => {
            return (
              <li key={item.title}>
                {item.to ? (
                  <Link href={item.to} className="text-blue-600">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
