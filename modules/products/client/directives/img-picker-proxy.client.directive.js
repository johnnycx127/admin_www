'use strict';

angular.module('products').directive('imgPickerProxy', function () {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element, attr) {
      element.bind('click', function () {
        element.find('input')[0].click();
      });
    }
  };
});