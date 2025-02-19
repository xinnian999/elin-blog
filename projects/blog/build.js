const fs = require("fs").promises;

async function copy() {
  try {
    // 复制 public 目录
    await fs.cp("public", "dist/build/standalone/projects/blog/public", {
      recursive: true,
    });

    // 复制 .env.local 文件
    await fs.copyFile(
      ".env.local",
      "dist/build/standalone/projects/blog/.env.local"
    );

    // 复制 static 目录
    await fs.cp(
      "dist/build/static",
      "dist/build/standalone/projects/blog/dist/build/static",
      { recursive: true }
    );

    console.log("所有文件和目录已成功复制！");
  } catch (err) {
    console.error("复制文件或目录时出错：", err);
  }
}

copy();
