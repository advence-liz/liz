// JavaScript source code
//<div class="select select-default">
//      <div class="select-div">
//      <input />
//      <span class="select-arrow"></span>
//      </div>
//      <ul class="select-menu">
//          <li class="select-menuitem">select options</li>
//          <li class="select-menuitem">select options</li>
//          <li class="select-menuitem">select options</li>
//          <li class="select-menuitem">select options</li>
//          <li class="select-menuitem">select options</li>
//      </ul>
//  </div>
+function (window, undefined) {
    var $doc = window.document;
    $.widget("aui.select", {
        version: "1.0",
        options: {
            theme: 'select-default',
            placeholder: 'please select one',
            selectedIndex: -1,//通过selectedIndex 判断哪个元素被选中，当点击dropdownmenu 时更新selectedIndex
            items: [{ key: "asdf", value: 0 }, { key: "qwer", value: 1 }, { key: "zxcv", value: 2 }, { key: "hjkl", value: 3 }, { key: "uiop", value: 4 }, { key: "vbnm", value: 5 }]
        },
        _create: function () {
            this.mouseHandled = false;
            this.element.addClass("select select-default");
            if (this.options.disabled) {
                this.element
                    .addClass("ui-state-disabled")
                    .attr("aria-disabled", "true");
            }
            this._createContent();
            this.input = $(".select-input", this.element)
                .attr('placeholder', this.options.placeholder);
            this.dropdownMenu = this.element.find('.select-menu');
            this.menuitems = this.element.find('.select-menuitem');
            this._on({
                "click .select-input": function (e) {
                    this.element.toggleClass("open");
                    this.inputFocused = true;
                },
                "blur .select-input": function (e) {
                    if (!this.mouseHandled) {
                        this.element.toggleClass("open", false);
                    }
                    //setTimeout((function () { this.element.toggleClass("open", false) }).bind(this));
                },
                "input .select-input": function (e) {//filter logic base on control menuitem visible or not 
                  
                    var self = this;
                    var searchText = this.input.val();
                    this.element.toggleClass("open", true);//when input open the dropdown menu
                    this.options.selectedIndex = -1;
                    if (searchText) {
                        this.options.items.filter(function (ele, index, arr) {
                            var isContain = ele.key.indexOf(searchText) > -1
                            if (isContain) {
                                $(self.menuitems[index]).toggleClass("none", false);
                            } else {
                                $(self.menuitems[index]).toggleClass("none", true);
                            }
                            return isContain;
                        })
                    } else {
                        this.menuitems.toggleClass('none', false);
                    }


                },
                "keydown .select-input": function (e) {
                    // console.log("keydown");
                    var items = this.menuitems.not(".none");//��������������items����
                    try {
                        switch (e.which) {
                            case $.ui.keyCode.ENTER:
                                $(items[0]).mousedown();
                                break;
                            case $.ui.keyCode.DOWN:
                                break;

                            default:

                        }
                    } catch (ex) {
                        console.error(ex.message);
                    }

                },
                // "mouseenter .select-menu": function (e) {//mouseenter->blur(input)->click(dropdown)
                //     this.mouseHandled = true;//when trigger input blur, dropdown will close ,but dropdown's click won't trigger(trigger click two conditions must be met mousedown and mouseup)
                //     //debugger;
                // },
                // "mouseleave .select-menu": function (e) {
                //     this.mouseHandled = false;
                // }
                // ,
                "mousedown .select-menuitem": function (e) {
                    var index = $(e.target).index();
                    var itemValue = this.options.items[index].key;
                    this.input.val(itemValue);
                    this.element.toggleClass("open", false);// close dropdownMenu  which action will trigger mouseleave event
                    this.options.selectedIndex = index;
                    this.input.focus();

                }

            })
            this.refresh();


        },
        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            switch (key) {
                case 'items': {
                    $('.select-menu', this.element).replaceWith(this._createDropdownMenu());
                    this.refresh(true);
                    break;
                }
                case 'selectedIndex': {
                    this.refresh();
                    break;
                }


            }

        },
        _createContent: function () {
            var templateMenu = '';
            var templateStr = '<div class="select-div">' +
                '<input class="select-input"></input>' +
                //'<span class="select-arrow"></span>' +
                '</div>';
            templateMenu = this._createDropdownMenu();
            templateStr += templateMenu;
            this.element.append(templateStr);

        },
        _createDropdownMenu: function (items) {
            var items = items || this.options.items;
            var templateMenu = [];

            for (var i = items.length; i--;) {
                templateMenu.unshift('<li class="select-menuitem" index=' + i + '>' + items[i].key + '</li>');
            }
            // templateMenu.reverse();
            templateMenu.unshift('<ul class="select-menu">');
            templateMenu.push('</ul>');
            return templateMenu.join(' ');
        },
        refresh: function (deep) {
            if (deep) {
                this.options.selectedIndex = -1;
                this.dropdownMenu = this.element.find('.select-menu');
                this.menuitems = this.element.find('.select-menuitem');
            }
           try{
               this.input.val(this.options.items[this.options.selectedIndex].key)
           }catch(ex){
               this.input.val('');
           }
                
            
        },
        _filterItem: function () {
            this.options.items.filter(function () {

            })
        }

    })
} (window, undefined)
