# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml，仅复制依赖文件来缓存依赖安装步骤
COPY package.json pnpm-lock.yaml  pnpm-workspace.yaml ./

COPY packages ./packages

# 安装依赖
RUN pnpm install

# 复制其余项目文件
COPY . .

# 根据目标构建前端或后端
ARG TARGET=blog
# WORKDIR /app/projects/$TARGET
# 构建 Next.js 项目
RUN pnpm build:$TARGET&&

# 第二阶段：最终镜像
FROM node:18-alpine AS production

# 复制项目文件
COPY . .

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --production

# 启动 Next.js 项目
CMD ["pnpm", "start:blog"]

# 暴露应用的端口
EXPOSE 3000
