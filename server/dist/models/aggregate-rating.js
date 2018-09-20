"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateRating = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectors = require("../data/connectors");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AggregateRating = exports.AggregateRating = function () {
  function AggregateRating() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        filmId = _ref.filmId,
        count = _ref.count,
        average = _ref.average,
        best = _ref.best,
        worst = _ref.worst;

    _classCallCheck(this, AggregateRating);

    this.filmId = filmId;
    this.count = count;
    this.average = average;
    this.best = best;
    this.worst = worst;
  }

  _createClass(AggregateRating, null, [{
    key: "get",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(viewer, ids) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _connectors.AggregateRatingConnector.getAggregatedRatings(ids));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }()
  }]);

  return AggregateRating;
}();

exports.default = AggregateRating;