'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$rootScope', 'AppService',
  function ($scope, Authentication, $rootScope, AppService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.$on('$viewContentLoaded', function() {
      // initialize core components
      AppService.initAjax();
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;

    $scope.data = [{
      period: '2011 Q1',
      sales: 1400,
      profit: 400
    }, {
      period: '2011 Q2',
      sales: 1100,
      profit: 600
    }, {
      period: '2011 Q3',
      sales: 1600,
      profit: 500
    }, {
      period: '2011 Q4',
      sales: 1200,
      profit: 400
    }, {
      period: '2012 Q1',
      sales: 1550,
      profit: 800
    }];
  }
]);
