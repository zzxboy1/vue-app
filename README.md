# vue-app


既然决定好好学习vue框架，感受一下前端MVVM框架，闭门造车不如项目驱动，就直接以一个项目来学习。

项目使用慕课网提供的模拟数据，不代表真实的商家情况。


__注：此项目纯属学习和娱乐，并非商业项目。__



# 技术栈
vue1.0/2.0 + vue-router1.0/2.0 + vue-resource + webpack + ES6 + sass 



# 项目运行

```
克隆，或者直接下载
git clone https://github.com/zzxboy1/vue-app

进入文件夹
cd sell

安装依赖
npm install
```

## 编译环境
```
开启本地服务器
npm run dev

访问 http://localhost:8080

```


## 线上版本
```
npm run build

生成的文件夹放在服务器即可正常访问

具体步骤比如：

进入命令行

node prod.server

访问 http://localhost:9000

```


# 工作安排
- [x] 图标字体制作 -- 完成
- [x] 配置Vue-router和dev-server文件 -- 完成
- [x] 头部组件开发 -- 完成
- [x] 公告栏开发 -- 完成
- [x] 列表组件menu开发 -- 完成
- [x] 列表组件食品列表开发 -- 完成
- [x] better-scorll插件引入和调试 -- 完成
- [x] menu列表联动调试 -- 完成
- [x] 购物车组件开发 -- 完成
- [x] 购物车小球动画设计 -- 完成
- [x] 商品组件静态部分开发 -- 完成
- [x] 评论分级切换功能开发 -- 完成
- [x] 有文字的评论过滤功能开发-- 完成
- [x] 评价列表组件开发 -- 完成
- [x] 商家详情页组件静态部分开发 -- 完成
- [x] 商家详情页实景图开发 -- 完成
- [x] 收藏商家功能开发 -- 完成
- [ ] 1.0升级2.0





# 项目布局
```
|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- dist                           	 // 项目编译打包目录
|-- resource                         // 标注了尺寸的设计图、图标、SVG等文件
|-- src  							 // 项目源文件		
|	|-- common						 // 公共库
|		|-- fonts                    // 字体文件
|		|-- js     					 // 公共js文件
|			|-- date.js              // 日期计算模块
|			|-- store.js             // localStorege处理模块
|			|-- util.js              // search参数获取组件
|		|-- sass     				 // 公共样式文件
|			|-- base.scss            // 基础样式（包括border处理、清浮动）
|			|-- icon.scss            // 字体图标样式
|			|-- index.scss           // 公共样式入口文件
|			|-- mixin.scss           // mixin模块
|   |-- components                   // 组件
|       |-- cartcontrol              // 商品购买数量控制组件
|       |-- food                     // 商品详情组件
|       |-- goods                    // 商品列表组件
|       |-- header                   // 头部组件
|       |-- ratings                  // 评论列表组件
|       |-- ratingselect             // 评论切换组件
|       |-- seller                   // 商家组件
|       |-- shopCart                 // 购物车组件
|       |-- split                    // 分割栏组件
|       |-- star                     // 评论的五颗星组件
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件目录
|-- .babelrc                         // babel配置文件
|-- .eslintignore                    // eslint忽视文件
|-- .eslintrc                        // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .gitignore                       // git忽略的文件
|-- data.json                        // 商家数据文件
|-- index.html                       // 入口html文件
|-- package.json                     // 项目及工具的依赖配置文件
|-- prod.server.js                   // 线上版本server配置
|-- README.md                        // 说明
```




# 总结

1、组件开发过程中对vue的生命周期钩子有了一定的理解，比如一些要涉及dom的操作，必须放在ready后执行，此外dom有变动，紧接着的dom操作一定要使用$nextTick()方法，毕竟Vue 异步执行 DOM 更新。

2、vue因其轻量级的框架在中小型项目中表现亮眼，在大型单页面应用中因为vuex的存在，表现依然出色，在处理复杂交互逻辑的时候，vuex的存在是不可或缺的。所以说利用 vue + vuex 完全可以去做大型的单页面项目，暂时还没有对vuex进行研究，很期待能在未来接触到大型的开发项目，能让我深刻理解用vue+vuex联合开发的畅快。

3、在项目除了用better-scorll并没有使用别的插件，期待以后能接触更大型的项目，能合理利用更多的插件，更好的利用大前端的生态圈，甚至可以自己锻炼一下，编写一些插件来结合使用，顺便感受一下大型项目开发。

4、项目写到现在，各个组件跟着慕课网视频，vue官方教程和API一路写下来，真心觉得学习东西还是以一个实际的项目为驱动，才能对自己有更大的提升。

# 项目截图

## 商品页

<img src="https://zzxboy1.github.io/vue-app/resouce/shangpin.jpg" width="350" height="668"/>

## 公告页

<img src="https://zzxboy1.github.io/vue-app/resouce/bulletin.jpg" width="350" height="668"/>

## 购物车

<img src="https://zzxboy1.github.io/vue-app/resouce/shopCart.jpg" width="350" height="668"/>


## 评价页

<img src="https://zzxboy1.github.io/vue-app/resouce/rating.jpg" width="350" height="668"/>


## 商品详情页

<img src="https://zzxboy1.github.io/vue-app/resouce/detail.jpg" width="350" height="668"/>


## 商家页

<img src="https://zzxboy1.github.io/vue-app/resouce/seller.jpg" width="350" height="668"/>