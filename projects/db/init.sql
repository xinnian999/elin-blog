-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- 主机： elin-blog-db:3306
-- 生成日期： 2025-02-12 17:39:09
-- 服务器版本： 5.7.29
-- PHP 版本： 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `content`, `created_at`, `updated_at`, `categoryId`) VALUES
(1, 'vue-form-craft，基于vue3的开箱即用表单方案', '## 一、前言\n\n首先祝各位朋友们新年快乐！龙年大吉！\n\n在前端开发过程中，表单渲染是重要且繁琐的一环。为了提高开发效率并避免重复工作，我开发了一款基于`vue3` 的表单工具，并取名`vue-form-craft（vue表单工艺）`。\n是适用于 `vue3项目` 中后台表单的一种通用解决方案。\n\n本文将介绍 vue-form-craft 的基本概念、使用方式及高级特性。\n\n## 二、简介\n\n**vue-form-craft** 主要由**FormDesign（表单设计器）** 和 **SchemaForm（表单渲染器）** 组成。\n\n`FormDesign`通过拖拽快速生成JsonSchema，`SchemaForm`使用 JsonSchema 协议渲染表单\n\n[在线预览](https://hyl999.co:86/formDesign)\n\n[文档](https://hyl999.co:86/document/introduce)\n\n[github源码](https://github.com/xinnian999/vue-form-craft) \n\n**优势**\n\n-   轻量级： 可以通过npm依赖直接集成到你的vue3项目\n-   易于使用：容易上手，可以通过表单设计器可视化拖拽的方式快速生成表单。\n-   协议简单：遵循 JsonSchema 规范，因此相对容易理解和上手。\n-   较强的配置能力：具有较强的配置能力，可以对表单联动、校验、布局以及数据处理等方面进行配置。\n-   良好的性能体验：底层采用 element plus 的 Form 来实现表单的数据收集和管控，同时针对控件渲染层面进行优化处理，从而大幅提升性能，使得在使用过程中具有良好的性能体验。\n-   内置组件丰富：内置组件非常丰富，包括基础组件、嵌套卡片类组件和动态增减 List 组件等，可以满足大多数场景的表单实现需求。\n-   扩展性强：具有非常强的扩展性，支持自定义各种类型的表单控件，支持多种ui库，用户可以根据实际需要进行定制，非常灵活。\n\n\n## 三、如何使用\n\n>最新版本v3.0.8 已经支持ts类型检查，推荐vue3+ts项目引入使用！\n\n### 1、安装依赖\n\n```js\nnpm i vue-form-craft\n```\n\n### 2、全局注册\n\n```js\nimport { createApp } from \'vue\'\nimport App from \'./App.vue\'\nimport VueFormCraft from \'vue-form-craft\'\nconst app = createApp(App)\n\napp.use(VueFormCraft)\napp.mount(\'#app\')\n\n```\n\n### 3、使用\n\n```ts\n<template>\n  <schema-form :schema=\"schema\" footer @onFinish=\"onFinish\" />\n</template>\n\n<script setup lang=\"ts\">\nimport type { schemaType , formValuesType } from \'vue-form-craft\'\n\nconst schema: schemaType = {\n  labelWidth: 150,\n  labelAlign: \'right\',\n  size: \'default\',\n  items: [\n    {\n      label: \'用户名\',\n      component: \'Input\',\n      props: {\n        placeholder: \'请输入用户名\'\n      },\n      name: \'username\'\n    },\n    {\n      label: \'密码\',\n      component: \'Password\',\n      props: {\n        placeholder: \'请输入密码\'\n      },\n      name: \'password\'\n    }\n  ]\n}\n\nconst onFinish = (values: formValuesType) => {\n  alert(JSON.stringify(values))\n}\n</script>\n\n```\n\n![SchemaForm.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de459d5f4b884a2791ef62c1d4c7a10b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=561&h=187&s=3396&e=png&b=ffffff)\n\n### 4、通过表单设计器拖拖拽拽 快速生成JsonSchema\n\n```js\n<template>\n  <form-design @onSave=\"(schema) => console.log(schema)\" />\n</template>\n```\n\n![formDesign.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6be360490e74056b193f4dfb411aa7d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1909&h=848&s=52385&e=png&b=ffffff)\n\n### 5、ts类型支持\n\n如下配置，即可开启全局组件的类型支持\n\n```json\n// tsconfig.json\n{\n  \"compilerOptions\": {\n    // ...\n    \"types\": [\"vue-form-craft/global\"]\n  }\n}\n```\n\n\n\n## 四、一分钟读懂JsonShema\n\n首先，我们要理解，JSON Schema就是 **表单的抽象** 。\n\nJSON的最外层是表单整体的配置，items里面是每个字段的配置。\n\nitems里是每个字段的抽象，label、name、component等是每个字段的通用配置。\n\ncomponent代表使用什么组件，props是传给该组件的props。大部分组件都是基于el二次封装，所以也支持该组件在el文档的所有props\n\n```json\n{\n  \"labelWidth\": 150,   //表单label宽度\n  \"labelAlign\": \"right\",   //表单label对齐方式\n  \"size\": \"default\",   //表单字段大小\n  \"items\": [  //表单所有字段的配置\n    {\n      \"label\": \"用户名\", //字段的label\n      \"component\": \"input\", //字段使用的组件\n      \"props\": {    //传给该组件的props，支持该组件在element plus的所有props\n        \"placeholder\": \"请输入用户名\"\n      },\n      \"name\": \"username\" //唯一标识，也就是值key\n    },\n    {\n      \"label\": \"密码\",\n      \"component\": \"password\",\n      \"props\": {\n        \"placeholder\": \"请输入密码\"\n      },\n      \"name\": \"password\"\n    }\n  ]\n}\n```\n\n## 五、表单联动\n\n要评价一个表单工具能力强不强，表单联动能力至关重要。 **vue-form-craft** 通过 **模板引擎** 动态生成JsonSchema，让表单联动变得非常容易。\n\n### 1、模板表达式\n\n模板表达式为字符串格式，以双花括号 {{ ... }}为语法特征，对于简单的联动提供一种简洁的配置方式。\n\n在JsonSchema中，被双花括号包裹的字符串一律会被解析为 **js表达式并返回结果**，且只能使用联动变量。这种联动方式能应对大部分联动场景😎\n\n例如：控制字段禁用、隐藏、文案提示等交互。\n\n**JsonSchema 所有协议字段都支持模板表达式。**\n\n```json\n{\n  \"labelWidth\": 150,\n  \"labelAlign\": \"right\",\n  \"size\": \"default\",\n  \"items\": [\n    {\n      \"label\": \"姓名\",\n      \"component\": \"Input\",\n      \"name\": \"name\",\n      \"props\": {\n        \"placeholder\": \"请输入姓名\"\n      }\n    },\n    {\n      \"label\": \"自我介绍\",\n      \"component\": \"TextArea\",\n      \"name\": \"desc\",\n      \"props\": {\n        \"placeholder\": \"{{ $values.name + \'的自我介绍\' }}\",\n        \"disabled\":\"{{ !$values.name }}\"\n      }\n    }\n  ]\n}\n```\n\n\n> Schema插值表达式 可以使用的联动变量：\n\n| 变量名      | 类型   | 描述                                                     |\n| ----------- | ------ | -------------------------------------------------------- |\n| $val        | any    | 当前字段值                                               |\n| $values     | Object | 整个表单的值                                             |\n| $select     | Object | 当前字段如果是【选择类字段】，这个就是选中项对应的数据源 |\n| $selectData | Object | 【选择类字段】选中项数据源合集                           |\n| $item       | Object | 【自增组件】专用，单行的数据值                           |\n| ...         | any    | 由schemaContext传入的自定义变量                          |\n\n**联动案例1**\n\n![linkage1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a585362d9b134720bb77474c1cc11f5f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=836&h=268&s=134405&e=gif&f=50&b=ffffff)\n\n\n\n```js\n{\n  labelWidth: 150,\n  labelAlign: \'right\',\n  size: \'default\',\n  items: [\n    {\n      label: \'评分\',\n      component: \'Rate\',\n      name: \'rate\',\n      props: {\n        max: 5,\n        \'allow-half\': true\n      },\n      required: true\n    },\n    {\n      label: \'差评原因\',\n      component: \'Textarea\',\n      name: \'reason\',\n      props: {\n        placeholder: \'请输入...\',\n        autosize: {\n          minRows: 4,\n          maxRows: 999\n        }\n      },\n      hidden: \'{{ !$values.rate || $values.rate>3 }}\' //评分大于3分时隐藏，未评分时也要隐藏\n    }\n  ]\n}\n\n\n```\n\n**联动案例2**\n\n\n![linkage2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc4d378b1ba64119a5c203179c422799~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=988&h=376&s=239476&e=gif&f=50&b=ffffff)\n\n```js\n{\n  labelWidth: 150,\n  labelAlign: \'right\',\n  size: \'default\',\n  items: [\n    {\n      label: \'分类\',\n      component: \'Radio\',\n      props: {\n        mode: \'static\',\n        options: [\n          {\n            name: \'前端\',\n            id: 1\n          },\n          {\n            name: \'后端\',\n            id: 2\n          },\n          {\n            name: \'运维\',\n            id: 3\n          },\n          {\n            name: \'其他\',\n            id: 4\n          }\n        ],\n        labelKey: \'name\',\n        valueKey: \'name\',\n        optionType: \'button\',\n        space: 0\n      },\n      name: \'category\',\n      required: true\n    },\n    {\n      label: \'文章\',\n      component: \'Radio\',\n      props: {\n        mode: \'remote\',\n        placeholder: \'请选择文章\',\n        labelKey: \'title\',\n        valueKey: \'id\',\n        api: {\n          url: \'/current/query/article\',\n          method: \'GET\',\n          params: {\n            filters: {\n              category: \'{{$values.category}}\'\n            }\n          },\n          dataPath: \'data\'\n        },\n        optionType: \'circle\',\n        autoSelectedFirst: true,\n        direction: \'vertical\',\n        space: 0\n      },\n      name: \'article\',\n      required: true,\n      hidden: \'{{!$values.category}}\'\n    }\n  ]\n}\n```\n\n### 2、字段监听\n\n上面的 **模板表达式** 虽然足够灵活，但是不能做到表单值联动，所以给每个字段提供了一个change配置，可以监听字段变化去修改其他字段的值。\n\nchange是一个数组，可以同时联动多个字段。target为目标字段，value是修改的值，也支持插值表达式。\n\n**联动案例3**\n\n\n![ffl55-trc6z.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6de0312a2504492cb803fbf2f0776bb3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=856&h=208&s=56313&e=gif&f=50&b=fefefe)\n\n```json\n{\n  \"labelWidth\": 150,\n  \"labelAlign\": \"right\",\n  \"size\": \"default\",\n  \"items\": [\n    {\n      \"label\": \"字段1\",\n      \"component\": \"Input\",\n      \"props\": {\n        \"placeholder\": \"请输入...\"\n      },\n      \"name\": \"item1\",\n      \"change\": [\n        {\n          \"target\": \"item2\",\n          \"value\": \"{{$val * 2}}\"\n        },\n        {\n          \"target\": \"item3\",\n          \"value\": \"{{$val + \'元\'}}\"\n        }\n      ]\n    },\n    {\n      \"label\": \"字段2\",\n      \"component\": \"Input\",\n      \"props\": {\n        \"placeholder\": \"请输入...\"\n      },\n      \"name\": \"item2\"\n    },\n    {\n      \"label\": \"字段3\",\n      \"component\": \"Input\",\n      \"props\": {\n        \"placeholder\": \"请输入...\"\n      },\n      \"name\": \"item3\"\n    }\n  ]\n}\n```\n\n**联动案例4**\n\n一些场景需要根据已选值的数据源中取某个字段，再给其他字段作为值，这就可以用上 **$select** 了\n\n![4or83-4wx9e.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dc4e9c5457d4cefb6a3966c83583c16~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=720&h=252&s=248767&e=gif&f=49&b=ffffff)\n\n```json\n{\n  \"labelWidth\": 150,\n  \"labelAlign\": \"right\",\n  \"size\": \"default\",\n  \"items\": [\n    {\n      \"label\": \"选择商品\",\n      \"component\": \"Select\",\n      \"props\": {\n        \"mode\": \"static\",\n        \"options\": [\n          {\n            \"name\": \"商品1\",\n            \"id\": \"1\",\n            \"price\": 25\n          },\n          {\n            \"name\": \"商品2\",\n            \"id\": \"2\",\n            \"price\": 65\n          },\n          {\n            \"name\": \"商品3\",\n            \"id\": \"3\",\n            \"price\": 100\n          }\n        ],\n        \"placeholder\": \"请选择...\",\n        \"labelKey\": \"name\",\n        \"valueKey\": \"id\"\n      },\n      \"name\": \"commodity\",\n      \"change\": [\n        {\n          \"target\": \"price\",\n          \"value\": \"{{$select.price}}\"\n        }\n      ]\n    },\n    {\n      \"label\": \"价格\",\n      \"component\": \"InputNumber\",\n      \"name\": \"price\",\n      \"props\": {\n        \"min\": 1,\n        \"max\": 9999,\n        \"step\": 1,\n        \"unit\": \"元\",\n        \"disabled\": true,\n        \"controlsPosition\": \"right\"\n      }\n    }\n  ]\n}\n```\n\n## 六、高级特性\n\n### 1、表单校验\n\n所有表单项都可以配置`required:true`， 来给字段设置必填校验。\n\n如果是input类字段，则可以配置 `rules` 设置更复杂的校验规则，参考el文档\n\ntype做了扩展，可以直接写正则表达式，就会根据其校验了\n\n```json\n{\n  \"labelWidth\": 150,\n  \"labelAlign\": \"right\",\n  \"size\": \"default\",\n  \"items\": [\n    {\n      \"label\": \"邮箱\",\n      \"component\": \"Input\",\n      \"props\": {\n        \"placeholder\": \"请输入邮箱\"\n      },\n      \"name\": \"email\",\n      \"required\": true,\n      \"rules\": [\n        {\n          \"type\": \"email\",\n          \"message\": \"邮箱格式不合法\",\n          \"trigger\": [\n            \"blur\"\n          ]\n        },\n        {\n          \"type\": \"^\\\\S*$\",\n          \"message\": \"不能包含空格\",\n          \"trigger\": [\n            \"blur\",\n            \"change\"\n          ]\n        }\n      ]\n    }\n  ]\n}\n\n```\n\n\n### 2、远程数据\n\n下拉选择框、单选框等选择类字段，`vue-form-craft`都进行了二次封装，可以直接配置接口参数，来自动获取远程数据。\n\n\n![选项.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d331d1b010c4147a349cfd1664194c4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=392&h=561&s=8318&e=png&b=ffffff)\n\n```js\n{\n      label: \'文章\',\n      component: \'Radio\',\n      props: {\n        mode: \'remote\',\n        placeholder: \'请选择文章\',\n        labelKey: \'title\',\n        valueKey: \'id\',\n        api: {\n          url: \'/current/query/article\',\n          method: \'GET\',\n          params: {},\n          dataPath: \'data\'\n        },\n        optionType: \'circle\',\n        autoSelectedFirst: true,\n        direction: \'vertical\',\n        space: 0\n      },\n      name: \'article\',\n    }\n```\n\n默认使用axios来请求，你也可以在main.js里给组件传入你项目里封装好的axios，然后表单所有组件都会用它来发ajax请求\n\n```js\nimport { createApp } from \'vue\'\nimport App from \'./App.vue\'\nimport VueFormCraft from \'vue-form-craft\'\nimport { request } from \'@/utils\'\n\nconst app = createApp(App)\n\napp.use(VueFormCraft, { request }) //传入你项目里的公共请求方法\napp.mount(\'#app\')\n```\n\n### 3、自增组件\n\n收集一组格式一样的重复数据是表单经常遇到的场景，在 **vue-form-craft** 中可以轻松实现，\n且支持多种展示格式\n\n\n![自增组件1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ac810c6c32e4623ae2972b6e875717e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1034&h=240&s=14463&e=png&b=ffffff)\n\n\n![自增2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/750f600aaccd4140a5af966df6e23c43~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1109&h=214&s=6488&e=png&b=ffffff)\n\n\n![自增3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b694b398ca31482393dd22b51ef94a8d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1289&h=642&s=14458&e=png&b=fefefe)\n\n```js\n{\n  \"labelWidth\": 150,\n  \"labelAlign\": \"right\",\n  \"size\": \"default\",\n  \"items\": [\n    {\n      \"label\": \"增添用户\",\n      \"component\": \"FormList\",\n      \"children\": [\n        {\n          \"label\": \"用户名\",\n          \"component\": \"Input\",\n          \"props\": {\n            \"placeholder\": \"请输入文本\"\n          },\n          \"name\": \"username\",\n        },\n        {\n          \"label\": \"密码\",\n          \"component\": \"Password\",\n          \"props\": {\n            \"placeholder\": \"请输入密码\"\n          },\n          \"name\": \"password\"\n        },\n        {\n          \"label\": \"设为管理员\",\n          \"component\": \"Switch\",\n          \"name\": \"vip\",\n          \"props\": {\n            \"inline-prompt\": 0\n          }\n        }\n      ],\n      \"props\": {\n        \"mode\": \"table\"\n      },\n      \"designKey\": \"design-pMUa\",\n      \"name\": \"users\",\n    }\n  ]\n}\n```\n\n### 4、深层数据绑定\n\n在开发过程中，经常会遇到需要将前端数据转换为符合服务端数据结构的情况。\n\n比如一张表单你收集到的可能是这样的数据：\n\n\n![转换前.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7896ceac613c40b0a802aeb48c95fc6f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=291&h=129&s=1616&e=png&b=ffffff)\n\n而后端希望收到的是这样的数据\n\n\n![转换后.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/072aac2e7eda4290a221e27931fceb48~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=240&h=157&s=1838&e=png&b=ffffff)\n\n\n为了解决这个问题，**name** 字段扩展为魔法字段，既是唯一标识，也是数据路径，可以让你自由指定数据存储的层级。\n\n比如name是【hostname】，数据就会保存为` { hostname: \'xxx\' }`\n\n比如name是【flavor.cpu】，数据就会保存为` { flavor: { cpu:\'xxx\' } }`\n\n比如name是【flavor.memory】，数据就会保存为` { flavor: { memory:\'xxx\' } }`\n\n无论数据层级保存的多深，都能准确追踪，且能精准校验\n\n### 5、组件自定义\n\nvue-form-craft 提供了一些基础组件，例如 Input、Select 和 Radio 等，但有时候这些组件并不能完全符合我们的业务需求，此时可以考虑使用自定义组件(Custom)。\n\n需要将你的组件注册为**全局组件**，并且能够接收v-model\n\n```json\n{\n      \"label\": \"自定义组件\",\n      \"component\": \"Custom\",\n      \"props\": {\n        \"componentName\": \"GridTable\"\n      },\n      \"designKey\": \"design-3J39\",\n      \"name\": \"form-iOOm\"\n}\n```\n\n### 6、支持多种组件库\n\n可能你并不喜欢element ui的组件风格，或者你项目里用的是其他ui库。那么你也可以选择**vue-form-craft** ，因为它提供了ui库定制功能\n\n全局配置`customElements`可以用来定制所有内置组件，比如你想将内置组件替换成`ant-design-vue`风格，示例如下：\n\n```js\nimport { createApp } from \'vue\'\nimport App from \'./App.vue\'\nimport VueFormCraft from \'vue-form-craft\'\nimport { request } from \'@/utils\'\nimport { Switch, Input, Textarea, InputNumber } from \'ant-design-vue\'\n\nconst app = createApp(App)\n\napp.use(VueFormCraft, { \n  request,\n  customElements: {\n      Input: {\n        component: Input,\n        modelName: \'value\'\n      },\n      Switch: {\n        component: Switch,\n        modelName: \'checked\'\n      },\n      Textarea: {\n        component: Textarea,\n        modelName: \'value\'\n      },\n      InputNumber: {\n        component: InputNumber,\n        modelName: \'value\'\n      }\n    }\n})\n\napp.mount(\'#app\')\n\n```\n\n\n![2024-02-27_103328.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9de4840f3f4408599535d96fbc4eef2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1227&h=368&s=7041&e=png&b=ffffff)\n\n可能不同组件库的参数会不一样，比如el都是直接使用`v-model:modelValue`，而ant大部分都是`v-model:value`，所以提供了modelName来指定v-model的名字\n\n而其他参数不一样的问题，可以选择二次封装将组件的props都封装符合el参数格式的组件，再传给customElements\n\n也可以通过**attrs**来自行配置每个字段的**字段配置**，和JsonSchema的items配置一样，配置成符合对应组件库参数的attr表单\n\n```js\n Switch: {\n        component: Switch,\n        modelName: \'checked\',\n        attrs: [\n          { label: \'标签\', component: \'Input\', name: \'label\' },\n          {\n            label: \'唯一标识\',\n            component: \'Input\',\n            name: \'name\',\n            help: \"既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:\'xxx\' } }\"\n          },\n          { label: \'字段说明\', component: \'Textarea\', name: \'help\' },\n          {\n            label: \'占位提示\',\n            component: \'Input\',\n            name: \'props.placeholder\',\n            designKey: \'form-ekRL\'\n          },\n          { label: \'初始值\', component: \'Input\', name: \'initialValue\' },\n          { label: \'是否必填\', component: \'Switch\', name: \'required\' },\n          { label: \'是否只读\', component: \'Switch\', name: \'props.readonly\' },\n          { label: \'是否禁用\', component: \'Switch\', name: \'props.disabled\' },\n          { label: \'隐藏字段\', component: \'Switch\', name: \'hidden\' },\n          { label: \'隐藏标签\', component: \'Switch\', name: \'hideLabel\' }\n        ]\n      }\n```\n\n## 七、写在最后\n\n作为一款开箱即用的表单方案，`vue-form-craft`目标是大幅提高中后台系统中的表单开发效率，让你可以快速创建各种类型的表单，并省略从头编写表单组件的繁琐步骤。我将一直坚持这个初衷，并不断推进协议配置方面的创新和提升，努力提供更加完善的表单开发体验。\n\n后续开发的目标期望：\n\n- 结合ts实现类型化支持\n- 国际化翻译\n- 结合 `vue-form-craft` 开发一套vue低代码平台\n\n如果觉得 **vue-form-craft** 做的不错，或者本文对你有所帮助和启迪，可不可以顺手点个赞😁\n\n如果项目对你有帮助，求个github star！ 谢谢各位帅哥美女(❁´◡`❁)\n\n\n[github源码](https://github.com/xinnian999/vue-form-craft) ', '2025-02-10 15:17:16.460730', '2025-02-10 15:17:16.460730', 1),
(2, '如何提升前端性能优化', '# 如何提升前端性能优化\n\n前端性能优化是提升用户体验的关键因素之一。以下是一些常见的优化技术：\n\n## 1. 资源压缩与合并\n- **CSS 压缩**：通过去除空格、注释和冗余代码来减小文件大小。\n- **JavaScript 压缩**：使用工具如 UglifyJS 来减少文件体积。\n- **图片优化**：使用 WebP 格式替代 PNG 和 JPG。\n\n## 2. 缓存机制\n- **HTTP 缓存**：利用浏览器缓存提高加载速度。\n- **Service Workers**：通过离线缓存减少请求次数，提升体验。\n\n## 3. 代码分割\n- **懒加载**：只加载当前视图需要的资源。\n- **异步模块加载**：使用 Webpack 实现代码按需加载。\n\n## 4. 减少 DOM 操作\n频繁的 DOM 操作会导致性能瓶颈。尽量减少操作次数，合并操作。\n\n## 5. 使用虚拟 DOM\n使用虚拟 DOM（如 React）减少直接操作真实 DOM 的开销。\n', '2025-02-11 14:27:11.444455', '2025-02-11 14:27:11.444455', 1),
(3, 'CSS Grid与Flexbox的使用场景', '# CSS Grid与Flexbox的使用场景\n\nCSS Grid 和 Flexbox 是两种强大的布局工具，它们的适用场景略有不同。\n\n## 1. Flexbox\nFlexbox 适合用于一维布局，即水平或垂直方向上的布局。\n\n### 使用场景：\n- **水平居中**：非常简单地实现元素水平居中。\n- **响应式布局**：在不同设备之间调整元素的排列。\n- **垂直居中**：通过 `align-items: center` 实现垂直居中。\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n', '2025-02-11 14:27:27.970035', '2025-02-11 14:27:27.970035', 1);

