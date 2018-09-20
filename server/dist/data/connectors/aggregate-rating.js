"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAggregatedRatings = function getAggregatedRatings(ids) {
  return _sqlite2.default.all("SELECT\n       filmId,\n       count(rating) as \"count\",\n       avg(rating) as \"average\",\n       max(rating) as \"best\",\n       min(rating) as \"worst\"\n       FROM Review WHERE filmId IN (" + (0, _utils.parameterize)(ids) + ")\n       GROUP BY filmId", (0, _utils.asArray)(ids));
};

exports.default = {
  getAggregatedRatings: getAggregatedRatings
};