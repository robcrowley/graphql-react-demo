"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _apolloServerExpress = require("apollo-server-express");

var _connectors = require("../data/connectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function () {
  function User() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        userId = _ref.userId,
        name = _ref.name,
        username = _ref.username;

    _classCallCheck(this, User);

    this.userId = userId;
    this.name = name;
    this.username = username;
  }

  _createClass(User, null, [{
    key: "isAccessibleTo",
    value: function isAccessibleTo(viewer) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          username = _ref2.username;

      return viewer.username === username;
    }
  }, {
    key: "login",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, password) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connectors.UserConnector.getUserByUsername(username);

              case 2:
                data = _context.sent;
                _context.t0 = !!data;

                if (!_context.t0) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return _bcrypt2.default.compare(password, data.password);

              case 7:
                _context.t0 = _context.sent;

              case 8:
                if (!_context.t0) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", new User(data));

              case 10:
                throw new _apolloServerExpress.UserInputError("Invalid username or password");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(viewer, id) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _connectors.UserConnector.getUser(id);

              case 2:
                data = _context2.sent;
                return _context2.abrupt("return", User.isAccessibleTo(viewer, data) ? new User(data) : null);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getByUsername",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(viewer, username) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _connectors.UserConnector.getUserByUsername(username);

              case 2:
                data = _context3.sent;
                return _context3.abrupt("return", User.isAccessibleTo(viewer, data) ? new User(data) : null);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getByUsername(_x7, _x8) {
        return _ref5.apply(this, arguments);
      }

      return getByUsername;
    }()
  }]);

  return User;
}();

exports.default = User;