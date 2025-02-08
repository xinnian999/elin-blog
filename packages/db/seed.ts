import { Article, Tag, Category } from "./entity";
import { getRepository } from "./getRepository";

const mockCategory = ["前端", "后端", "运维", "容器", "生活"];

const mockTags = [
  "react",
  "vue",
  "nodejs",
  "javascript",
  "html",
  "nextjs",
  "docker",
];

async function seed() {
  const articleRepository = await getRepository(Article);
  const categoryRepository = await getRepository(Category);
  const tagRepository = await getRepository(Tag);

  await tagRepository.save(
    mockTags.map((item) => {
      const tag = new Tag();
      tag.name = item;

      return tag;
    })
  );

  await categoryRepository.save(
    mockCategory.map((item) => {
      const category = new Category();
      category.name = item;
      return category;
    })
  );
}

// 运行数据填充
seed()
  .then(() => console.log("Initial data has been loaded!"))
  .catch((error) => console.error("Error seeding data:", error));
