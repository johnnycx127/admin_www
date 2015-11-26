'use strict';

var path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    apiClient = require(path.resolve('./modules/helpers/remoteServiceHelper'));

exports.loadProducts = (req, res) => {
  apiClient.BaseService.post('/api.product/blm/open/searchCommodityList', {
    params: {
      page: Math.ceil(req.query.start / req.query.length) + 1,
      pageSize: req.query.length
    },
    data: {
      category_id: req.query.categoryId,
      city_id: req.query.cityId,
      detail_name: req.query.detailName,
      is_index: req.query.isIndex
    }
  }).then((result) => {
    let i = 0;
    result.commoditys = result.commoditys.map((product) => {
      product.id = i;
      i += 1;
      return product;
    });
    res.json(result);
  }, (error) => {
    res.status(400).json({
      message: error
    });
  });
};

exports.createProduct = (req, res) => {
  console.log(JSON.stringify(req.body));
  res.json({
    id: 1
  });
};

exports.updateProduct = (req, res) => {
  console.log(JSON.stringify(req.params));
  console.log(JSON.stringify(req.body));
  res.json({
    id:1
  });
};

exports.delProduct = (req, res) => {
  console.log(JSON.stringify(req.params));
  res.send('success');
};

exports.getProduct = (req, res) => {
  console.log(JSON.stringify(req.params));
  res.json({
    id: 1,
    title: 'asdfasdfasdf',
    serviceDetail:{
      id: 1,
      name: '测试1'
    },
    brand: '12撒地方',
    component: 'adfadf',
    effect: 'adfdsf',
    intendedFor: 'asdfasdf',
    price: '123123',
    seqNum: '123',
    desc: 'zdfadsf'
  });
};