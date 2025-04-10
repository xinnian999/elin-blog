-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- 主机： elin-blog-db:3306
-- 生成日期： 2025-04-10 17:21:16
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
(1, 'JS闭包简析', '**闭包**是 JavaScript 中的一种重要概念，指的是函数可以记住并访问它定义时的词法作用域，即使该函数在外部执行时，也能访问定义时的作用域中的变量。\n\n## 闭包的形成\n闭包通常在以下两种情况形成：\n1. **内部函数引用外部函数的变量**：当内部函数访问外部函数的变量时，形成闭包。\n2. **返回一个内部函数**：如果一个函数返回了它的内部函数，而该内部函数依然可以访问外部函数的变量，闭包便形成了。\n\n## 示例\n```javascript\nfunction outer() {\n    let count = 0;\n    \n    function inner() {\n        count++;\n        console.log(count);\n    }\n    \n    return inner;\n}\n\nconst increment = outer();\nincrement();  // 输出: 1\nincrement();  // 输出: 2\n```\n\n在这个例子中，inner 函数在外部执行时，依然能够访问到 outer 函数的变量 count，这就是闭包。\n\n## 闭包的特性\n\n1. 保存状态：闭包可以“记住”函数外部的变量，从而可以在多个调用之间保持状态。\n2. 作用域链：闭包的作用域链由它定义时的上下文决定。\n3. 避免污染全局变量：闭包使得我们能够将数据隐藏在内部作用域中，避免了全局变量的污染。\n\n## 使用场景\n\n1. 数据封装：通过闭包可以隐藏变量，使其不会被外部直接修改。\n2. 函数式编程：闭包使得函数可以作为“柯里化”（Currying）或“偏函数”（Partial Function）的一部分，灵活地传递数据。\n3. 事件处理：闭包常用于事件处理器中，可以保持对事件的引用。\n\n## 闭包的注意事项\n\n1. 内存泄漏：闭包会保持外部函数的作用域，可能导致内存不能及时释放，因此要注意使用时的内存管理。\n2. 调试复杂性：因为闭包会“记住”外部函数的变量，调试时可能会让变量的生命周期变得复杂。\n闭包是 JavaScript 强大的工具，理解它的特性和用法，可以让我们编写更加简洁、高效且可维护的代码。', '2019-02-19 12:04:11.838157', '2025-03-19 17:34:55.341047', 1),
(2, 'Flex布局知识', '**Flex 布局**是 CSS 中的一种强大布局方式，旨在让容器内的元素能更灵活地排列。通过使用 `display: flex`，可以轻松控制元素的对齐、方向和间距等。\n\n## Flex 布局的基本概念\n\nFlex 布局是基于 **容器** 和 **项** 这两个概念的。通过设置容器的 `display: flex`，它的直接子元素会成为 Flex 项。\n\n### 容器属性：\n- `flex-direction`: 设置主轴的方向，决定了项的排列方向。可选值：\n  - `row`（默认）：横向排列\n  - `column`: 纵向排列\n  - `row-reverse`: 横向反向排列\n  - `column-reverse`: 纵向反向排列\n- `justify-content`: 设置主轴上对齐方式。可选值：\n  - `flex-start`（默认）：靠左对齐\n  - `flex-end`: 靠右对齐\n  - `center`: 居中对齐\n  - `space-between`: 两端对齐，项目之间有相等的间隔\n  - `space-around`: 每个项目两侧的间隔相等\n- `align-items`: 设置交叉轴上对齐方式。可选值：\n  - `flex-start`: 顶部对齐\n  - `flex-end`: 底部对齐\n  - `center`: 垂直居中\n  - `stretch`（默认）：拉伸以填充容器\n  - `baseline`: 按基线对齐\n- `align-self`: 允许单个项在交叉轴上有不同的对齐方式，覆盖 `align-items`。\n\n### 项属性：\n- `flex-grow`: 定义项目的放大比例，默认值为 `0`，表示如果有剩余空间，项目不会放大。\n- `flex-shrink`: 定义项目的缩小比例，默认值为 `1`，表示如果空间不足，项目会缩小。\n- `flex-basis`: 定义项目的初始大小，默认值为 `auto`，表示根据项目内容决定。\n- `flex`: 是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的简写形式。\n- `align-self`: 覆盖容器的 `align-items` 属性，为单个项设置独立的对齐方式。\n\n## 示例\n```html\n<div style=\"display: flex; justify-content: center; align-items: center;\">\n  <div style=\"width: 100px; height: 100px; background-color: red;\">1</div>\n  <div style=\"width: 100px; height: 100px; background-color: blue;\">2</div>\n  <div style=\"width: 100px; height: 100px; background-color: green;\">3</div>\n</div>\n```\n在这个例子中，三个项目会被水平和垂直居中对齐。\n\n## Flex 布局的优势\n1. **简单**：Flex 布局通过少量的 CSS 属性就可以轻松实现复杂的布局。\n2. **灵活性**：它能适应不同屏幕尺寸，避免了传统布局的局限性。\n3. **易于实现响应式设计**：通过调整容器和项的属性，能快速实现不同的显示效果。\n\n## 使用场景\n- **水平垂直居中**：通过 `justify-content` 和 `align-items` 可以轻松实现居中。\n- **等高布局**：使多个项高度一致，或者根据内容动态调整。\n- **响应式布局**：在不同的屏幕宽度下，使用 `flex-wrap` 和 `flex-basis` 等属性来自动调整项的排列。\n\n## 注意事项\n1. **兼容性**：尽管 Flex 布局在现代浏览器中支持良好，但某些老旧浏览器（如 IE10 以下）可能不完全支持。\n2. **布局限制**：对于极复杂的布局，可能仍需使用其他 CSS 技巧或 Grid 布局。\n\nFlex 布局使得开发人员可以更加高效地构建灵活、响应式的布局，它简单、易用且强大。\n', '2019-02-25 16:51:08.827457', '2025-04-10 17:20:12.368903', 1),
(3, 'Javascript原型链知识梳理', '**原型链**是 JavaScript 中对象继承机制的核心，指的是对象之间的继承关系通过原型链来实现。当访问一个对象的属性或方法时，JavaScript 会按照原型链的顺序逐级向上查找，直到找到该属性或方法，或者到达原型链的末端 `null`。\n\n## 原型链的基本概念\n\n每个 JavaScript 对象都有一个内部属性 `[[Prototype]]`，指向它的原型对象。通过 `__proto__` 可以访问这个属性（虽然不推荐直接使用）。\n\n- **构造函数的 `prototype`**：每个函数都有一个 `prototype` 属性，指向其原型对象。\n- **实例的 `__proto__`**：每个对象的 `__proto__` 属性指向它的构造函数的 `prototype`。\n\n当访问对象的属性时，首先会在对象本身查找，如果没有找到，则会沿着 `__proto__` 查找，直到查找到 `null` 为止。\n\n## 示例\n\n```javascript\nfunction Person(name) {\n    this.name = name;\n}\n\nPerson.prototype.sayHello = function() {\n    console.log(`Hello, my name is ${this.name}`);\n};\n\nconst person1 = new Person(\'Alice\');\nperson1.sayHello();  // 输出: Hello, my name is Alice\n```\n在上面的例子中，person1 对象没有 `sayHello` 方法，因此 JavaScript 会查找 `person1.__proto__`，即 `Person.prototype`，找到该方法并调用它。\n\n## 原型链的结构\n\n每个对象都会有一个原型链。假设有一个对象 `obj`，它的原型链结构大致如下：\n\n`obj → obj.proto → obj.proto.proto → ... → null`\n\n\n- `obj` 是实例对象。\n- `obj.__proto__` 是 `obj` 的原型（即构造函数的 `prototype`）。\n- `obj.__proto__.__proto__` 是原型的原型，依此类推，直到 `null` 为止。\n\n## 原型链的优势\n1. **代码复用**：通过原型链，可以共享方法和属性，避免在每个实例上重复定义相同的内容。\n2. **灵活的继承机制**：原型链让 JavaScript 实现了类似类的继承功能，即便 JavaScript 是基于原型的面向对象语言。\n\n## 使用原型链时的注意事项\n1. **性能问题**：虽然原型链是继承的核心，但过长的原型链会影响查找性能。\n2. **修改原型会影响所有实例**：如果修改了构造函数的原型，所有通过该构造函数创建的实例都会受到影响，这需要小心使用。\n\n## 原型链与 `Object.create()`\n`Object.create()` 可以用来创建一个指定原型的新对象，这使得原型链的操作更加灵活。\n\n```javascript\nconst personProto = {\n    sayHello() {\n        console.log(\'Hello!\');\n    }\n};\n\nconst person1 = Object.create(personProto);\nperson1.sayHello();  // 输出: Hello!\n```\n\n## 总结\n原型链是 JavaScript 继承的基础机制，它允许对象通过原型来继承属性和方法。理解原型链对于深入理解 JavaScript 的对象模型和继承机制至关重要。', '2020-02-25 16:59:17.514734', '2025-04-10 17:20:07.178303', 1),
(4, 'React和Vue框架对比', '# React 和 Vue 对比\n\nReact 和 Vue 是目前最受欢迎的前端框架/库，它们都能帮助开发者构建高效、可维护的用户界面。尽管它们有许多相似之处，但也有一些显著的差异。本文将对比这两个框架的核心特性、开发体验、性能等方面，帮助你做出选择。\n\n## 1. 概念\n\n- **React**：React 是由 Facebook 开发和维护的一个 JavaScript 库，专注于构建用户界面，尤其适用于构建单页应用（SPA）。它采用声明式编程模型，主要通过虚拟 DOM 进行高效更新。React 本身只处理视图层（V），开发者通常需要使用额外的库来处理路由、状态管理等。\n\n- **Vue**：Vue 是由尤雨溪（Evan You）主导开发的一个渐进式框架。Vue 同样基于虚拟 DOM，并采用声明式编程，但它是一个更全面的框架，提供了更多内建的功能，如路由、状态管理、表单处理等。Vue 以其易学性、灵活性和文档质量受到开发者喜爱。\n\n## 2. 学习曲线\n\n- **React**：React 的学习曲线相对较陡，尤其是对于初学者来说。虽然 React 本身的核心概念（如组件、JSX、虚拟 DOM）并不复杂，但 React 的生态系统十分庞大，涉及到许多额外的库，如 React Router、Redux、Context API 等，需要花费时间掌握。\n\n- **Vue**：Vue 提供了更简单、更直观的 API，学习曲线较为平缓。Vue 的文档也非常全面，几乎可以一步步指导你完成从入门到精通的过程。它的模板语法和 React 的 JSX 比较相似，但更接近 HTML，容易上手。\n\n## 3. 数据绑定\n\n- **React**：React 使用单向数据流，组件的状态（State）可以通过 `setState` 更新，数据更新时会触发视图的重新渲染。React 没有内建的双向数据绑定机制，开发者需要手动处理表单数据的变化。\n\n- **Vue**：Vue 提供了双向数据绑定（通过 `v-model` 指令），使得表单元素与数据之间的同步变得简单。Vue 的双向绑定使得开发者无需手动处理输入框的状态变更，更符合传统 Web 开发中的习惯。\n\n## 4. 组件化与开发体验\n\n- **React**：React 强调将 UI 分解成小的可重用组件，组件通过 props 和 state 来管理数据和行为。React 使用 JSX，允许在 JavaScript 中写 HTML，这为开发者提供了更强的灵活性，但可能让某些开发者感到陌生。\n\n- **Vue**：Vue 也支持组件化，组件可以通过 `props` 和 `data` 来传递数据和状态。Vue 使用模板语法来编写 HTML，使得代码更接近传统的 HTML、CSS 和 JavaScript 的结构。此外，Vue 的单文件组件（SFC）格式将模板、脚本和样式封装在一个文件中，易于组织和管理。\n\n## 5. 虚拟 DOM 与性能\n\n- **React**：React 通过虚拟 DOM 进行高效的渲染更新。当组件的 state 或 props 发生变化时，React 会比较新旧虚拟 DOM 的差异，并以最小的代价更新实际的 DOM。这种策略显著提高了性能，特别是在复杂的应用中。\n\n- **Vue**：Vue 同样使用虚拟 DOM，并且实现了细粒度的观察系统，通过依赖追踪和懒更新策略来优化性能。Vue 的响应式系统比 React 的 `setState` 更加精细化，使得更新更高效。\n\n## 6. 生态系统与社区\n\n- **React**：React 拥有一个非常庞大和成熟的生态系统，社区活跃，插件和库非常多，几乎所有前端开发的需求都能找到对应的解决方案。React 还得到了许多大公司（如 Facebook、Instagram、Netflix、Airbnb）的支持和使用。\n\n- **Vue**：Vue 的生态系统相对较小，但它正在迅速成长。Vue 提供了一些官方库，如 Vue Router 和 Vuex，这些库可以满足大多数开发需求。Vue 在小型和中型项目中非常流行，许多初创公司和个人开发者都青睐 Vue。\n\n## 7. 适用场景\n\n- **React**：React 适用于大型、复杂的单页应用，尤其是需要处理大量交互和高性能需求的项目。React 的灵活性和丰富的生态系统使它成为大规模应用开发的理想选择。\n\n- **Vue**：Vue 适用于快速开发和原型制作，也适合用于中小型项目。由于 Vue 学习成本低且易于集成，它特别适合团队和个人开发者的快速开发。\n\n## 8. 总结\n\n| 特性                | React                         | Vue                           |\n|---------------------|-------------------------------|-------------------------------|\n| **学习曲线**        | 陡峭，尤其是生态系统较大      | 平缓，易于上手                 |\n| **数据绑定**        | 单向数据流                    | 双向数据绑定                  |\n| **组件化**          | JSX，灵活性强                 | 模板语法，单文件组件（SFC）    |\n| **虚拟 DOM**        | 高效，差异化更新               | 更细粒度的依赖追踪，性能优化   |\n| **生态系统**        | 大型，成熟，插件丰富           | 小型，但正在快速发展           |\n| **适用场景**        | 大型应用，复杂交互            | 中小型项目，快速开发原型       |\n\nReact 和 Vue 各有其优势，选择哪个框架取决于项目需求、团队经验以及开发者的个人偏好。React 适合构建大型、复杂的应用，具有强大的生态系统，而 Vue 则因其简洁性和易学性适合快速开发和中小型项目。两者都可以帮助开发者高效地构建现代化的 Web 应用。\n\n', '2021-02-25 17:21:26.800715', '2025-04-10 17:20:00.749183', 1),
(5, 'Java学习笔记', '# Java 学习上手笔记\n\nJava 是一种广泛使用的面向对象编程语言，广泛应用于企业级应用、Android 开发、Web 开发等领域。本篇笔记旨在帮助 Java 初学者快速入门，掌握 Java 的基础语法和常用概念。\n\n## Java 环境搭建\n\n- **安装 JDK**：下载并安装 Java 开发工具包（JDK），可以从官网 [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html) 或开源的 [OpenJDK](https://adoptopenjdk.net/) 获取。\n- **配置环境变量**：\n  - `JAVA_HOME`：指向 JDK 安装路径。\n  - `PATH`：将 `JAVA_HOME/bin` 加入 PATH 环境变量，方便命令行直接使用 Java。\n  - `CLASSPATH`：指定类库路径（通常在 Windows 中不再手动配置）。\n\n## Hello World 程序\n\nJava 的第一个程序是一个简单的 \"Hello World\" 输出，通常用于验证开发环境是否正确配置。\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```\n\n- `public class HelloWorld`：定义一个类 `HelloWorld`，类名应与文件名相同。\n- `public static void main(String[] args)`：Java 程序的入口方法，`main` 方法是执行程序时首先调用的方法。\n- `System.out.println(\"Hello, World!\");`：输出到控制台。\n\n## 变量与数据类型\n\nJava 是静态类型语言，变量在使用之前必须声明其类型。常见的数据类型有：\n\n- **基本数据类型**：\n  - `int`：整数类型\n  - `double`：浮点类型\n  - `char`：字符类型\n  - `boolean`：布尔类型\n\n```java\npublic class DataTypes {\n    public static void main(String[] args) {\n        int num = 10;\n        double price = 99.99;\n        char grade = \'A\';\n        boolean isActive = true;\n\n        System.out.println(\"Number: \" + num);\n        System.out.println(\"Price: \" + price);\n        System.out.println(\"Grade: \" + grade);\n        System.out.println(\"Active: \" + isActive);\n    }\n}\n```\n\n- 变量 `num` 存储整数，`price` 存储浮点数，`grade` 存储字符，`isActive` 存储布尔值。\n\n## 控制流语句\n\nJava 中的控制流语句包括 `if` 语句、`for` 循环、`while` 循环等，用于控制程序的执行流程。\n\n### if 语句\n\n```java\npublic class IfStatement {\n    public static void main(String[] args) {\n        int num = 20;\n\n        if (num > 10) {\n            System.out.println(\"Number is greater than 10\");\n        } else {\n            System.out.println(\"Number is less than or equal to 10\");\n        }\n    }\n}\n```\n- `if` 判断条件是否成立，如果成立，则执行对应的代码块。\n\n### for 循环\n\njava\npublic class ForLoop {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(\"Iteration: \" + i);\n        }\n    }\n}\n\n- `for` 循环用于重复执行某些操作，直到满足条件。\n\n## 5. 面向对象编程（OOP）\n\nJava 是一种面向对象的编程语言，支持类与对象的创建、继承、封装和多态。\n\n### 定义类与对象\n\n```java\npublic class Person {\n    String name;\n    int age;\n\n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public void introduce() {\n        System.out.println(\"My name is \" + name + \" and I am \" + age + \" years old.\");\n    }\n\n    public static void main(String[] args) {\n        Person person = new Person(\"Alice\", 30);\n        person.introduce();\n    }\n}\n```\n- 定义了 `Person` 类，包含 `name` 和 `age` 属性以及一个 `introduce` 方法。\n- 在 `main` 方法中创建了一个 `Person` 对象并调用其方法。\n\n## 数组\n\nJava 中的数组用于存储固定大小的同类型元素。\n\n```java\npublic class ArrayExample {\n    public static void main(String[] args) {\n        int[] numbers = {1, 2, 3, 4, 5};\n\n        for (int num : numbers) {\n            System.out.println(num);\n        }\n    }\n}\n```\n- 定义一个整型数组 `numbers`，并通过增强型 `for` 循环输出数组中的每个元素。\n\n## 异常处理\n\nJava 提供了 `try-catch` 语句来处理可能发生的异常，确保程序在发生错误时能够正常运行。\n\n```java\npublic class ExceptionExample {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0; // 可能会抛出异常\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error: \" + e.getMessage());\n        }\n    }\n}\n```\n- 使用 `try` 块包围可能发生异常的代码，`catch` 块捕捉异常并处理。\n\n## 总结\n\nJava 是一种强类型、面向对象的编程语言，适用于多种开发场景。掌握 Java 的基础语法和核心概念，为进一步学习高级特性（如多线程、网络编程、Java 8 新特性等）打下坚实的基础。\n', '2022-02-25 17:29:51.785062', '2025-04-10 17:19:57.007639', 2),
(6, 'docker学习笔记', '# Docker 上手指南\n\nDocker 是一种开源的容器化技术，它能够将应用及其依赖打包到一个可移植的容器中，在任何环境下运行。容器技术使得开发、测试、部署变得更加简便和高效。本文将介绍 Docker 的基础知识和常见用法，帮助你快速上手。\n\n## 1. Docker 安装\n\n### 安装 Docker\n- **Windows**：可以从 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop) 下载并安装。\n- **macOS**：可以从 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop) 下载并安装。\n- **Linux**：可以根据你的 Linux 发行版安装 Docker，具体可以参考 [Docker 官方安装文档](https://docs.docker.com/get-docker/)。\n\n安装完成后，可以通过以下命令验证 Docker 是否成功安装：\n\n```bash\ndocker --version\n```\n\n如果安装成功，会显示 Docker 的版本信息。\n\n## 2. Docker 基础概念\n\n- **镜像 (Image)**：镜像是一个包含应用和运行环境的只读模板。通过镜像创建容器。\n- **容器 (Container)**：容器是镜像的运行实例，它是一个隔离的环境，提供了应用所需的操作系统环境和依赖。\n- **Dockerfile**：一个文本文件，包含构建 Docker 镜像的指令。通过 Dockerfile 可以自动化构建过程。\n- **Docker Hub**：一个公共的 Docker 镜像仓库，存储了大量的公开镜像，用户可以下载和上传镜像。\n\n## 3. Docker 基本命令\n\n### 启动 Docker 容器\n\n```docker\ndocker run hello-world\n```\n- 该命令会从 Docker Hub 下载 `hello-world` 镜像并启动一个容器。如果是第一次使用 Docker，这将是一个快速的验证步骤，确保 Docker 安装正确。\n\n### 查看正在运行的容器\n\n```docker\ndocker ps\n```\n\n- 显示当前正在运行的容器列表。\n\n### 查看所有容器（包括停止的容器）\n\ndocker\ndocker ps -a\n\n- 显示所有容器的状态（包括停止的容器）。\n\n### 停止容器\n\n```docker\ndocker stop <container_id>\n```\n- 停止指定的容器，可以通过 `docker ps` 获取容器 ID。\n\n### 删除容器\n\n```docker\ndocker rm <container_id>\n```\n- 删除已停止的容器。\n\n### 拉取镜像\n\n```docker\ndocker pull <image_name>\n```\n- 从 Docker Hub 下载指定的镜像。例如，`docker pull ubuntu` 会下载 Ubuntu 镜像。\n\n### 删除镜像\n\n```docker\ndocker rmi <image_name>\n```\n- 删除指定的镜像。例如，`docker rmi ubuntu` 会删除 Ubuntu 镜像。\n\n## 4. Dockerfile 构建镜像\n\nDockerfile 是一个包含一组指令的文件，通过这些指令来定义镜像的构建过程。\n\n### 示例 Dockerfile\n\n```docker\nFROM ubuntu:20.04\n\n# 安装必要的软件\nRUN apt-get update && apt-get install -y python3 python3-pip\n\n# 设置工作目录\nWORKDIR /app\n\n# 将当前目录内容复制到容器的 /app 目录\nCOPY . /app\n\n# 安装依赖\nRUN pip3 install -r requirements.txt\n\n# 容器启动时运行 Python 应用\nCMD [\"python3\", \"app.py\"]\n```\n### 构建镜像\n\n```docker\ndocker build -t my-python-app .\n```\n- `-t` 用于给镜像命名，`my-python-app` 是镜像名称，`.` 表示当前目录。\n\n## 5. **容器与卷 (Volumes)**\n\n### 创建并挂载卷\n\n```docker\ndocker volume create my_volume\n```\n- 创建一个名为 `my_volume` 的卷。\n\n### 启动容器并挂载卷\n\n```docker\ndocker run -d -v my_volume:/data my-python-app\n```\n- 使用 `-v` 参数将容器中的 `/data` 目录挂载到 `my_volume` 卷。\n\n### 查看所有卷\n\n```docker\ndocker volume ls\n```\n- 列出所有卷。\n\n## 6. Docker Compose\n\nDocker Compose 是用于定义和运行多个容器的工具。通过一个 YAML 文件（`docker-compose.yml`），你可以定义所有服务、网络和卷等。\n\n### 示例 docker-compose.yml\n\n```yaml\nversion: \'3\'\nservices:\n  web:\n    image: nginx\n    ports:\n      - \"8080:80\"\n  app:\n    build: .\n    volumes:\n      - .:/app\n    ports:\n      - \"5000:5000\"\n```\n- `web` 服务使用 `nginx` 镜像，并将容器的 80 端口映射到宿主机的 8080 端口。\n- `app` 服务从当前目录构建镜像，并将宿主机的当前目录挂载到容器的 `/app` 目录。\n\n### 启动服务\n\n```docker\ndocker-compose up\n```\n- 启动并运行 `do\n', '2023-02-25 17:39:18.193271', '2025-04-10 17:19:44.109953', 3),
(7, 'Nginx学习笔记', '# Nginx 笔记\n\nNginx 是一个高性能的 Web 服务器和反向代理服务器，广泛用于处理静态文件、负载均衡、反向代理等场景。它的设计高效、轻量，支持高并发，是开发和运维人员必备的工具之一。\n\n## 1. Nginx 安装\n\n### 在 Linux 上安装 Nginx\n\n使用以下命令在基于 Debian 的系统上安装 Nginx（例如 Ubuntu）：\n\nbash\nsudo apt update\nsudo apt install nginx\n\n对于基于 Red Hat 的系统（例如 CentOS）：\n\nbash\nsudo yum install nginx\n\n### 在 macOS 上安装 Nginx\n\n使用 Homebrew 安装：\n\nbash\nbrew install nginx\n\n### 启动 Nginx\n\n安装完成后，可以使用以下命令启动 Nginx 服务：\n\nbash\nsudo systemctl start nginx\n\n### 设置 Nginx 开机自启\n\nbash\nsudo systemctl enable nginx\n\n## 2. Nginx 配置文件结构\n\nNginx 的主配置文件位于 `/etc/nginx/nginx.conf`，其他配置文件通常存储在 `/etc/nginx/sites-available/` 和 `/etc/nginx/sites-enabled/` 中。\n\n- `nginx.conf`：主要配置文件，控制 Nginx 的全局设置和模块配置。\n- `sites-available/`：存放各个虚拟主机的配置文件。\n- `sites-enabled/`：存放被启用的虚拟主机配置文件的符号链接。\n\n## 3. Nginx 基本配置\n\n### 监听端口和绑定 IP\n\nNginx 通过 `listen` 指令来指定监听的端口和 IP 地址。例如，监听 80 端口的 HTTP 请求：\n\n```nginx\nserver {\n    listen 80;\n    server_name example.com;\n    root /var/www/html;\n    \n    location / {\n        try_files $uri $uri/ =404;\n    }\n}\n```', '2024-02-25 17:48:04.276747', '2025-04-10 17:19:32.034596', 3),
(8, '作为一名 27 岁程序员的思考5', '27 岁，站在人生的一个小节点上，看着身边的朋友们逐渐有了自己的方向和节奏，而我依然在键盘上敲击代码，面对着不尽人意的 bug，和琐碎的任务。这个年纪，或许是个迷茫的年纪，也可能是个充满机会和挑战的年纪，生活仿佛在告诉我：你不再年轻，但你仍有无限可能。\n\n## 焦虑与压力：不再是曾经的无忧无虑\n\n回想起刚进入职场的那几年，身边的伙伴们在追求着梦想，每个人都充满着热情和斗志，那时候的我，似乎并不懂得什么是“压力”。在工作之余，我们可以有更多的闲暇时间去探索、去旅行，生活总是充满着期待。\n\n然而，随着年岁的增长，进入 27 岁后，工作的压力逐渐变得明显。客户需求的不断变化、代码问题的层出不穷、和团队的协作挑战，逐渐让我明白，工作和生活之间的平衡越来越难以维持。我开始不自觉地焦虑，害怕自己停下脚步会被时代淘汰。\n\n## 持续学习：技术与生活的双重进化\n\n做程序员，永远需要学习。你永远不可能掌握所有的知识，但你可以始终保持学习的心态。27 岁的我，虽然不再像20岁那样有冲动地去挑战各种技术栈，但我明白，技术更新的速度从未停歇，保持进步，才是长久之计。\n\n但学习不仅仅是为了职业上的提升，生活也是一种进化。我逐渐学会了放慢脚步，享受生活中的细节。从早晨的第一缕阳光，到和朋友一起喝的那杯咖啡，再到每晚的一本好书，这些点滴的幸福都让我更加理解，生活不仅是追求目标的过程，它本身也是一种享受。\n\n## 成长与接受：不完美才是常态\n\n渐渐地，我学会了接受不完美的自己。在追求技术进步和职业发展的过程中，很多时候我会陷入“完美主义”的陷阱，希望一切都做到最好。然而，经历过一些项目的失败与困境后，我明白了：完美并非唯一的追求，不完美才是常态。\n\n在生活中，和人相处亦是如此。我们都不是完美的个体，有时工作上会犯错，人际关系中也可能有摩擦。27 岁的我开始更加包容自己和他人，不再纠结每个细节，接受不完美，并从中成长。\n\n## 未来：不焦虑，不盲目\n\n对于未来，我不再抱有过高的期待，但也不希望自己停滞不前。27 岁的我明白，成功并不是一蹴而就的，而是一个渐进的过程。只要持续努力，脚踏实地地前进，未来的路依然会充满希望。\n\n总的来说，27 岁对我而言，不仅仅是年龄的增长，更是心态上的成熟。在这个快速变化的时代，唯有不断进步，并学会享受当下，才是我们走得更远的动力。\n\n', '2025-02-25 17:53:28.270803', '2025-04-10 17:19:23.772965', 4);

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
(1, 9),
(2, 7),
(2, 8),
(3, 9),
(4, 1),
(4, 2),
(4, 9),
(5, 10),
(6, 3),
(6, 11),
(7, 3),
(7, 13),
(8, 15);

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
(1, '前端', NULL, '2025-02-10 15:11:40.143916', '2025-03-31 16:56:06.000000'),
(2, '后端', NULL, '2025-02-10 15:11:46.919639', '2025-02-10 15:11:46.919639'),
(3, '运维', NULL, '2025-02-10 15:11:52.237437', '2025-02-10 15:11:52.237437'),
(4, '生活', NULL, '2025-02-10 15:12:01.420298', '2025-02-10 15:12:01.420298'),
(5, 'Android', NULL, '2025-02-10 15:12:41.528471', '2025-02-10 15:12:41.528471'),
(6, 'ios', NULL, '2025-02-10 15:12:52.938387', '2025-02-10 15:12:52.938387'),
(7, '鸿蒙', NULL, '2025-02-10 15:13:01.449661', '2025-04-03 11:30:28.000000');

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
  `targetCommentId` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `parentArticleId` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  `ip` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `avatar`, `nickname`, `content`, `created_at`, `parentCommentId`, `targetCommentId`, `type`, `parentArticleId`, `email`, `likes`, `ip`, `country`, `region`, `city`, `browser`, `os`) VALUES
