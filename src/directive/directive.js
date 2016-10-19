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
    //             pageModel: '='
    //         },
    //     }
    // }


    function directive() {

        function directiveController($scope, $element, $attrs) {//$scope,$element,$attrs
            var instance;
            $element.page($scope.$eval($attrs.pageModel));//初始化控件  $scope.$eval($attrs.pageModel) 控件options 对象
            instance = $element.page('instance');
            $scope.tmpOptions = instance.options;
            $scope.tmpOptions.element = $element;
            $scope.tmpOptions.invoke = invoke;
            $scope.$eval($attrs.pageModel + '=tmpOptions');
            delete $scope.tmpOptions;
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
            // pageModel = $element.page('instance').options;
            //   pageModel.instance=$element.page('instance');



        }

        function link() {//link 的 arguments 跟 controller 有关当controller arguments 为null lin 也为null

        }
        // directiveController.$injector=['$scope', '$element', '$attrs'];

        return {
            controller: directiveController,
            link: link,
            restrict: 'AE',
        }
    }

} ());

