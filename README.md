## Elin-Blog

使用 Next.js + DaisyUI 开发的高性能博客，全栈项目。

## 开发方式

1、安装依赖

```sh
$ yarn i
```

2、启动开发环境

```sh
$ yarn dev
```

3、数据库支持。

因为是全栈项目，所以运行环境必须有数据库支持。

如果安装了docker，推荐直接运行`yarn db`，启动数据库镜像即可

也可以本地安装mysql环境，并且创建数据库`blog`，设置数据集`utf8mb4_general_ci`。

## 部署

### Docker部署（推荐）

1、构建生产版本镜像

```sh
$ docker build -t [name] .
```

2、推送镜像到远程仓库

```sh
$ docker push [name]
```

3、将本项目的`docker-compose.yml`传到服务器上，然后运行

```sh
$ docker compose up -d
```


ps：`docker-compose.yml`的`blog.image`需要修改成对应的仓库地址

即可自动在服务器上同时部署好博客和数据库。

### 源代码部署

>需要将源代码整个上传到服务器，对服务器性能要求较高

1、构建生产代码，产物出口是`dist/build`

```sh
$ yarn build
```

2、运行生产版本

```
$ yarn start
```