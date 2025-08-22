import { getSummary } from "@/services";

export async function GET() {
  const res = await getSummary();

  return Response.json(res);
}
