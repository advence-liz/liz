# 简介
此工程以后作为存储我开发的jqueryui 控件使用
## 工程使用说明
- 前提条件：安装node，全局安装npm（npm一般默认安装当安装node后），gulp，bower(当然如果不安装NODE也是可以使用的，只要把HTML页面所用的js文件找全就OK！)。
- 执行命令：
  
  ```bash
     $ bower install
     ```
     执行此命令后会根据bower.json 下载所需的第三方依赖（jquery,jquery-ui,angular,bootstrap)
  ```bash
     $ npm install
     ```
     执行此命令后下载npm，gulp所需插件（目前主要是下载gulp插件）
   ```bash
     $ gulp
   ```    
     执行此命令后会生成dist文件夹并拷贝所需文件到其下，编译less 文件合并 js 文件

## 控件列表
- select 控件 主要实现在 select.js selcet.html 依赖 jquery jquery-ui 
- page 控件   主要实现在 page.js page.html 依赖 jquery jquer-ui css 依赖 bootstrap