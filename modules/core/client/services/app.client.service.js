'use strict';

angular.module('core').service('AppService', ['$window',
  function ($window) {
    var self = this;
    self.App = $window.App;

    this.scrollTop = function () {
      self.App.scrollTop();
    };

    this.initAjax = function () {
      self.App.initAjax();
    };
  }
]);