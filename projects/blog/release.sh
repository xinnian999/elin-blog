# 定义镜像地址变量
IMAGE_NAME="crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin/elin-blog:latest"

# 构建镜像
docker build -t $IMAGE_NAME .

# 推送镜像
docker push $IMAGE_NAME
