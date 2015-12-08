'use strict';

// Articles controller
angular.module('products').controller('ProductsListController', ['$scope', '$stateParams', '$location', 'Authentication', 'DTColumnBuilder', 'DTOptionsBuilder', 'DTColumnDefBuilder','Commons', '$resource', '$uibModal', '$compile','$aside',
  function ($scope, $stateParams, $location, Authentication, DTColumnBuilder, DTOptionsBuilder, DTColumnDefBuilder, Commons, $resource, $uibModal, $compile, $aside) {
    $scope.authentication = Authentication;
    $scope.products = {};
    $scope.isOpenFilterBar = false;

    $scope.openFilterBar = function () {
      $scope.isOpenFilterBar = true;
    };

    $scope.closeFilterBar = function () {
      $scope.isOpenFilterBar = false;
    };

    $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDataProp('data')
      .withFnServerData(serverData)
      .withOption('scrollX', true)
      .withOption('filter', false)
      .withOption('sort', false)
      .withOption('serverSide', true)
      .withOption('autoWidth', false)
      .withOption('processing', true)
      .withOption('language', {
        lengthMenu: '单页显示 _MENU_ 条数据',
        loadingRecords: '数据加载中...',
        processing: '数据加载中...',
        emptyTable: '没有可以显示的数据',
        info: '_START_ 到 _END_ 在 总共_TOTAL_ 数据中',
        paginate: {
          first: '&laquo;',
          last: '&raquo;',
          next: '&rarr;',
          previous: '&larr;'
        },
        zeroRecords: '没有可以显示的数据'
      })
      .withOption('createdRow', createdRow);

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
      $scope.products[data.id] = data;
      return '<button class="btn green" ng-click="">' +
        '   <i class="fa fa-edit"></i>' +
        '</button>&nbsp;' +
        '<button class="btn red" ng-click="delete(products[' + data.id + '])">' +
        '   <i class="fa fa-trash-o"></i>' +
        '</button>';
    }

    $scope.dtColumns = [
      DTColumnBuilder.newColumn('city_name').withTitle('城市').withClass('text-center'),
      DTColumnBuilder.newColumn('category_name').withTitle('项目类型').withClass('text-center'),
      DTColumnBuilder.newColumn('tag_name').withTitle('标签名称').withClass('text-left'),
      DTColumnBuilder.newColumn('detail_name').withTitle('项目名称').withClass('text-left'),
      DTColumnBuilder.newColumn('title').withTitle('标题').withClass('text-center'),
      DTColumnBuilder.newColumn('is_index_name').withTitle('是否首页').withClass('text-center'),
      DTColumnBuilder.newColumn('index_sort').withTitle('首页排序').withClass('text-center'),
      DTColumnBuilder.newColumn('sort_num').withTitle('排序序号').withClass('text-center'),
      DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '100px').renderWith(actionsHtml)
    ];

    $scope.dtInstance = {};

    function serverData(sSource, aoData, fnCallback, oSettings) {
      //All the parameters you need is in the aoData variable
      var draw = aoData[0].value;
      var start = aoData[3].value;
      var length = aoData[4].value;

      return $resource('/api/products/withPageInfo').get({
        cityId: $scope.filter && $scope.filter.city ? $scope.filter.city.id : '',
        categoryId: $scope.filter && $scope.filter.category ? $scope.filter.category.category_id : '',
        detailName: $scope.filter && $scope.filter.detailName || '',
        isIndex: $scope.filter && $scope.filter.isIndex ? '1' : '',
        start: start,
        length: length
      }).$promise.then(function(result){
        var records = {
          'draw': draw,
          'recordsTotal': result.totalCount || 0,
          'recordsFiltered': result.totalCount || 0,
          'data': result.commoditys
        };
        fnCallback(records);
      }, function (error) {
        console.log(error.message);
      });
    }

    $scope.delete = function (product) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'confirmModal.html',
        controller: function ($scope, $uibModalInstance) {
          $scope.ok = function () {
            $uibModalInstance.close();
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss();
          };
        },
        size: 'sm'
      });

      modalInstance.result.then(function () {
        //TODO call service to delete data

      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.asideState = {
      open: false
    };

    $scope.openAside = function() {
      $scope.asideState = {
        open: true,
        position: 'right'
      };

      function postClose(filter) {
        $scope.asideState.open = false;
        $scope.filter = filter || {};
      }

      $aside.open({
        templateUrl: 'modules/products/client/views/list-products-filter.client.view.html',
        placement: 'right',
        size: 'sm',
        backdrop: false,
        controller: 'ProductListFilterCtrl',
        resolve: {
          filter: function () {
            return $scope.filter;

          }
        }
      }).result.then(postClose, postClose);
    };
  }
]).controller('ProductListFilterCtrl', ['$scope', 'Commons', '$uibModalInstance', 'filter',
  function ($scope, Commons, $uibModalInstance, filter) {
    $scope.filter = filter || {};

    $scope.loadCities = function () {
      //$scope.cities = Commons.Cities.query();
      $scope.cities = [
        {
          id: 1,
          city_name: '北京'
        },
        {
          id: 2,
          city_name: '上海'
        }
      ];
    };

    $scope.loadCategories = function () {
      $scope.categories = Commons.Categories.query();
    };

    $scope.resetFilter = function () {
      $scope.filter = {};
    };

    $scope.close = function () {
      $uibModalInstance.close($scope.filter);
    };

    $scope.reset = function () {
      $uibModalInstance.dismiss();
    };
  }
]).controller('ProductCreateCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Commons', 'Products', 'FileUploader',
  function($scope, $stateParams, $location, Authentication, Commons, Products, FileUploader) {
    $scope.authentication = Authentication;
    $scope.product = {
      availableDateTime: new Date(),
      availableDate: new Date(),
      imgs: []
    };

    $scope.init = function () {
      $scope.serviceDetails =  [
        {
          id: 1,
          name: '测试1'
        },
        {
          id: 2,
          name: '测试2'
        }
      ];

      $scope.categories = [
        {
          id: 0,
          name: '类目1',
          subCategories: [
            {
              id: 10,
              name: '类目1_1',
              parentId: 0
            },
            {
              id: 11,
              name: '类目1_2',
              parentId: 0
            },
            {
              id: 12,
              name: '类目1_3',
              parentId: 0
            }
          ],
        },
        {
          id: 1,
          name: '类目2',
          subCategories: [
            {
              id: 20,
              name: '类目2_1',
              parentId: 1
            },
            {
              id: 21,
              name: '类目2_2',
              parentId: 1
            },
            {
              id: 22,
              name: '类目2_3',
              parentId: 1
            }
          ]
        }
      ];
    };

    $scope.closeAlert = function () {
      $scope.error = '';
    };

    $scope.removeProductImg = function (img) {
      for(var i = 0; i < $scope.product.imgs.length; i++) {
        if ($scope.product.imgs[i] === img) {
          return $scope.product.imgs.splice(i, 1);
        }
      }
    };

    var uploader = $scope.uploader = new FileUploader({
      url: 'http://localhost:3000/api/commons/imgupload'
    });

    // FILTERS

    uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
      }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      if (filter.name === 'imageFilter') {
        $scope.error = '添加图片失败,支持格式  jpg,png,jpeg,bmp,gif';
      }
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      angular.forEach(response, function (imgurl) {
        $scope.product.imgs.push({
          url: imgurl,
          sortNo: $scope.product.imgs.length + 1
        });
      });
      for (var i = 0; i < uploader.queue.length; i ++) {
        if (fileItem === uploader.queue[i]) {
          return uploader.queue.splice(i, 1);
        }
      }
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
      $scope.error = '上传失败, 请联系管理员';
    };

    // Create new product
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productForm');

        return false;
      }

      var product = new Products(this.product);

      product.$save(function (result) {
        $location.path('products/');
        $scope.product = null;
      }, function (error) {
        $scope.error = error.message;
      });
    };

  }
]).controller('ProductCreateGenericTabCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Commons', 'Products',
  function($scope, $stateParams, $location, Authentication, Commons, Products) {
    $scope.openCtgySelector = function () {
      $scope.shouldOpenCtgySelector = true;
    };

    $scope.product = $scope.$parent.product;
  }
]).controller('ProductViewCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Commons', 'Products',
  function($scope, $stateParams, $location, Authentication, Commons, Products) {
    $scope.authentication = Authentication;

    $scope.loadProduct = function () {
      $scope.product = Products.get({
        productId: $stateParams.productId
      });
    };
  }
]).controller('ProductDashboardCtrl', ['$scope', '$stateParams', '$location', 'Authentication', 'Commons', 'Products',
  function($scope, $stateParams, $location, Authentication, Commons, Products) {

  }
]);
