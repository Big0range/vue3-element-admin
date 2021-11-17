# vue3-element-admin

## vue3-element-admin

基于[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

本人还是很喜欢element-admin的风格的, 由于原作者不在维护且vue和element都有版本更新, 特此做了一个vue3+element的修改版(Typescript), ,尽量保证了和之前用法一致,如果您还不熟悉的话建议阅读下原作者文档 [传送门](https://panjiachen.gitee.io/vue-element-admin-site/zh/)

展示如下:

![截图1](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10f9d064a3374434bf03ce603ae10ccc~tplv-k3u1fbpfcp-zoom-1.image)

如果你之前用过vue2版本的话, 这个肯定也可以快速上手

## git 提交规范
为了保证代码的规范性,不仅使用eslint和typescript,还使用了 git-cz + Commitizen + husky方式
完整提交流程
```
git add .
yarn commit
git push
```

## 目前存在的问题

1.  有些多余的组件还未删除
2.  左侧菜单展开收起时,会莫名的卡顿(vue DevTools 情况下)
3.  功能还不是太多,但仍在继续更新写在最后
4.  ts和vue3不是很熟悉,有些代码看起来不是很优雅

## 写在最后
摸了半个月的鱼才勉勉强强做了个基础,喜欢的话点个[start](https://gitee.com/li_mei_chao/vue3-element-admin), 不喜欢的话悄悄划走就好了, 有问题评论区留言, 或者git 提issue, 同时欢迎各位大佬贡献代码
