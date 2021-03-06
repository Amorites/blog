---
title: Feb_summary
date: 2018-03-01 22:54:35
tags:
---
## 在新项目里的历练：熟悉了结构，应用到其他代码库

第一点区别是对 selector 的使用。优点是更函数式， container 里的逻辑更清晰，不用像之前一大坨写在一起。缺点一是函数式不利于调试，断点很难打到想要的位置，添加 logger 也需要改好几行代码。

第二点是 api。之前我的 api 函数里面基本上只封装了路径的信息，现在体验下来，在里面封装尽量多的逻辑也是不错的做法。

用一个没有包袱的新环境写代码很爽啊，可以考虑『前端微服务』的可行性，正好与我负责的技术 Topic 有关。

## 升级 react 的时候接触了一些脚本工具，批量改代码，知道了 npx

esLint 走一遍；propType 走一遍；生命周期的顺序排一遍……

看着大片代码变规范了可以治愈强迫症。

在用 esLint 的过程中，为了能使用 local package，我都是在package.json 里写好 script，再 npm run fix。

改完之后才发现 npm 自带了一个叫做 npx 的工具，可以直接 npx eslint xxx。看来 npm 的 blog 也要经常关注啊。

顺便吐槽，esLint 的文档也不怎么样，--fix 的作用范围奇怪，试了好多次才试出正确的语法。

## 深入地看了 less文档，理解了@import 的几种参数（可能还是会忘），理解了modifyVars的作用，重写了项目里的主题系统。

参考了其他项目里的主题系统，最终去粗取精产出了一份适合项目的结构。

TODO: 主题系统整理之后可以拿出来给大家讨论，尽量在部门里通用。

## Racket

春节期间终于有时间捡起 cousera 上只开了个头的 Programming language 之 Racket 课。

第一周的课，深入理解了 thunk， stream, macro 这些概念。thunk 其实就是一个包裹着表达式的函数，可以用来延迟计算，再 pair 一个标志位就能达到 memoize 的作用。

第二周的目标是实现一个解释器，收获有：

- 解释性语言首先通过 parser 被转成 AST，再被 interpreter 执行。所谓 interpreter 其实更像是一个 executor。
- closure 的本质一个函数+上下文

正在做 homework。课程材料里自带的 testfile 十分有助于理解题目，有很精心准备的感觉。想到这里不得不吐槽一下学校里的老师教学太水了。

## 完善右浮，对面向切面的理解加深

进一步提取了一个『失焦时提交』的功能到父级组件里，终于删掉了之前看得最不顺眼的重复代码，新加了几个功能，总体少了200多行代码，全身舒爽。

但目前还是有很多地方有完善的空间，我在代码里留了七八个 todo hhhhhhhhhhhh。希望以后能全部解决掉。

## 因为 antd 的bug 看了一点点 react16 的源码，后来升级 antd 解决问题就没继续看下去了。

看了源码就知道调用栈里那一堆一堆的是在干嘛了，这种知识早点储备比较好。

## 3月目标

- 小流量+监控
- 完成 Racket 的第三周课程
- 其他年度目标跟上平均值