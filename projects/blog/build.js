const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// 定义构建产物目录
const buildDir = path.join(__dirname, 'dist/build');

// 清理构建产物
const cleanBuild = async () => {
  console.log('开始清理上一次的构建产物...');
  try {
    await fs.access(buildDir); // 检查 .next 目录是否存在
    await fs.rm(buildDir, { recursive: true });
    console.log('旧的产物已清理！');
  } catch {
    console.log('旧的产物不存在，无需删除。');
  }
};

// 执行 next build 命令并输出构建日志
const runNextBuild = () => {
  console.log('开始构建 Next.js 项目...');
  try {
    const result = execSync('next build', { stdio: 'inherit' }); // 使用 inherit 让命令输出到控制台
    console.log('Next.js 构建成功！');
    return result;
  } catch (error) {
    console.error('构建失败：', error.message);
    process.exit(1); // 如果构建失败，退出并显示错误
  }
};

// 复制文件和目录
const copyFiles = async () => {
  try {
    console.log('开始复制文件和目录...');
    // 复制 public 目录
    await fs.cp("public", "dist/build/standalone/projects/blog/public", { recursive: true });

    // 复制 .env.local 文件
    await fs.copyFile(".env.local", "dist/build/standalone/projects/blog/.env.local");

    // 复制 static 目录
    await fs.cp("dist/build/static", "dist/build/standalone/projects/blog/dist/build/static", { recursive: true });

    console.log("所有文件和目录已成功复制！");
  } catch (err) {
    console.error("复制文件或目录时出错：", err);
  }
};

// 执行流程
const buildProject = async () => {
  await cleanBuild();  // 清理构建产物
  runNextBuild();      // 执行构建
  await copyFiles();   // 执行文件复制操作
};

// 开始构建
buildProject();
