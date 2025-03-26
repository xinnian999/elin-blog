"use server";

import { getRepository } from "@elin-blog/db";
import { Form } from "../entity";
import { FindOptionsOrder } from "typeorm";

export const fetchFormList = async ({
  pageNum = 1,
  pageSize = 10,
  order = { id: "desc" },
}: {
  pageNum?: number;
  pageSize?: number;
  order?: FindOptionsOrder<Form>;
}) => {
  const formRepository = await getRepository(Form);

  const [forms, total] = await formRepository.findAndCount({
    skip: (pageNum - 1) * pageSize, // 跳过前面的记录
    take: pageSize, // 每页返回的记录数
    order,
  });

  return {
    list: forms,
    total, // 总记录数
    totalPages: Math.ceil(total / pageSize), // 总页数
    currentPage: pageNum,
  };
};

export const createForm = async (params: Form) => {
  const formRepository = await getRepository(Form);

  const form = formRepository.create(params);

  await formRepository.save(form);

  return form
};
