# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:18-alpine AS build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制文件到工作目录
COPY . .

RUN pnpm install

RUN pnpm build

# 使用官方 nginx 镜像作为部署环境
FROM nginx:latest AS deploy

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 将构建好的静态文件复制到 nginx 默认路径
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

