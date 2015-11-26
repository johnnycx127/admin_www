'use strict';

angular.module('core').controller('FooterController', ['$scope', '$state', 'Authentication', 'Menus', 'LayoutService',
  function ($scope, $state, Authentication, Menus, LayoutService) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.$on('$includeContentLoaded', function () {
      LayoutService.initFooter();
    });
  }
]);
