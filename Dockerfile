# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制所有其他文件
COPY . .

# 构建 Next.js 项目
RUN pnpm run build

# 使用一个更小的镜像作为生产镜像
FROM node:18-alpine

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 只复制构建后的产物
COPY --from=build /app ./

# 需要在生产环境运行的 Next.js 项目启动命令
CMD ["pnpm", "start"]

# 暴露端口
EXPOSE 3000
