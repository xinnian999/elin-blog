const fs = require("fs");
const path = require("path");

const root = process.cwd(); // 始终是项目根目录

// .next/static → .next/standalone/.next/static
const staticSrc = path.join(root, ".next", "static");
const staticDest = path.join(root, ".next", "standalone", ".next", "static");

if (fs.existsSync(staticSrc)) {
  fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
  console.log("✅ 复制完成:", staticSrc, "->", staticDest);
} else {
  console.warn("⚠️ 未找到:", staticSrc);
}

// public → .next/standalone/public
const publicSrc = path.join(root, "public");
const publicDest = path.join(root, ".next", "standalone", "public");

if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
  console.log("✅ 复制完成:", publicSrc, "->", publicDest);
} else {
  console.warn("⚠️ 未找到:", publicSrc);
}
