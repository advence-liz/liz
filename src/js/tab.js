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
						</ul>
                       
					</aui-tab>
                        <div class="tab-content">Block one</div>
                        <div class="tab-content">Block two</div>
                        <div class="tab-content">Block three</div>

 */


void function ($,window) {
    window.aui? null:(window.aui={});
    window.aui.TabsItem=TabsItem;
    window.aui.ArrayList=ArrayList;
    function TabsItem(target_href, dispaly_title, template) {
        /**
         * template target_href 跟 dispaly_title 相当于占位符
         */
        this.template = template || '<li role="presentation" class="nav-item" href="target_href"><a class="nav-anchor">dispaly_title</a></li>';
        this.target_href = target_href;
        this.dispaly_title = dispaly_title;
        void function getTemplate() {
            this.template = this.template.replace(/target_href/, target_href).replace(/dispaly_title/, dispaly_title);
        }.apply(this);
    }
    function ArrayList() {
        var data_store = new Array;//private
        cur_pos = 0;
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
         * @param {number}  represent index
         * @return{this}
         */
        this.insert = function (arg, index) {
            data_store.splice(index, 0, arg);
            this.length++;
            return this;
        };
        this.clear = function () {
            this.data_store.length = 0;
            this.length = 0;
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
                return cur_pos = 0;
            }
        };
        this.each = function (func) {
            var index, item;
            for (index = this.length; i--;) {

                func(item);
            }
        }


    }
    $.widget("aui.tab", {
        widgetEventPrefix: 'tab:',
        options: {
            tabList: new Array,
            theme: 'default',
            type: 'nav-tabs'

        },
        _create: function () {
         this._createContent();
        
        },
        _createContent: function () {
            var template_arr = new Array,
                template_str,//{string}
                tab_list = this.options.tabList,//{ArrayList}
                tmp_item,//{TabsItem}
                class_str;//{string}
            while (tmp_item = tab_list.next()) {
                template_arr.push(tmp_item.template);
            }
            /**
             * 此处可以加判断 设置nav 的tab 跟theme
             *  */
            //var reg= /<[^>]*class\s*=\s*"(.*)"\s.*/; 正则第一捕获为 class 属性的值
            class_str = 'nav'+' '+this.options.type + ' ' + this.options.theme;
            template_arr.unshift('<ul class="nav" role="tablist">'.replace(/nav/, class_str));
            template_arr.push('</ul>');
            template_str = template_arr.join(' ');
            this.element.append(template_str);

            
       }
    })

    // var tab_list = new ArrayList;
    // tab_list.push(new TabsItem('javascript:;', 'tab1'));
    // tab_list.push(new TabsItem('javascript:;', 'tab2'));
    // tab_list.push(new TabsItem('javascript:;', 'tab3'));


} (jQuery,window)