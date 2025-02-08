-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- 主机： db:3306
-- 生成日期： 2025-02-08 09:05:25
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

-- --------------------------------------------------------

--
-- 表的结构 `article_tags_tag`
--

CREATE TABLE `article_tags_tag` (
  `articleId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(2, 'vue', NULL, '2025-02-08 17:04:51.145490', '2025-02-08 17:04:51.145490');

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
(1, 83);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `link`
--
ALTER TABLE `link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
