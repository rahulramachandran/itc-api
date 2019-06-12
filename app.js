'use strict';

var express = require('express');
var createError = require('http-errors');

var path = require('path');
var api = require('./api/index');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// API entry point
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({message : err.message});
});

module.exports = app;
