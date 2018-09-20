"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getGenres = function getGenres(ids) {
  return _sqlite2.default.all("SELECT rowid as \"genreId\", name, description FROM Genre WHERE rowid IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var getGenreIdsByFilm = function getGenreIdsByFilm(ids) {
  return _sqlite2.default.all("SELECT g.rowid as \"genreId\" FROM Genre g INNER JOIN FilmGenre f ON g.rowid = f.genreId WHERE f.filmId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref) {
      var genreId = _ref.genreId;
      return genreId;
    });
  });
};

exports.default = {
  getGenres: getGenres,
  getGenreIdsByFilm: getGenreIdsByFilm
};