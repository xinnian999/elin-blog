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

修改`.env`文件，配置数据库连接信息（数据集`utf8mb4_general_ci`）。

本项目使用了`TypeORM`，会自动创建表。

## 打包

```sh
$ yarn build
```

## 预览打包产物

```sh
$ yarn preview
```

## 构建本地镜像

```sh
$ yarn build:image
```

## 运行本地镜像

```sh
$ yarn run:image
```

## 部署

**推荐使用 Docker 部署**

可以修改`script/release.js`文件，修改`imageName`变量为你的仓库地址。

然后运行

```sh
$ yarn release
```

完成构建 + 推送镜像后，在你的服务器拉取镜像并运行（记得传递变量）