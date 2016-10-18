(function () {
    'use strict';

    angular
        .module('aui', [

        ]);

} ());
// init WidgetModel
(function(){
    'use strict';

    angular
        .module('aui')
        .service('initService', Service)

    /** @ngInject */
    function Service(){

        this.initPageModel = function(){
            return  {
            widgetEventPrefix: 'page:',
            theme: 'page-default',
            selectedPage: 1,
            pageCount: 20,
            displayCount: 9,
            selectedPageChange: function (event, data) {//$(':page').on(page:selectedPageChange,function(event,data){})
                //this 为控件所在DOM 元素 
            }
        };

        };

       
    }

}());



//directive page
// ## Comprehensive Directive API angular 源码中keywords
(function () {
    'use strict';

    angular
        .module ('aui')
        .directive ('auiPage', directive);


    /** @ngInject */
    function directive() {

        function directiveController($scope,$element,$attrs){//$scope,$element,$attrs
            var vm=this;
            $element.page(vm.pageModel);
           
        }

        function link(){//link 的 arguments 跟 controller 有关当controller arguments 为null lin 也为null

        }
        // directiveController.$injector=['$scope', '$element', '$attrs'];

        return {
            bindToController: true,
            controller: directiveController,
            controllerAs: 'Ctrl',
            link: link,
            restrict: 'AE',
            scope: {
                pageModel:'='
            },
        }
    }

} ());

