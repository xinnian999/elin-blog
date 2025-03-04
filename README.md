## Elin-Blog

使用 Next.js + DaisyUI 开发的高性能 SSR 博客，全栈项目。

## 开发方式

>前置环境要求：Nodejs v18+ 、 pnpm v8+ 、docker

1、安装依赖

```sh
$ pnpm i
```

2、启动开发环境

```sh
$ pnpm dev:blog # 开发博客前台
$ pnpm dev:admin # 开发博客后台
```

3、数据库支持。

因为是全栈项目，所以运行环境必须有数据库支持。

推荐安装`docker`，然后直接运行：

```sh
docker compose up -d db
```

这将会启动一个，为本博客项目量身定制的`mysql`环境

## 部署

>推荐使用`Docker`部署博客

1、修改环境变量文件`.env`的`REPO_URL`

```
REPO_URL= # 镜像仓库地址，改成你的个人仓库地址
```

2、构建生产版本镜像

```sh
$ docker compose build
```

3、推送镜像到远程仓库

```sh
$ docker compose push 
```

4、将根目录的`docker-compose.yml`和`.env`传到服务器上，然后运行

```sh
$ docker compose up -d
```

到这一步部署完成，共四个相关服务：

+ 博客前台部署在`3000`端口
+ 博客后台部署在`3001`端口
+ 博客数据库部署在`3306`端口
+ 数据库可视化工具`phpmyadmin`部署在`8080`端口

可以自行修改`docker-compose.yml`的服务端口