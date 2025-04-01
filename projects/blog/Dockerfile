# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml，仅复制依赖文件来缓存依赖安装步骤
COPY package.json  ./

# 安装依赖
RUN pnpm install

# 复制其余项目文件
COPY . .

# 删除源环境变量文件
# COPY .env projects/blog/.env.local

# 在构建时启用 standalone 模式
ENV NEXT_OUTPUT=standalone

# 构建 Next.js 项目
RUN pnpm build

RUN mkdir -p dist/build/standalone/dist/build/static && \
    cp -r dist/build/static dist/build/standalone/dist/build/static

RUN cp -r public dist/build/standalone/public


# 第二阶段：最终镜像
FROM node:18-alpine AS production

# 设置工作目录
WORKDIR /app

COPY --from=build /app/dist/build/standalone /app

# 启动 Next.js 项目
CMD ["node", "server.js"]

# 暴露应用的端口
EXPOSE 3000
