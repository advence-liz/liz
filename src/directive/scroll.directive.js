
if (window.angular) {
    var aui = angular.module('aui');
    /**
    * <div aui-scrolling time-label=" " title-label="" list-name=""></div>
    * @prop titleLabel {String}
    * @prop timeLabel {String}
    * @prop listName {Array}  [{timeLabel:"***",titleLabel:"***"}]
    */
    aui.directive('auiScrolling', ['$parse', function (parse) {
        return {
            restrict: "AE",
            scope: {
                listName: "="
            },
            template: function (tElement, tAttrs) {
                var _html = '';
                _html += '<div style="height: 150px; width: 200px; overflow-y: scroll; padding-left:30px;padding-right:30px;border:solid;display:inline-block;position:relative"></div>';
                return _html;
            },
            replace: true,
            transclude: true,

            controller: function ($scope, $element, $attrs, $transclude) {
                var strArr = [], templateStr, items, timeLabel, titleLabel;
                // var parseFun = parse($attrs.listName);//parse the list
                // items = parseFun($scope);// access list
                items = $scope.listName;
                $scope.isHover = false;
                timeLabel = $attrs.timeLabel || "time";
                titleLabel = $attrs.titleLabel || "title";
                for (var i in items) {
                    var item = items[i];
                    //  item.time = '00-0' + i;
                    strArr.push('<div id="' + item.id + '"><i>' + item[timeLabel] + '</i>&nbsp &nbsp<a>' + item[titleLabel] + '</a></div>');
                }
                templateStr = strArr.join('')
                $element.append(templateStr);

                $scope.$on('srcollChange', function (event, index, video) {
                    $scope.isHover ?
                        null :
                        $element.get(0).scrollTop = 20 * index;

                });
                $element.on("mouseenter", function () {
                    $scope.isHover = true;
                    $("#isHover").text($scope.isHover);
                });
                $element.on("mouseleave", function () {
                    $scope.isHover = false;
                    $("#isHover").text($scope.isHover);
                });

            }

        };
    }]);


}