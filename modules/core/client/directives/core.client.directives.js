'use strict';

angular.module('core').directive('ngSpinnerBar', ['$rootScope', '$document', 'LayoutService', 'AppService',
  function ($rootScope, $document, LayoutService, AppService) {
    return {
      link: function (scope, element, attrs) {
        // by defult hide the spinner bar
        element.addClass('hide'); // hide spinner bar by default

        // display the spinner bar whenever the route changes(the content part started loading)
        $rootScope.$on('$stateChangeStart', function () {
          element.removeClass('hide'); // show spinner bar
        });

        // hide the spinner bar on rounte change success(after the content loaded)
        $rootScope.$on('$stateChangeSuccess', function () {
          element.addClass('hide'); // hide spinner bar
          angular.element($document[0].body).removeClass('page-on-load'); // remove page loading indicator
          LayoutService.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

          // auto scorll to page top
          setTimeout(function () {
            AppService.scrollTop(); // scroll to the top on content load
          }, $rootScope.settings.layout.pageAutoScrollOnLoad);
        });

        // handle errors
        $rootScope.$on('$stateNotFound', function () {
          element.addClass('hide'); // hide spinner bar
        });

        // handle errors
        $rootScope.$on('$stateChangeError', function () {
          element.addClass('hide'); // hide spinner bar
        });
      }
    };
  }
]).directive('a', function () {
  return {
    restrict: 'E',
    link: function (scope, elem, attrs) {
      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        elem.on('click', function (e) {
          e.preventDefault(); // prevent link click for above criteria
        });
      }
    }
  };
}).directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };
}).directive('stopEvent', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      element.on(attr.stopEvent, function (e) {
        e.stopPropagation();
      });
    }
  };
});