#!/bin/bash

# 配置
DATE=$(date +"%Y-%m-%d-%H-%M")
CONTAINER_NAME=elin-blog-db
BACKUP_DIR=/root/backup/mysql-volumes  # 建议用绝对路径
MYSQL_USER=root
MYSQL_PASSWORD=991015
MYSQL_DATABASE=blog

# 创建备份目录
mkdir -p ${BACKUP_DIR}

# 备份
docker exec ${CONTAINER_NAME} \
  sh -c "mysqldump -u${MYSQL_USER} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE}" \
  > ${BACKUP_DIR}/backup-${DATE}.sql

# 保留最近 7 个
ls -1t ${BACKUP_DIR}/backup-*.sql | tail -n +8 | xargs rm -f