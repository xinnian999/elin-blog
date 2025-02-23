# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制构建后的静态文件
COPY dist/standalone /app

# 检查 dist/standalone 里的文件
RUN ls -al /app

# 设置环境变量（如果需要）
# ENV NODE_ENV=production

# 启动 Next.js 项目
ENTRYPOINT ["node", "server.js"]

# 暴露应用的端口
EXPOSE 3000
