/**
 * javascript code 
 * widget tabcontrol
 * 变量 全部小写 中间加下划线var vv_default={}; 
 * function as method  驼峰规则   vv_default.initFunc=function(){} （成员属性应该也使用驼峰规则？）
 * function as contruct(class) 首字母大写 function SchoolStudent(){}
 * 全局常量 全部 大写 MAX-HIGHT
 */

/**
 *              <aui-tab>
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="nav-item active"><a  class="nav-anchor" href="#">Home</a></li>
							<li role="presentation" class="nav-item"><a  class="nav-anchor" href="#">Profile</a></li>
							<li role="presentation" class="nav-item"><a   class="nav-anchor" href="#">Messages</a></li>
                            <li role="presentation">
                              <ul class="nav nav-tabs" role="tablist">
							    <li role="presentation" class="nav-item"><a  class="nav-anchor" href="#">Home</a></li>
							    <li role="presentation" class="nav-item"><a  class="nav-anchor" href="#">Profile</a></li>
                              </ul>
                            </li>
						</ul>
                       
					</aui-tab>
                        <div class="tab-content">Block one</div>
                        <div class="tab-content">Block two</div>
                        <div class="tab-content">Block three</div>

 */


void function ($, window) {
    window.aui ? null : (window.aui = {});
    window.aui.TabsItem = TabsItem;
    window.aui.ArrayList = ArrayList;
    function TabsItem(target_href, dispaly_title, template) {
        /**
         * template target_href 跟 dispaly_title 相当于占位符
         */
        this.template = template || '<li role="presentation" class="nav-item" href="target_href"><a class="nav-anchor">dispaly_title</a></li>';
        this.target_href = target_href;
        this.dispaly_title = dispaly_title;
        this.childList = new ArrayList;
        void function getTemplate() {
            this.template = this.template.replace(/target_href/, target_href).replace(/dispaly_title/, dispaly_title);
        }.apply(this);
    }
    TabsItem.ul_front = '<ul class="nav nav-tabs" role="tablist">';
    // TabsItem.ul_end='</ul>';
    TabsItem.li_front = ' <li role="presentation">';
    //  TabsItem.li_end='</li>';

    /**
     * @class ArrayList
     * @method unshift
     * @method insert
     * @method remove
     * @method clear
     * @method next
     */
    function ArrayList() {
        var data_store = new Array,
            cur_pos=0;
         
        this.length = 0;
        this.push = function (arg) {
            data_store.push(arg);
            this.length++;
            return this;
        };
        this.unshift = function (arg) {
            data_store.unshift(arg);
            this.length--;
            return this;
        };
        /**
         * 在指定索引处插入给定元素
         * @method insert
         * @param {string}  represent dom 
         * @param {number}  represent index（索引重零开始）
         * @return{this}
         */
        this.insert = function (arg, index) {
            data_store.splice(index, 0, arg);
            this.length++;
            return this;
        };
        /**
         *  移除指定索引处的元素（索引重零开始）
         * @method remove
         * @param  {number}
         * @param  {number}
         * @return {this}
         */
        this.remove = function (index, length) {
            var length = length || 1;
            data_store.splice(index, length);
            this.length -= length;
            return this;
        };
        this.clear = function () {
            this.data_store.length = 0;
            this.length = 0;
            return this;
        };
        /**
         * 获取 ArrayList 的下一个值
         * @method
         * @return {planObject} 当遍历到末尾时重置 cur_pos 并返回0 相当于 false
         */
        this.next = function () {
            if (cur_pos < this.length) {
                return data_store[cur_pos++];
            } else {
                return !!(cur_pos = 0);
            }
            //    if (this.cur_pos < this.length) {
            //     return data_store[this.cur_pos++];
            // } else {
            //     return !!(this.cur_pos = 0);
            // }
        };
        this.positon = function () {
            return this.cur_pos;
        }
        this.each = function (func) {
            var index, item;
            for (index = this.length; i--;) {

                func(item);
            }
        }


    }
    $.widget("aui.nav", {
        widgetEventPrefix: 'nav:',
        $nav_ele: null,
        $navs_content: new $(),
        $nav_items: null,
        $cur_item: null,
        $cur_content: null,
        options: {
            tabList: new Array,
            theme: 'default',
            type: 'nav-tabs',
            selectedIndex: 0,


        },
        _create: function () {

            this.element.append(this._createContent());
            this.$nav_ele = this.element.find('.nav');
            this.$nav_items = this.element.find('.nav-item');
            this.$cur_item = new $(this.$nav_items[this.options.selectedIndex]);
            this.$cur_content = new $(this.$navs_content[this.options.selectedIndex]);
            this._on({
                "click .nav-item": function (event) {
                    this.$cur_item = $(event.currentTarget);
                    this.$cur_content = $(this.$cur_item.attr('href'));
                    this._refresh();
                },
                /**
                 * ele.trigger('nav:invoke',{method:'remove',args:[]});
                 * @interface
                 * @param {Event}
                 * @param {planObject}
                 */
                "nav:invoke": function (event, planObject) {
                    var method = planObject.method,//{string}
                        args = planObject.args;//{Array}
                    try {
                        switch (method) {
                            case 'remove':
                            case 'insert':
                            case 'push':
                            case 'unshift':
                                {
                                    this.options.tabList[method].apply(this, args);
                                    this._resetNav();
                                    break;
                                }
                        }
                    } catch (error) {
                        console.log(error);
                    };

                }
            });
            this._refresh();

        },
        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            switch (key) {
                case 'tabList': {

                }
            }
        },
        _createContent: function () {
            var template_arr = new Array,
                template_str,//{string}
                tabList = this.options.tabList,//{ArrayList}
                tmp,//{TabsItem}
                class_str;//{string}
                
            while (tmp = tabList.next()) {
                if (tmp.childList.length) {
                    template_arr.push(TabsItem.li_front);
                    template_arr.push(TabsItem.ul_front);
                    /**
                     * 遍历二级节点
                     * cur_item 二级节点中的当前li
                     * chidList 二级节点集合 
                     * 
                     */
                   var cur_item,childList=tmp.childList;
                
                    while ( cur_item= childList.next() ){
                        template_arr.push(cur_item.template);
                        this.$navs_content = this.$navs_content.add(cur_item.target_href);
                    }
                    template_arr.push('</ul>');
                    template_arr.push('</li>');

                } else {
                    template_arr.push(tmp.template);
                    this.$navs_content = this.$navs_content.add(tmp.target_href);
                }



            }
            /**
             * 此处可以加判断 设置nav 的tab 跟theme  DBZQ
             *  */
            //var reg= /<[^>]*class\s*=\s*"(.*)"\s.*/; 正则第一捕获为 class 属性的值
            class_str = 'nav' + ' ' + this.options.type + ' ' + this.options.theme;
            template_arr.unshift(TabsItem.ul_front.replace(/nav/, class_str));
            template_arr.push('</ul>');
            template_str = template_arr.join(' ');
            return template_str;


        },
        _refresh: function () {
            this.options.selectedIndex = this.$cur_item.index();//此处只对click事件后调用的_refresh() 有意义
            this.$nav_items.removeClass('active');
            this.$cur_item.addClass('active');
            this.$navs_content.removeClass("show active");
            this.$cur_content.addClass("show active");
        },
        _resetNav: function () {
            this.$nav_ele.replaceWith(this._createContent());
            this.$nav_ele = this.element.find('.nav');
            this.$nav_items = this.element.find('.nav-item');
            this.$cur_item = new $(this.$nav_items[this.options.selectedIndex]);
            this.$cur_content = new $(this.$navs_content[this.options.selectedIndex]);
            this._refresh();

        }
    })

    // var tab_list = new ArrayList;
    // tab_list.push(new TabsItem('javascript:;', 'tab1'));
    // tab_list.push(new TabsItem('javascript:;', 'tab2'));
    // tab_list.push(new TabsItem('javascript:;', 'tab3'));


} (jQuery, window)