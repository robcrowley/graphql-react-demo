"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parameterize = exports.parameterize = function parameterize(params) {
  return asArray(params).map(function () {
    return "?";
  }).join();
};

var parameterizeLike = exports.parameterizeLike = function parameterizeLike(column, params) {
  return asArray(params).map(function (_, index) {
    return (index > 0 ? " OR" : "") + " " + column + " LIKE '%' || ? || '%'";
  });
};

var asArray = exports.asArray = function asArray(a) {
  return Array.isArray(a) ? a : [a];
};