// JavaScript source code
//<div class="select select-default">
//      <input />
//      <span class="select-arrow"></span>
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
            placeholder: 'please select one',
            selectedIndex: -1,
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
                "input .select-input": function (e) {
                    var self = this;
                    var searchText = this.input.val();
                    this.element.toggleClass("open", true);//当输入时打开dropdown menu
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
                "mouseenter .select-menu": function (e) {
                    this.mouseHandled = true;
                    //debugger;
                },
                "mouseleave .select-menu": function (e) {
                    this.mouseHandled = false;
                }
                ,
                "click .select-menuitem": function (e) {
                    var index = $(e.target).index();
                    var itemValue = this.options.items[index].key;
                    this.input.val(itemValue);
                    this.element.toggleClass("open", false);//隐藏后会自动触发 mouseleave
                    this.options.selectedIndex = index;
                    this.input.focus();

                }

            })
            this.refresh();


        },
        _createContent: function () {
            var templateMenu = '';
            var templateStr = '<input class="select-input"></input>' +
                              '<span class="select-arrow"></span>';
            templateMenu = this._createDropdownMenu();
            templateStr += templateMenu;
            this.element.append(templateStr);

        },
        _createDropdownMenu: function (items) {
            var items = items || this.options.items;
            var templateLi = '';
            var templateMenu = '';
            for (var i in items) {
                templateLi += '<li class="select-menuitem" index=' + i + '>' + items[i].key + '</li>';
            }
            templateMenu = '<ul class="select-menu">' + templateLi + '</ul>';
            return templateMenu;
        },
        refresh: function () {
            if (this.options.selectedIndex > -1) {
                this.input.val(this.options.items[this.options.selectedIndex].key)
            }
        },
        _filterItem: function () {
            this.options.items.filter(function () {

            })
        }


    })
}(window, undefined)
