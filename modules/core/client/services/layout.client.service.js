'use strict';

angular.module('core').service('LayoutService', ['$window',
  function ($window) {
    var self = this;
    self.Layout = $window.Layout;
    self.QuickSidebar = $window.QuickSidebar;

    this.initHeader = function () {
      self.Layout.initHeader();
    };

    this.initSidebar = function () {
      self.Layout.initSidebar();
    };

    this.initQuickSideBar = function () {
      setTimeout(function () {
        self.QuickSidebar.init(); // init quick sidebar
      }, 2000);
    };

    this.initFooter = function () {
      self.Layout.initFooter();
    };

    this.setSidebarMenuActiveLink = function (type) {
      self.Layout.setSidebarMenuActiveLink(type);
    };
  }
]);