'use strict';

angular.module('products').directive('categorySelector', ['$document', '$compile', '$uibPosition',
  function ($document, $compile, $uibPosition) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      scope: {
        isOpen: '=',
        ngModel: '=',
        categories: '='
      },
      controller: ['$scope', function ($scope) {
        $scope.init = function () {
          $scope.firstLevelCategory = '';
          $scope.secondLevelCategory = '';
          if ($scope.ngModel) {
            $scope.secondLevelCategory = $scope.ngModel;
            angular.forEach($scope.categories, function (category) {
              if (category.id === $scope.secondLevelCategory.parentId) {
                $scope.firstLevelCategory = category;
              }
            });
          }
        };

        $scope.selectFirstCategory = function (item) {
          $scope.firstLevelCategory = item;
        };

        $scope.selectSecondCategory = function (item) {
          $scope.secondLevelCategory = item;
        };

        $scope.clear = function () {
          $scope.ngModel = '';
          $scope.isOpen = false;
        };

        $scope.select = function () {
          if ($scope.firstLevelCategory && $scope.secondLevelCategory) {
            $scope.ngModel = $scope.secondLevelCategory;
          }
          $scope.isOpen = false;
        };

        $scope.close = function () {
          $scope.isOpen = false;
        };
      }],
      link: function (scope, element, attrs, ctrl) {
        ctrl.$formatters.unshift(function (value) {
          if (value) {
            return scope.firstLevelCategory.name + '>' + scope.secondLevelCategory.name;
          } else {
            return '';
          }
        });

        var template = '<ul class="dropdown-menu select-category" ng-if="isOpen" ng-style="elementStyle" ng-init="init()">' +
                        '<li>' +
                          '<span ng-repeat="item in categories" ng-click="selectFirstCategory(item)" ng-class="{\'label label-success\':  firstLevelCategory.id=== item.id}">{{item.name}}</span>' +
                        '</li>' +
                        '<li ng-if="firstLevelCategory">' +
                          '<span ng-repeat="item in firstLevelCategory.subCategories" ng-click="selectSecondCategory(item)" ng-class="{\'label label-success\':  secondLevelCategory.id=== item.id}">{{item.name}}</span>' +
                        '</li>' +
                        '<li class="select-address-footer">' +
                          '<span>' +
                            '<button ng-click="select()" class="btn btn-sm btn blue">确定</button>' +
                            '<button ng-click="clear()" class="btn btn-sm btn red">清空</button>' +
                          '</span>' +
                          '<span class="pull-right">' +
                            '<button ng-click="close()" class="btn btn-sm btn green">关闭</button>' +
                          '</span>' +
                        '</li>' +
                      '</ul>';

        scope.elementStyle = {
          left: $uibPosition.position(element).left + 'px'
        };

        var el = $compile(template)(scope);

        $document.bind('click', function(event){
          var isClickedElementChildOfPopup = element[0] === event.target || el.parent().find(event.target).length;

          if (isClickedElementChildOfPopup)
            return;

          scope.close();
          scope.$apply();
        });

        element.parent().append(el);
      }
    };
  }
]);