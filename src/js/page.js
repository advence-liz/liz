//javacode
// widget page

// <div class="page page-default">
//          <button class="page-item page-prearrow btn-default btn" index><</button>0
// 			<button class="page-item btn-default btn" index>1</button>1
//          <button class="page-item page-headomit btn-default btn">...</button>2
// 			<button class="page-item btn-default btn"index>2</button>3
// 			<button class="page-item btn-default btn"index>3</button>4
// 			<button class="page-item btn-default btn"index>4</button>5
// 			<button class="page-item btn-default btn"index>5</button>6
// 			<button class="page-item btn-default btn"index>6</button>7
// 			<button class="page-item btn-default btn"index>7</button>8
// 			<button class="page-item btn-default btn"index>8</button>9
// 			<button class="page-item btn-default btn"index>9</button>10
//          <button class="page-item page-tailomit btn-default btn">...</button>11
// 			<button class="page-item btn-default btn"index>10</button>12
//          <button class="page-item page-endarrow btn-default btn" index>></button>13
// </div>






+function (window, undefined, $) {
    //define PageItems containter
    function PageItemList(selectedPage, displayCount, pageCount) {//coutruct Function 
        var items = [];
        this.curindex = selectedPage;
        this.length = pageCount;
        this.displayCount = displayCount;
        this.itemsVisible = [];
        this.selectedIndexChange = function () {

        };
        this.push = function (arg) {
            items.push(arg);
            return this;
        };
        this.unshift = function (arg) {
            items.unshift(arg);
            return this;
        }
        this.insert = function (arg, index) {
            items.splice(index, 0, arg);
            return this;
        }
        this.reverse=function(){
            items.reverse();
        }
        this.setItems = function () {//生成page item 对象集合
          // 为什么这么写for 循环呢？在javascript 模式中说酱紫 定义的变量少而且数组索引减少执行更快
          //由于倒序所以获得数组跟想要的是相反的所有加了reverse ，而不用unshift 代替push 的原因是 业界传说unshift 性能极差 http://www.guadong.net/article/975OC4RY.html
            for (var index = this.length; index--;) {//index 从零开始 display 重1 开始
                this.push({ display: index+1, type: 'item' });
            }
            this.reverse();
            this.insert({ display: '...', type: 'moit' }, 1);
            this.insert({ display: '...', type: 'moit' }, -1);
            this.unshift({ display: '<', type: 'arrow' });
            this.push({ display: '>', type: 'arrow' });
            return this;
        }
        this.getItems = function () {
            return items;
        }
        this.setItems();
    }

    $.widget("aui.page", {
        version: "1.0",
        options: {
            theme: 'page-default',
            selectedPage: 1,
            pageCount: 10,
        },
        _create: function () {
            this.element.addClass("page");
            this.pageItems = new PageItemList(this.options.selectedPage, this.options.displayCount, this.options.pageCount);
            this._createContent();

        },
        _createContent: function () {
            var domStr = [],
                pageitems = this.pageItems.getItems();

            for (var i = pageitems.length; i--;) {
                switch (pageitems[i].type) {
                    case 'item':
                        domStr.unshift('<button class="page-item btn-default btn"' + 'index="' + pageitems[i].display + '">' + pageitems[i].display + '</button>')
                        break;
                    case 'moit':
                        domStr.unshift('<button class="page-item page-tailomit btn-default btn">...</button>');
                        break;
                    case 'arrow':
                        domStr.unshift('<button class="page-item page-prearrow btn-default btn">' + pageitems[i].display + '</button>')
                        break;
                }
            }
            this.element.append(domStr.join(' '));
        }
    });

} (window, undefined, jQuery);