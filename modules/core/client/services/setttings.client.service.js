'use strict';

angular.module('core').factory('settings', ['$rootScope', function($rootScope) {
  // supported languages
  var settings = {
    layout: {
      pageSidebarClosed: false, // sidebar menu state
      pageContentWhite: true, // set page content layout
      pageBodySolid: false, // solid body color state
      pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    },
    assetsPath: '/',
    globalPath: '/global',
    layoutPath: '/layouts/layout'
  };

  $rootScope.settings = settings;

  return settings;
}]);