-- --------------------------------------------------------

--
-- 表的结构 `article_tags_tag`
--

CREATE TABLE `article_tags_tag` (
  `articleId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `article_tags_tag`
--

INSERT INTO `article_tags_tag` (`articleId`, `tagId`) VALUES
(1, 2),
(1, 5),
(2, 5),
(2, 9),
(3, 8);

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, '前端', NULL, '2025-02-10 15:11:40.143916', '2025-02-10 15:11:40.143916'),
(2, '后端', NULL, '2025-02-10 15:11:46.919639', '2025-02-10 15:11:46.919639'),
(3, '运维', NULL, '2025-02-10 15:11:52.237437', '2025-02-10 15:11:52.237437'),
(4, '生活', NULL, '2025-02-10 15:12:01.420298', '2025-02-10 15:12:01.420298'),
(5, 'Android', NULL, '2025-02-10 15:12:41.528471', '2025-02-10 15:12:41.528471'),
(6, 'ios', NULL, '2025-02-10 15:12:52.938387', '2025-02-10 15:12:52.938387'),
(7, '鸿蒙', NULL, '2025-02-10 15:13:01.449661', '2025-02-10 15:13:01.449661'),
(8, '小程序', NULL, '2025-02-10 15:13:07.457013', '2025-02-10 15:13:07.457013');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `parentCommentId` int(11) DEFAULT NULL,
  `targetCommentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `avatar`, `nickname`, `content`, `created_at`, `parentCommentId`, `targetCommentId`) VALUES
