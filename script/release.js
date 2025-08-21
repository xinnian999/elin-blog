const { execSync } = require("child_process");

const imageName = "crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin/elin-blog:latest";

execSync(`docker build -t ${imageName} .`, { stdio: "inherit" });
execSync(`docker push ${imageName}`, { stdio: "inherit" });
