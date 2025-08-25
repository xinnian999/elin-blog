# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin-common/node-18:latest AS build

# 设置工作目录
WORKDIR /app

# 安装 yarn
# RUN npm install -g yarn

# 复制 package.json 和 yarn.lock，仅复制依赖文件来缓存依赖安装步骤
COPY package.json yarn.lock  ./

# 安装依赖
RUN yarn install

# 复制其余项目文件
COPY . .

# 构建 Next.js 项目
RUN yarn build


# 第二阶段：最终镜像
FROM crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin-common/node-18:latest AS production

# 设置工作目录
WORKDIR /app

COPY --from=build /app/.next/standalone /app

ENV PORT=80

# 启动 Next.js 项目
CMD ["node", "server.js"]

# 暴露应用的端口
EXPOSE 80
