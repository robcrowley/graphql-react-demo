'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilmRole = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectors = require('../data/connectors');

var _groupBy = require('lodash/groupBy');

var _groupBy2 = _interopRequireDefault(_groupBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilmRole = exports.FilmRole = function () {
  function FilmRole() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        filmId = _ref.filmId,
        actorId = _ref.actorId,
        characterId = _ref.characterId;

    _classCallCheck(this, FilmRole);

    this.filmId = filmId;
    this.actorId = actorId;
    this.characterId = characterId;
  }

  _createClass(FilmRole, null, [{
    key: 'getByFilm',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(viewer, filmIds) {
        var roles, groups;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connectors.FilmRoleConnector.getFilmRolesByFilm(filmIds);

              case 2:
                roles = _context.sent;
                groups = (0, _groupBy2.default)(roles, function (role) {
                  return role.filmId;
                });
                return _context.abrupt('return', filmIds.map(function (filmId) {
                  return groups[filmId];
                }));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getByFilm(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return getByFilm;
    }()
  }, {
    key: 'getByActor',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(viewer, actorIds) {
        var roles, groups;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _connectors.FilmRoleConnector.getFilmRolesByActor(actorIds);

              case 2:
                roles = _context2.sent;
                groups = (0, _groupBy2.default)(roles, function (role) {
                  return role.actorId;
                });
                return _context2.abrupt('return', actorIds.map(function (actorId) {
                  return groups[actorId];
                }));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getByActor(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return getByActor;
    }()
  }, {
    key: 'getByCharacter',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(viewer, characterIds) {
        var roles, groups;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _connectors.FilmRoleConnector.getFilmRolesByCharacter(characterIds);

              case 2:
                roles = _context3.sent;
                groups = (0, _groupBy2.default)(roles, function (role) {
                  return role.characterId;
                });
                return _context3.abrupt('return', characterIds.map(function (characterId) {
                  return groups[characterId];
                }));

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getByCharacter(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return getByCharacter;
    }()
  }]);

  return FilmRole;
}();

exports.default = FilmRole;