'use strict';

// Setting up route
angular.module('products').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('products', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('products.list', {
        url: '',
        templateUrl: 'modules/products/client/views/list-products.client.view.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'products',
              insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
              files: [
                '/lib/datatables/media/css/jquery.dataTables.min.css',
                '/lib/angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css',
                '/lib/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js',
                '/lib/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js',
                '/lib/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.min.js',
                '/lib/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.min.js',
                '/lib/angular-datatables/dist/plugins/select/angular-datatables.select.min.js',
                '/lib/datatables-tabletools/js/dataTables.tableTools.js',
                '/lib/datatables-tabletools/css/dataTables.tableTools.css',
                '/lib/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.min.js',
                '/lib/bootstrap-select/dist/css/bootstrap-select.min.css'
              ]
            });
          }]
        },
        ncyBreadcrumb: {
          label: '商品',
          parent: 'home'
        }
      })
      .state('products.create', {
        url: '/create',
        templateUrl: 'modules/products/client/views/create-products.client.view.html',
        ncyBreadcrumb: {
          label: '创建',
          parent: 'products.list'
        }
      })
      .state('products.edit', {
        url: '/:productId/edit',
        templateUrl: 'modules/products/client/views/edit-products.client.view.html',
        ncyBreadcrumb: {
          label: '编辑',
          parent: 'products.list'
        }
      })
      .state('products.dashboard', {
        url: '/dashboard',
        templateUrl: 'modules/products/client/views/dashboard-products.client.view.html',
        ncyBreadcrumb: {
          label: '概览',
          parent: 'home'
        }
      });
  }
]);
