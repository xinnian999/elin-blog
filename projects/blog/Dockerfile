# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制构建后的静态文件
COPY dist/build/standalone /app

# 设置工作目录
WORKDIR /app/projects/blog

# 启动 Next.js 项目
CMD ["node", "server.js"]

# 暴露应用的端口
EXPOSE 3000