(1, 'https://thirdqq.qlogo.cn/g?b=sdk&k=IXKb3o5lpyE2vkeJVPkrsg&kti=ZsqFggAAAAA&s=640&t=1724544172', '执着～', '111', '2025-02-06 12:13:47.534190', NULL, NULL),
(2, 'https://thirdqq.qlogo.cn/g?b=sdk&k=IXKb3o5lpyE2vkeJVPkrsg&kti=ZsqFggAAAAA&s=640&t=1724544172', '执着～', '1111', '2025-02-06 14:27:59.444273', NULL, NULL),
(3, 'https://thirdqq.qlogo.cn/g?b=sdk&k=INKVFcFyww9p7ao8rBVXaA&s=640&t=1587021150', '心念', '333', '2025-02-06 14:40:17.515409', 2, 2),
(4, 'https://thirdqq.qlogo.cn/g?b=sdk&k=INKVFcFyww9p7ao8rBVXaA&s=640&t=1587021150', '心念', '777', '2025-02-06 14:45:46.416416', 2, 3),
(5, 'https://thirdqq.qlogo.cn/g?b=sdk&k=INKVFcFyww9p7ao8rBVXaA&s=640&t=1587021150', '心念', '哈哈哈哈🤗🤗', '2025-02-06 15:06:29.800063', NULL, NULL),
(6, 'https://thirdqq.qlogo.cn/g?b=sdk&k=INKVFcFyww9p7ao8rBVXaA&s=640&t=1587021150', '心念', '😂😂😂😂😂😂', '2025-02-06 15:06:55.833637', NULL, NULL),
(8, 'https://thirdqq.qlogo.cn/g?b=sdk&k=R66lHDgQfUibvcODwicAg8fQ&s=640&t=1555458837', '掌心的灬温度', '😍😍😍😍', '2025-02-06 15:12:05.417921', 6, 6);

