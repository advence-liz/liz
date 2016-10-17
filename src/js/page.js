//javacode
// widget page

// <div class="page page-default">
//          <button class="page-item page-prearrow btn-default btn" index><</button>0
// 			<button class="page-item page-index btn-default btn" index>1</button>1
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
        this.reverse = function () {
            items.reverse();
        }
        this.setItems = function () {//生成page item 对象集合
            // 为什么这么写for 循环呢？在javascript 模式中说酱紫 定义的变量少而且数组索引减少执行更快
            //由于倒序所以获得数组跟想要的是相反的所有加了reverse ，而不用unshift 代替push 的原因是 业界传说unshift 性能极差 http://www.guadong.net/article/975OC4RY.html
            //可以这些也没什么意义
            for (var index = this.length; index--;) {//index 从零开始 display 重1 开始
                this.push({ display: index + 1, type: 'item' });
            }
            this.reverse();
            this.insert({ display: '...', type: 'omit' }, 1);
            this.insert({ display: '...', type: 'omit' }, -1);
            this.unshift({ display: '<', type: 'arrow', class: 'page-prearrow' });
            this.push({ display: '>', type: 'arrow', class: 'page-endarrow' });
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
            widgetEventPrefix: 'page:',
            theme: 'page-default',
            selectedPage: 1,
            pageCount: 20,
            displayCount: 9,
            selectedPageChange: function (event, data) {//$(:page).on(page:selectedPageChange,function(event,data){})
                //this 为控件所在DOM 元素 
            }
        },
        _create: function () {
            this.element.addClass("page page-default");
            this.pageItemInstance = new PageItemList(this.options.selectedPage, this.options.displayCount, this.options.pageCount);
            this._createContent();
            this.pageItems = $('.page-item', this.element);
            this.pageIndexs = $('.page-index', this.element);
            this.pageOmits = $('.page-omit', this.element);
            this.preomit = $(this.pageOmits[0]);
            this.endomit = $(this.pageOmits[1]);
            //register event
            this._on({
                "click .page-index": function (event) {
                    var index = parseInt(event.target.textContent);
                    this._toggleSelect(this.options.selectedPage - 1);
                    this.options.selectedPage = index;
                    this._selectedPageChange();
                },
                "click .page-prearrow": function (event) {

                    if (this.options.selectedPage == 1) {
                        return;
                    }
                    this.options.selectedPage -= 1;
                    this._selectedPageChange();
                    this._toggleSelect(this.options.selectedPage);
                },
                "click .page-endarrow": function (event) {
                    if (this.options.selectedPage == this.options.pageCount) {
                        return;
                    }
                    this.options.selectedPage += 1;
                    this._selectedPageChange();
                    this._toggleSelect(this.options.selectedPage - 2);
                }
            })
            //init
            this._selectedPageChange();
        },
        _createContent: function () {
            var domStr = [],
                pageitems = this.pageItemInstance.getItems();//tmp var 
            try {
                for (var i = pageitems.length; i--;) {
                    switch (pageitems[i].type) {
                        case 'item':
                            domStr.push('<button class="page-item page-index btn-default btn"' + 'index="' + pageitems[i].display + '">' + pageitems[i].display + '</button>')
                            break;
                        case 'omit':
                            domStr.push('<button class="page-item page-omit btn-default btn">...</button>');
                            break;
                        case 'arrow':
                            domStr.push('<button class="page-item btn-default btn ' + pageitems[i].class + '">' + pageitems[i].display + '</button>')
                            break;
                    }
                }
            } catch (ex) {
                console.log('create content failed');
            }
            domStr.reverse();
            this.element.append(domStr.join(' '));
        },
        _selectedPageChange: function () {
            var index = this.options.selectedPage,//默认值为1
                pageCount = this.options.pageCount,
                displayCount = this.options.displayCount,
                isOdd = displayCount % 2 ? true : false,//是否为奇数（当有两个省略时判断如何控制元素显隐）
                validLength = displayCount - 3,//除去开会和结尾（page-index）和一个...(page-omit) 即变化的 page-index 的有效长度
                halfLength = Math.floor(validLength / 2),
                preVisible = !!(index > validLength),//如果index 大于validLength 隐藏 prearrow
                endVisible = !!(index <= pageCount - validLength);//如果index 大于 displayCount - validLength 隐藏 endarrow
            // this.pageIndexs.addClass('none');
            this.preomit.toggleClass('none', !preVisible);
            this.endomit.toggleClass('none', !endVisible);
            this.pageIndexs.each(function (i, element) {//[1]...-------validLength-------...[20]
                var curindex = i + 1;
                if (curindex == 1 || curindex == pageCount) {//[1]and[20]
                    return;
                }

                if (preVisible && endVisible) {//[1]...-------validLength-------...[20]
                    var endIndex = index + halfLength;
                    !isOdd && endIndex++;
                    curindex > index - halfLength && curindex < endIndex && $(element).toggleClass('none', false) || $(element).toggleClass('none', true);
                } else if (endVisible) {//因为索引从1开始 [1]validLength-----------------...[20]
                    curindex -= 1;
                    curindex <= validLength && $(element).toggleClass('none', false) || $(element).toggleClass('none', true);
                } else if (preVisible) {//[1]...-------------------validLength[20]
                    // curindex += 1;
                    curindex >= pageCount - validLength && curindex <= pageCount && $(element).toggleClass('none', false) || $(element).toggleClass('none', true);
                }

            })
            this._toggleSelect(null, this.options.selectedPage - 1);
            this._trigger('selectedPageChange', null, { liz: 'eeeee' })

        },
        _toggleSelect: function (oldIndex, newIndex) {
            $(this.pageIndexs[oldIndex]).toggleClass('select', false);//一般jquery 自带的函数基本不用考虑异常处理，jquery 基本都带异常处理
            $(this.pageIndexs[newIndex]).toggleClass('select', true);

        }


    });

} (window, undefined, jQuery);