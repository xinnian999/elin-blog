# 使用官方 MySQL 镜像作为基础镜像
FROM mysql:5.7.29

# 复制本地的初始化 SQL 文件到容器的 /docker-entrypoint-initdb.d 目录
COPY ./init.sql /docker-entrypoint-initdb.d/

# 复制本地的 my.cnf 配置文件到容器的 /etc/mysql/目录
COPY ./my.cnf /etc/mysql/my.cnf

# 设置数据库的相关环境变量
ENV MYSQL_ROOT_PASSWORD=991015
ENV MYSQL_DATABASE=blog

# 配置 MySQL 的字符集和时区
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_general_ci", "--default-time-zone=+08:00"]
