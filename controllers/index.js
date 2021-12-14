const createError = require('http-errors');

exports.homepage = function(req, res, next) {
  res.render('index', { title: 'Express' });
  };