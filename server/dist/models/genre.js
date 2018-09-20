'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Genre = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connectors = require('../data/connectors');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Genre = exports.Genre = function () {
  function Genre() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        genreId = _ref.genreId,
        name = _ref.name,
        description = _ref.description;

    _classCallCheck(this, Genre);

    this.genreId = genreId;
    this.name = name;
    this.description = description;
  }

  _createClass(Genre, null, [{
    key: 'get',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(viewer, ids) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connectors.GenreConnector.getGenres(ids);

              case 2:
                data = _context.sent;
                return _context.abrupt('return', data.map(function (item) {
                  return new Genre(item);
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
    key: 'getIdsByFilm',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(viewer, filmIds) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', _connectors.GenreConnector.getGenreIdsByFilm(filmIds));

              case 1:
              case 'end':
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
  }]);

  return Genre;
}();

exports.default = Genre;