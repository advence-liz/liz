//javacode
// widget page
// <div id="page" class="page page-default">
//         <button class="page-item btn-default btn page-prearrow">&lt;</button> 
//         <button class="page-item page-index btn-default btn"index="1">1</button>
//         <button class="page-item page-omit btn-default btn">...</button> 
//         <button class="page-item page-index btn-default btn none" index="2">2</button>
//         <button class="page-item page-index btn-default btn none" index="3">3</button> 
//         <button class="page-item page-index btn-default btn none" index="4">4</button> 
//         <button class="page-item page-index btn-default btn none" index="5">5</button> 
//         <button class="page-item page-index btn-default btn none" index="6">6</button> 
//         <button class="page-item page-index btn-default btn none" index="7">7</button> 
//         <button class="page-item page-index btn-default btn none" index="8">8</button> 
//         <button class="page-item page-index btn-default btn none" index="9">9</button> 
//         <button class="page-item page-index btn-default btn none" index="10">10</button> 
//         <button class="page-item page-index btn-default btn none" index="11">11</button> 
//         <button class="page-item page-index btn-default btn none" index="12">12</button> 
//         <button class="page-item page-index btn-default btn none" index="13">13</button> 
//         <button class="page-item page-index btn-default btn" index="14">14</button> 
//         <button class="page-item page-index btn-default btn" index="15">15</button> 
//         <button class="page-item page-index btn-default btn" index="16">16</button> 
//         <button class="page-item page-index btn-default btn" index="17">17</button> 
//         <button class="page-item page-index btn-default btn" index="18">18</button> 
//         <button class="page-item page-index btn-default btn" index="19">19</button> 
//         <button class="page-item page-omit btn-default btn none">...</button>	
//         <button class="page-item page-index btn-default btn select" index="20">20</button> 
//         <button class="page-item btn-default btn page-endarrow">&gt;</button>
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
        this.insert = function (arg, index) {//基本上可以理解为在在index（index从零开始可以为负）的位置插入一个元素
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
        //初始化时直接执行setItems 设置 items 的值
        this.setItems();
    }

    $.widget("aui.page", {
        version: "1.0",
        widgetEventPrefix: 'page:',
        options: {
            theme: 'page-default',
            selectedPage: 1,
            pageCount: 20,
            displayCount: 9,
            selectedPageChange: function (event, data) {//$(':aui-page').on("page:selectedPageChange",function(event,data){debugger;})
                //this 为控件所在DOM 元素 
                debugger;
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
                  //  this._toggleSelect(this.options.selectedPage);//去掉之前的选择状态
                    this._cleanSelect();
                    this.options.selectedPage = index;
                    this._selectedPageChange();
                },
                "click .page-prearrow": function (event) {

                    if (this.options.selectedPage == 1) {
                        return;
                    }
                   // this._toggleSelect(this.options.selectedPage);//去掉之前的选择状态
                    this._cleanSelect();
                    this.options.selectedPage -= 1;
                    this._selectedPageChange();
                 
                },
                "click .page-endarrow": function (event) {
                    if (this.options.selectedPage == this.options.pageCount) {
                        return;
                    }
                //    this._toggleSelect(this.options.selectedPage);//去掉之前的选择状态
                    this._cleanSelect();
                    this.options.selectedPage += 1;
                    this._selectedPageChange();
                   
                },
                "selectedpagechange":function(){
                    debugger;
                }
            });
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
            this.preomit.toggleClass('none', !preVisible);//控制开头的省略是否显示
            this.endomit.toggleClass('none', !endVisible);//控制结尾的省略是否显示
            this.pageIndexs.each(function (i, element) {//[1]...-------validLength-------...[20]
                var curindex = i + 1;//此处加一是为了跟pageindex 相同
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
            this._toggleSelect(null, this.options.selectedPage);//给选中元素添加选中状态
            this._trigger('selectedPageChange', null, { liz: 'eeeee' })//http://www.jquery123.com/trigger/ 在_trigger 中将 'selectedPageChange'转为了小写
        
            this._on('selectedpagechange',this.options.selectedPageChange);//事件类型都必须是小写，因为在jqueryui内部将名称转为小写    
        },
        _toggleSelect: function (oldIndex, newIndex) {
            $(this.pageIndexs[oldIndex-1]).toggleClass('select', false);//一般jquery 自带的函数基本不用考虑异常处理，jquery 基本都带异常处理
            $(this.pageIndexs[newIndex-1]).toggleClass('select', true);

        },
        _cleanSelect:function(){
            this.pageIndexs.toggleClass('select',false);
        }


    });

} (window, undefined, jQuery);