(1, 'https://thirdqq.qlogo.cn/g?b=sdk&k=IXKb3o5lpyE2vkeJVPkrsg&kti=ZsqFggAAAAA&s=640&t=1724544172', 'Elin', '第一', '2025-04-10 17:13:11.121507', NULL, NULL, 'comment', NULL, '3307578337@qq.com', 0, NULL, NULL, NULL, NULL, 'Chrome 132.0.0.0', 'macOS 10.15.7'),
(2, 'https://thirdqq.qlogo.cn/g?b=sdk&k=INKVFcFyww9p7ao8rBVXaA&s=640&t=1587021150', '心念', '666', '2025-04-10 17:16:20.824823', NULL, NULL, 'comment', NULL, '2452891172@qq.com', 0, NULL, NULL, NULL, NULL, 'Chrome 132.0.0.0', 'macOS 10.15.7');

-- --------------------------------------------------------

--
-- 表的结构 `form`
--

CREATE TABLE `form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `schema` text NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `form`
--

INSERT INTO `form` (`id`, `name`, `schema`, `created_at`, `updated_at`) VALUES
(22, '文章 - 新增or修改', '{\"items\":[{\"component\":\"Input\",\"designKey\":\"design-0Zp6\",\"name\":\"title\",\"label\":\"文章标题\",\"props\":{\"placeholder\":\"请输入文本\"},\"required\":true},{\"label\":\"文章分类\",\"props\":{\"mode\":\"remote\",\"options\":[{\"label\":\"选项1\",\"value\":\"value1\"},{\"label\":\"选项2\",\"value\":\"value2\"},{\"label\":\"选项3\",\"value\":\"value3\"}],\"placeholder\":\"请选择...\",\"api\":{\"url\":\"/category\",\"method\":\"GET\",\"params\":{},\"dataPath\":\"list\"},\"labelKey\":\"name\",\"valueKey\":\"id\",\"disabledKey\":\"disabled\",\"style\":{\"width\":\"40%\"}},\"component\":\"Select\",\"designKey\":\"design-gLSB\",\"name\":\"category\",\"required\":true},{\"label\":\"标签\",\"props\":{\"mode\":\"remote\",\"options\":[{\"label\":\"选项1\",\"value\":\"value1\"},{\"label\":\"选项2\",\"value\":\"value2\"},{\"label\":\"选项3\",\"value\":\"value3\"}],\"placeholder\":\"请选择...\",\"api\":{\"url\":\"/tag\",\"method\":\"GET\",\"params\":{\"pageSize\":1000},\"dataPath\":\"list\"},\"labelKey\":\"name\",\"valueKey\":\"id\",\"disabledKey\":\"disabled\",\"multiple\":true,\"style\":{\"width\":\"40%\"}},\"component\":\"Select\",\"designKey\":\"form-EmvN\",\"name\":\"tags\",\"required\":true},{\"label\":\"markdown编辑器\",\"component\":\"Markdown\",\"designKey\":\"design-51aD\",\"name\":\"content\",\"required\":true}],\"labelWidth\":150,\"labelAlign\":\"right\",\"size\":\"default\"}', '2025-03-28 17:15:43.527981', '2025-04-03 15:27:41.000000'),
(24, '分类 - 新增 or 修改', '{\"items\":[{\"component\":\"Input\",\"designKey\":\"design-Prw1\",\"name\":\"name\",\"label\":\"名称\",\"props\":{\"placeholder\":\"请输入分类名称\"}}],\"labelWidth\":150,\"labelAlign\":\"top\",\"size\":\"default\"}', '2025-03-31 16:50:12.215017', '2025-04-03 15:21:10.000000'),
(25, '标签 - 新增/修改', '{\"items\":[{\"component\":\"Input\",\"designKey\":\"design-OovG\",\"name\":\"name\",\"label\":\"名称\",\"props\":{\"placeholder\":\"请输入标签名\"}}],\"labelWidth\":150,\"labelAlign\":\"right\",\"size\":\"default\"}', '2025-03-31 18:04:59.733215', '2025-04-03 15:20:59.000000'),
(26, '文章管理-搜索', '{\"items\":[{\"component\":\"Input\",\"designKey\":\"design-NS02\",\"name\":\"title\",\"label\":\"文章名称\",\"props\":{\"placeholder\":\"请输入文章名称\"}},{\"label\":\"分类\",\"props\":{\"mode\":\"remote\",\"options\":[{\"label\":\"选项1\",\"value\":\"value1\"},{\"label\":\"选项2\",\"value\":\"value2\"},{\"label\":\"选项3\",\"value\":\"value3\"}],\"placeholder\":\"请选择分类\",\"api\":{\"url\":\"/category\",\"method\":\"GET\",\"params\":{},\"dataPath\":\"list\"},\"labelKey\":\"name\",\"valueKey\":\"id\",\"disabledKey\":\"disabled\"},\"component\":\"Select\",\"designKey\":\"design-3Mni\",\"name\":\"category\"},{\"label\":\"标签\",\"props\":{\"mode\":\"remote\",\"options\":[{\"label\":\"选项1\",\"value\":\"value1\"},{\"label\":\"选项2\",\"value\":\"value2\"},{\"label\":\"选项3\",\"value\":\"value3\"}],\"placeholder\":\"请选择标签\",\"api\":{\"url\":\"/tag\",\"method\":\"GET\",\"params\":{\"pageSize\":1000},\"dataPath\":\"list\"},\"labelKey\":\"name\",\"valueKey\":\"id\",\"disabledKey\":\"disabled\",\"multiple\":true},\"component\":\"Select\",\"designKey\":\"design-GN2R\",\"name\":\"tags\"}],\"labelWidth\":100,\"labelAlign\":\"right\",\"size\":\"default\"}', '2025-04-01 10:40:45.321875', '2025-04-03 15:17:56.000000'),
(27, '友链 - 新增', '{\"items\":[{\"component\":\"Input\",\"designKey\":\"design-3Ilr\",\"name\":\"name\",\"label\":\"网站名称\",\"props\":{\"placeholder\":\"请输入网站名称\"},\"required\":true},{\"component\":\"Input\",\"designKey\":\"design-Mhmd\",\"name\":\"url\",\"label\":\"网站地址\",\"props\":{\"placeholder\":\"请输入网站名称\"},\"required\":true},{\"component\":\"Input\",\"designKey\":\"form-0lDp\",\"name\":\"avatar\",\"label\":\"网站头像\",\"props\":{\"placeholder\":\"请输入网站头像地址\"},\"required\":true},{\"component\":\"Input\",\"designKey\":\"design-V6eJ\",\"name\":\"desc\",\"label\":\"网站描述\",\"props\":{\"placeholder\":\"请输入网站描述\"},\"required\":true}],\"labelWidth\":150,\"labelAlign\":\"right\",\"size\":\"default\"}', '2025-04-03 16:23:03.124894', '2025-04-03 16:30:56.000000'),
(28, '留言管理-搜索', '{\"items\":[{\"label\":\"类型\",\"props\":{\"mode\":\"static\",\"options\":[{\"label\":\"留言板\",\"value\":\"comment\"},{\"label\":\"文章评论\",\"value\":\"article\"},{\"label\":\"友链\",\"value\":\"link\"},{\"label\":\"关于\",\"value\":\"about\"}],\"placeholder\":\"请选择类型\"},\"component\":\"Select\",\"designKey\":\"design-fL6z\",\"name\":\"type\"},{\"component\":\"Input\",\"designKey\":\"design-PMqT\",\"name\":\"nickname\",\"label\":\"昵称\",\"props\":{\"placeholder\":\"请输入昵称\"}},{\"component\":\"Input\",\"designKey\":\"form-5Ei5\",\"name\":\"region\",\"label\":\"地区\",\"props\":{\"placeholder\":\"请输入地区\"}}],\"labelWidth\":150,\"labelAlign\":\"right\",\"size\":\"default\"}', '2025-04-10 16:53:41.831932', '2025-04-10 16:56:09.000000');

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
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `email` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `link`
--

INSERT INTO `link` (`id`, `status`, `name`, `url`, `avatar`, `desc`, `created_at`, `updated_at`, `email`) VALUES
(1, '2', 'Elin‘s Blog', 'https://elin521.cn', 'https://elin521.cn/_next/image?url=%2Fauther_avatar.webp&w=3840&q=75', 'Elin‘s Blog个人博客', '2025-02-10 15:16:33.985538', '2025-02-10 15:16:39.000000', NULL),
(2, '2', 'Next.js', 'https://nextjs.org/blog', 'https://nextjscn.org/favicon.ico', 'Next.js bt Vercel', '2025-02-25 18:26:49.930190', '2025-02-25 18:29:38.000000', NULL),
(3, '2', 'React.js', 'https://react.docschina.org/blog', 'https://react.docschina.org/favicon.ico', 'React Blog', '2025-02-25 18:28:04.251285', '2025-02-25 18:29:36.000000', NULL),
(4, '2', 'daisyUI Blog', 'https://daisyui.com/blog/', 'https://img.daisyui.com/images/daisyui-logo/daisyui-logomark.svg', 'Tailwind CSS Components ( version 4 update is here )', '2025-02-25 18:29:13.143052', '2025-02-25 18:30:48.649478', NULL),
(5, '2', '百度', 'https://www.baidu.com', 'https://www.baidu.com/favicon.ico', '百度一下，你就知道', '2025-03-19 14:49:21.515600', '2025-03-19 14:51:58.000000', NULL);

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
(9, 'js', NULL, '2025-02-10 15:14:28.225219', '2025-02-10 15:14:28.225219'),
(10, 'JAVA', NULL, '2025-02-25 17:30:30.151312', '2025-02-25 17:30:30.151312'),
(11, 'docker', NULL, '2025-02-25 17:39:24.728754', '2025-02-25 17:39:24.728754'),
(13, 'nginx', NULL, '2025-02-25 17:47:25.747345', '2025-02-25 17:47:25.747345'),
(15, 'life1', NULL, '2025-02-25 17:52:58.876789', '2025-03-31 18:08:57.000000');

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
(1, 4428);

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
  ADD KEY `FK_80d00966d356f1656978e1cbab4` (`targetCommentId`),
  ADD KEY `FK_9cc3d58f73b9a1a26d7f001b9b1` (`parentArticleId`);

--
-- 表的索引 `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `form`
--
ALTER TABLE `form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用表AUTO_INCREMENT `link`
--
ALTER TABLE `link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  ADD CONSTRAINT `FK_80d00966d356f1656978e1cbab4` FOREIGN KEY (`targetCommentId`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9cc3d58f73b9a1a26d7f001b9b1` FOREIGN KEY (`parentArticleId`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
