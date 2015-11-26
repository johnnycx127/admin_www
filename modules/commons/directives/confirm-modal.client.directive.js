angular.module('commons').directive('ConfirmText', ['$compile',
  function ($compile) {
    return {
      restrict: 'EA',
      scope: {
        content: '='
      },
      link: function (scope, elem, attrs) {
        var el = $compile(scope.content)(scope);
        elem.append(el);
      }
    };
  }
]);