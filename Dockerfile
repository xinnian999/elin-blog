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
WORKDIR /app/projects/$TARGET

# 构建 Next.js 项目
RUN pnpm run build

# 运行时镜像阶段
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 设置环境变量，确保后续阶段能够访问 $TARGET
ARG TARGET=blog
ENV TARGET=$TARGET

# 复制构建产物
COPY --from=build /app/projects/$TARGET/dist/build ./dist/build

# 复制 public 目录
COPY --from=build /app/projects/$TARGET/public ./public

# 复制 next Config
COPY --from=build /app/projects/$TARGET/next.config.ts ./next.config.ts

# 只复制生产依赖和 package 文件
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 安装生产环境依赖
RUN npm install -g pnpm && pnpm install --prod

# 启动 Next.js 项目
CMD ["pnpm", "start"]

# 暴露应用的端口
EXPOSE 3000
