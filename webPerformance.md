# 关于web性能一些特性汇总

## DOMContentLoaded & load

load事件是window对象上的事件。指的是网页资源已经加载完毕（包括但不限于DOM、图片、音频、脚本、插件资源以及CSS）。

DOMContentLoaded事件是document对象上的事件。指的是DOM已经加载完毕。IE中有个私有的事件onreadystatechange事件跟这个标准事件类似。

因此DOMContentLoaded事件都会比load事件提前触发(jQuery重点ready event 就是兼容各种情况的DOMContentLoaded实现，感觉DOMContentLoaded时JS脚步也跑完了，毕竟放在body前）。

## event.target & event.currentTarget & event.delegateTarget

  在事件冒泡过程中的当前DOM元素。

  触发事件的DOM元素。

  绑定了当前正在调用jQuery 事件处理器的元素。

## async & defer （script TAG)
  async 异步下载，下载后立即执行

  defer 异步下载，按顺序执行,执行区间大致在DOMContentLoaded 和window.load 之间

## FPS（Frames Per Second）：每秒传输帧数
正如Andrey Kosyakov Chromium 的博客中提到的，即使你的程序没有很多动画，帧的概念也是有用的，因为浏览器在处理输入事件时会生成重复动作的序列。如果你在一帧中留有足够的时间处理这些事件，就会使你的程序看上去有更好的响应性，这意味着更好的用户体验。

如果我们的目标是60fps, 那么最多有 16.66ms 去做所有的事情。这个时间并不多，所以尽可能从动画中挤出时间来提高性能还是很重要的。
## CSS阻塞与JS阻塞
- JS阻塞

所有浏览器在下载JS的时候，会阻止一切其他活动，比如其他资源的下载，内容的呈现等等。
直到JS下载、解析、执行完毕后才开始继续并行下载其他资源并呈现内容。
为了提高用户体验，新一代浏览器都支持并行下载JS，但是JS下载仍然会阻塞其它资源的下载（例如.图片，css文件等）。

由于浏览器为了防止出现JS修改DOM树，需要重新构建DOM树的情况，所以就会阻塞其他的下载和呈现。

嵌入JS会阻塞所有内容的呈现，而外部JS只会阻塞其后内容的显示，

2种方式都会阻塞其后资源的下载。也就是说外部样式不会阻塞外部脚本的加载，但会阻塞外部脚本的执行。

 

 

- CSS阻塞

CSS本来是可以并行下载的，在什么情况下会出现阻塞加载了(在测试观察中，IE6下CSS都是阻塞加载）

当CSS后面跟着嵌入的JS的时候，该CSS就会出现阻塞后面资源下载的情况。而当把嵌入JS放到CSS前面，就不会出现阻塞的情况了。

根本原因：因为浏览器会维持html中css和js的顺序，样式表必须在嵌入的JS执行前先加载、解析完。而嵌入的JS会阻塞后面的资源加载，所以就会出现上面CSS阻塞下载的情况。
## CSS匹配规则
![](http://p3.zhimg.com/b2/b7/b2b7c07bd7f5af231cdeaa0c3804a686_m.jpg?_=3300797)
- HTML 经过解析生成 DOM Tree（这个我们比较熟悉）；而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。Render Tree 中的元素（WebKit 中称为「renderers」，Firefox 下为「frames」）与 DOM 元素相对应，但非一一对应：一个 DOM 元素可能会对应多个 renderer，如文本折行后，不同的「行」会成为 render tree 种不同的 renderer。也有的 DOM 元素被 Render Tree 完全无视，比如 display:none 的元素。
- 在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 renderer。对于每个 DOM 元素，必须在所有 Style Rules 中找到符合的 selector 并将对应的规则进行合并。选择器的「解析」实际是在这里执行的，在遍历 DOM Tree 时，从 Style Rules 中去寻找对应的 selector。
- 因为所有样式规则可能数量很大，而且绝大多数不会匹配到当前的 DOM 元素（因为数量很大所以一般会建立规则索引树），所以有一个快速的方法来判断「这个 selector 不匹配当前元素」就是极其重要的。
- 如果正向解析，例如「div div p em」，我们首先就要检查当前元素到 html 的整条路径，找到最上层的 div，再往下找，如果遇到不匹配就必须回到最上层那个 div，往下再去匹配选择器中的第一个 div，回溯若干次才能确定匹配与否，效率很低。
- 逆向匹配则不同，如果当前的 DOM 元素是 div，而不是 selector 最后的 em，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证。
- 但因为匹配的情况远远低于不匹配的情况，所以逆向匹配带来的优势是巨大的。同时我们也能够看出，在选择器结尾加上「*」就大大降低了这种优势，这也就是很多优化原则提到的尽量避免在选择器末尾添加通配符的原因。

## 浏览器性能分析参考
- [chrome dev debug network 的timeline说明](http://www.cnblogs.com/yjf512/p/3668877.html)
- [IE官方文档](https://msdn.microsoft.com/zh-cn/library/gg130952(v=vs.85).aspx)
- [chrome CN](https://github.com/zhangyaowu/CN-Chrome-DevTools)
- [浏览器链接数](http://smilejay.com/2013/01/max-concurrent-connections/)

##  文档说明
 此文档的所有资源都是来源网络仅在此做了分类整理备忘持续更新,所有精华之处并非原创，所有原创之处并不优秀。

 ![](http://img.bbs.csdn.net/upload/201609/08/1473308168_167070.png)
 

## 参考链接
- <a href="http://blog.csdn.net/lizhao1226/article/details/6321185">js中的window.onload和jquery中的load区别的讲解</a>
- <a href="http://www.cnblogs.com/hgonlywj/p/4857151.html">CSS阻塞与JS阻塞</a>
- <a href="http://www.cnblogs.com/AndyWithPassion/archive/2011/09/03/2165441.html">script之defer&async</a>
- <a href="http://www.oschina.net/translate/performance-optimisation-with-timeline-profiles">使用Chrome DevTools的Timeline和Profiles提高Web应用程序的性能</a>
- <a href="http://www.cnblogs.com/aaronjs/p/3300797.html">Sizzle引擎</a>
- [markdown](http://wowubuntu.com/markdown/)


  