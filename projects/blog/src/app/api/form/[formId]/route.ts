import { Form, getRepository } from "@/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  const { formId } = await params;

  const formRepository = await getRepository(Form);

  if (!formId) {
    return Response.json({ message: "表单ID不能为空" }, { status: 400 });
  }

  const form = await formRepository.findOne({
    where: { id: Number(formId) },
  });

  return Response.json(form);
}
