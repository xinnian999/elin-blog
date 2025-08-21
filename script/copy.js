// copy.js
const fs = require("fs");
const path = require("path");

const staticSrc = path.join(__dirname, ".next", "static");
const staticDest = path.join(__dirname, ".next", "standalone", ".next", "static");

// 递归复制目录
fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
console.log("复制完成:", staticSrc, "->", staticDest);

const publicSrc = path.join(__dirname, "public");
const publicDest = path.join(__dirname, ".next", "standalone", "public");

// 递归复制目录
fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
console.log("复制完成:", publicSrc, "->", publicDest);

