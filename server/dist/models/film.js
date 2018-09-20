'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Film = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectors = require('../data/connectors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Film = exports.Film = function () {
  function Film() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        filmId = _ref.filmId,
        title = _ref.title,
        description = _ref.description,
        directorId = _ref.directorId,
        releasedOn = _ref.releasedOn,
        createdAt = _ref.createdAt;

    _classCallCheck(this, Film);

    this.filmId = filmId;
    this.title = title;
    this.description = description;
    this.directorId = directorId;
    this.releasedOn = releasedOn;
    this.createdAt = createdAt;
  }

  _createClass(Film, null, [{
    key: 'get',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(viewer, ids) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connectors.FilmConnector.getFilms(ids);

              case 2:
                data = _context.sent;
                return _context.abrupt('return', data.map(function (item) {
                  return new Film(item);
                }));

              case 4:
              case 'end':
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
    key: 'findIdsByTitle',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(viewer, titles) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', _connectors.FilmConnector.findFilmIdsByTitle(titles));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findIdsByTitle(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return findIdsByTitle;
    }()
  }, {
    key: 'getIdsByDirector',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(viewer, directorIds) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', _connectors.FilmConnector.getFilmIdsByDirector(directorIds));

              case 1:
              case 'end':
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
    key: 'getIdsByActor',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(viewer, actorIds) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', _connectors.FilmConnector.getFilmIdsByActor(actorIds));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getIdsByActor(_x8, _x9) {
        return _ref5.apply(this, arguments);
      }

      return getIdsByActor;
    }()
  }, {
    key: 'getIdsByCharacter',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(viewer, characterIds) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', _connectors.FilmConnector.getFilmIdsByCharacter(characterIds));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getIdsByCharacter(_x10, _x11) {
        return _ref6.apply(this, arguments);
      }

      return getIdsByCharacter;
    }()
  }, {
    key: 'add',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            title = _ref8.title,
            description = _ref8.description,
            directorId = _ref8.directorId;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', _connectors.FilmConnector.addFilm(title, description, directorId));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function add() {
        return _ref7.apply(this, arguments);
      }

      return add;
    }()
  }]);

  return Film;
}();

exports.default = Film;