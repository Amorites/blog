---
title: sentry-sso
date: 2018-08-13 18:32:19
tags:
---

领到的第一个任务是给 sentry 添加 sso。首先要整体了解一下各个概念。

公司使用cas来实现sso，理论上来讲支持三种协议：cas, OAuth2, SAML2。

## 选择

主要考虑三种协议：cas, OAuth2, SAML2。

查了一些官方关于这些的回复： 

- ![cas](https://github.com/getsentry/sentry/issues/3854)

It's very possible it won't work.可能需要改源码.

- ![OAuth](https://docs.sentry.io/server/sso/)

有两个官方维护的 Provider，支持了github和google。查了查还有个人维护的gitlab的版本,想接入公司的应该需要参考这些自己实现一个。

而其关于Custom Providers的说法是：

>> At this time the API is considered unstable and subject to change. Things likely won’t change a lot, but there’s a few areas that need cleaned up.

不太稳定还有点麻烦的感觉，如果有其他的办法还是尽量避免。

- ![SAML2](https://docs.sentry.io/learn/sso/)

除了支持几个SASS服务外，还有一个 generic provider，提供一个配置界面，看来这就是我们需要的。

于是最终决定用SAML2

## 实现

首先参考插件![sentry-auth-saml2](https://github.com/getsentry/sentry-auth-saml2)的文档，知道大概的流程是添加这个插件然后重启服务就可以了。

整个服务是使用![sentry onpremise](https://github.com/getsentry/onpremise)搭建的，按理来说把插件的地址加入到requirements.txt就可以了。但实际上在build的时候会提示缺少依赖，google了一下，貌似是无法被pip直接安装的东西，需要用apt-get先手动安装，于是把pip install直接写在了Dockerfile里面。

总结下来就是以下几步：

1. 修改sentry.conf.py，添加一行`SENTRY_FEATURES['organizations:sso-saml2'] = True`开启SAML2验证（后续的版本可能会默认开启，未必是必须）
2. 修改Dockerfile，加入如下两行添加插件`
RUN apt-get update && apt-get install -y pkg-config xmlsec1 libxmlsec1-dev
RUN pip install https://github.com/getsentry/sentry-auth-saml2/archive/master.zip
`
3. 重新构建、启动、部署，在onpremise上已经添加了相关的文档，命令是：
```
docker-compose build # Build the services again after updating
docker-compose run --rm web upgrade # Run new migrations
docker-compose up -d # Recreate the services
```

完成之后，在orgnazition setting - auth下就出现了配置saml2的按钮。