-- --------------------------------------------------------

--
-- 表的结构 `link`
--

CREATE TABLE `link` (
  `id` int(11) NOT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL,
  `url` text,
  `avatar` text,
  `desc` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `link`
--

INSERT INTO `link` (`id`, `status`, `name`, `url`, `avatar`, `desc`, `created_at`, `updated_at`) VALUES
(1, '2', 'Elin‘s Blog', 'https://elin521.cn', 'https://elin521.cn/_next/image?url=%2Fauther_avatar.webp&w=3840&q=75', 'Elin‘s Blog个人博客', '2025-02-10 15:16:33.985538', '2025-02-10 15:16:39.000000');

-- --------------------------------------------------------

--
-- 表的结构 `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tag`
--

INSERT INTO `tag` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'react', NULL, '2025-02-08 17:04:46.170901', '2025-02-08 17:04:46.170901'),
(2, 'vue', NULL, '2025-02-08 17:04:51.145490', '2025-02-08 17:04:51.145490'),
(3, 'linux', NULL, '2025-02-10 15:13:26.623199', '2025-02-10 15:13:26.623199'),
(4, 'ssr', NULL, '2025-02-10 15:13:34.400647', '2025-02-10 15:13:34.400647'),
(5, 'node', NULL, '2025-02-10 15:13:44.474743', '2025-02-10 15:13:44.474743'),
(6, 'nextjs', NULL, '2025-02-10 15:13:54.621233', '2025-02-10 15:13:54.621233'),
(7, 'html', NULL, '2025-02-10 15:14:19.720674', '2025-02-10 15:14:19.720674'),
(8, 'css', NULL, '2025-02-10 15:14:22.869149', '2025-02-10 15:14:22.869149'),
(9, 'js', NULL, '2025-02-10 15:14:28.225219', '2025-02-10 15:14:28.225219');

