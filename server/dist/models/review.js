"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Review = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectors = require("../data/connectors");

var _apolloServerExpress = require("apollo-server-express");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Review = exports.Review = function () {
  function Review() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        reviewId = _ref.reviewId,
        filmId = _ref.filmId,
        content = _ref.content,
        rating = _ref.rating,
        userId = _ref.userId,
        createdAt = _ref.createdAt;

    _classCallCheck(this, Review);

    this.reviewId = reviewId;
    this.filmId = filmId;
    this.content = content;
    this.rating = rating;
    this.userId = userId;
    this.createdAt = new Date(createdAt);
  }

  _createClass(Review, null, [{
    key: "get",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(viewer, ids) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connectors.ReviewConnector.getReviews(ids);

              case 2:
                data = _context.sent;
                return _context.abrupt("return", data.map(function (item) {
                  return new Review(item);
                }));

              case 4:
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
  }, {
    key: "getIdsByFilm",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(viewer, ids) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _connectors.ReviewConnector.getReviewIdsByFilm(ids));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getIdsByFilm(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return getIdsByFilm;
    }()
  }, {
    key: "getIdsByDirector",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(viewer, ids) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _connectors.ReviewConnector.getReviewIdsByDirector(ids));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getIdsByDirector(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return getIdsByDirector;
    }()
  }, {
    key: "getIdsByUser",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(viewer, ids) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _connectors.ReviewConnector.getReviewIdsByUser(ids));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getIdsByUser(_x8, _x9) {
        return _ref5.apply(this, arguments);
      }

      return getIdsByUser;
    }()
  }, {
    key: "add",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref6) {
        var userId = _ref6.userId;

        var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            filmId = _ref8.filmId,
            content = _ref8.content,
            rating = _ref8.rating;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (userId) {
                  _context5.next = 2;
                  break;
                }

                throw new _apolloServerExpress.AuthenticationError("An authenticated user is required");

              case 2:
                return _context5.abrupt("return", _connectors.ReviewConnector.addReview(filmId, content, rating, userId));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function add(_x11) {
        return _ref7.apply(this, arguments);
      }

      return add;
    }()
  }]);

  return Review;
}();

exports.default = Review;