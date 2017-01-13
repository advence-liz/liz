(function () {
    'use strict';

    angular
        .module('aui', []);

} ());
// init WidgetModel  Service 
(function ($) {
    'use strict';

    angular
        .module('aui')
        .service('initService', Service)

    /** @ngInject */
    function Service() {

        this.initPageModel = function (options) {
            var defOptions = {
                widgetEventPrefix: 'page:',
                theme: 'page-default',
                selectedPage: 1,
                pageCount: 20,
                displayCount: 9,
                selectedPageChange: function (event, data) {//$(':page').on(page:selectedPageChange,function(event,data){})
                    //this 为控件所在DOM 元素 
                }
            };
            $.isPlainObject(options) && $.extend(defOptions, options);
            return defOptions;//此时不同的控件接收到的其实为同一对象，但是在jquery 控件初始化过程中options 进行的拷贝(通过proxiedPrototype方式)所以最终不同控件使用的是不同的对象


        };


    }

} (window.jQuery));



//directive page
// ## Comprehensive Directive API angular 源码中keywords
(function () {
    'use strict';

    angular
        .module('aui')
        .directive('auiPage', directive);//在这循环一个数组 通过一个 directive 初始化所有控件


    /** @ngInject */
    // function directive() {

    //     function directiveController($scope, $element, $attrs) {//$scope,$element,$attrs
    //         var vm = this;//Ctrl
    //         $element.page(vm.pageModel);
    //         vm.pageModel = $element.page('instance').options;
    //         vm.pageModel.instance=$element.page('instance');

    //     }

    //     function link() {//link 的 arguments 跟 controller 有关当controller arguments 为null lin 也为null

    //     }
    //     // directiveController.$injector=['$scope', '$element', '$attrs'];

    //     return {
    //         bindToController: true,
    //         controller: directiveController,
    //         controllerAs: 'Ctrl',
    //         link: link,
    //         restrict: 'AE',
    //         scope: {
    //             pageModel: '='  //使用bindToController 可以关联指令独立作用域中的pageMode 和外围的pageModel
    //         },
    //     }
    // }


    function directive() {
        /**
         * <aui-page page-model="vm.pageModel"></aui-page>
         * vm.pageModel即传入控件初始化的options（控件实例化后实例中会产生一个新的options对象）
         * 此方法让vm.pageModel指向新的options
         * 并且额外存储了控件所在DOM，和调用控件方法的接口 invoke
         * 此方式vm.pageModel直接等于 widget的options 所有控件改变也会直接改变angular 上下文的值
         * 这种封装的灵魂就在于options 即暴露出的所有数据，也是angular上下文和widget上下文所要同步的所有信息，以前的封装方式当改变angular or widget 之一
         * 必须强行手动同步，而现在angular和widget 操作的就是同一对象也就没有不同步的问题了。
         */
        function directiveController($scope, $element, $attrs) {//$scope,$element,$attrs  
            var instance;
            $element.page($scope.$eval($attrs.pageModel));//初始化控件  $scope.$eval($attrs.pageModel) 控件options 对象2$element[0].nodeName='AUI-PAGE' 可以通过它直接获取控件名称
            instance = $element.page('instance');
            /**
             * tmpOptions 这个临时对象必须得加到$scope中的原因是$scope.$eval方法是以$scope为上下文执行
             */
            $scope.tmpOptions = instance.options;
            $scope.tmpOptions.element = $element;
            $scope.tmpOptions.invoke = invoke;
            $scope.$eval($attrs.pageModel + '=tmpOptions');
            delete $scope.tmpOptions;
            /**
             * 调用控件实例方法接口
             * @interface invoke
             * @param {String} methond name
             * @param {Array}  arguments
             */
            function invoke(methond, args) {
                if (methond in instance) {
                    try {
                        if (args) return instance[methond].apply(instance, args);
                        else return instance[methond]();

                    } catch (ex) {
                        console.log(methond + ' must be function in widget instance');
                    }

                }
            }

        }

        function link() {//link 的 arguments 跟 controller 有关当controller arguments 为null lin 也为null
            //             //思想修订 其实无论link or controller 都是通过angular的依赖注入形式获得 arguments 然后执行的，然后controller 为初始化修饰scop 应在link 前执行
            //  var page=$(':aui-page');
            //  page.on('page:selectedpagechange',function(event,data){console.log('change')});//事件类型都必须是小写，因为在jqueryui内部将名称转为小写         
        }
        // directiveController.$injector=['$scope', '$element', '$attrs'];

        return {
            controller: directiveController,
            link: link,
            restrict: 'AE',
        }
    }

} ());