-- --------------------------------------------------------

--
-- 表的结构 `tag_articles_article`
--

CREATE TABLE `tag_articles_article` (
  `tagId` int(11) NOT NULL,
  `articleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `visit`
--

CREATE TABLE `visit` (
  `id` int(11) NOT NULL,
  `visits` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `visit`
--

INSERT INTO `visit` (`id`, `visits`) VALUES
(1, 445);

--
-- 转储表的索引
--

--
-- 表的索引 `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_12824e4598ee46a0992d99ba553` (`categoryId`);

--
-- 表的索引 `article_tags_tag`
--
ALTER TABLE `article_tags_tag`
  ADD PRIMARY KEY (`articleId`,`tagId`),
  ADD KEY `IDX_9b7dd28292e2799512cd70bfd8` (`articleId`),
  ADD KEY `IDX_5fee2a10f8d6688bd2f2c50f15` (`tagId`);

--
-- 表的索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_73aac6035a70c5f0313c939f237` (`parentCommentId`),
  ADD KEY `FK_80d00966d356f1656978e1cbab4` (`targetCommentId`);

--
-- 表的索引 `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `tag_articles_article`
--
ALTER TABLE `tag_articles_article`
  ADD PRIMARY KEY (`tagId`,`articleId`),
  ADD KEY `IDX_00a259b3084b03e9a6ceaa19c5` (`tagId`),
  ADD KEY `IDX_f5ed2bfd5725e6567b9f5a3d46` (`articleId`);

--
-- 表的索引 `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `link`
--
ALTER TABLE `link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `visit`
--
ALTER TABLE `visit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 限制导出的表
--

--
-- 限制表 `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_12824e4598ee46a0992d99ba553` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `article_tags_tag`
--
ALTER TABLE `article_tags_tag`
  ADD CONSTRAINT `FK_5fee2a10f8d6688bd2f2c50f15e` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9b7dd28292e2799512cd70bfd81` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_73aac6035a70c5f0313c939f237` FOREIGN KEY (`parentCommentId`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_80d00966d356f1656978e1cbab4` FOREIGN KEY (`targetCommentId`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `tag_articles_article`
--
ALTER TABLE `tag_articles_article`
  ADD CONSTRAINT `FK_00a259b3084b03e9a6ceaa19c5d` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f5ed2bfd5725e6567b9f5a3d46b` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
