"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilms = function getFilms(ids) {
  return _sqlite2.default.all("SELECT rowid as \"filmId\", title, description, directorId, releasedOn, createdAt FROM Film WHERE rowid IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var getFilmIdsByDirector = function getFilmIdsByDirector(ids) {
  return _sqlite2.default.all("SELECT rowid as \"filmId\" FROM Film WHERE directorId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref) {
      var filmId = _ref.filmId;
      return filmId;
    });
  });
};

var getFilmIdsByCharacter = function getFilmIdsByCharacter(ids) {
  return _sqlite2.default.all("SELECT f.rowid as \"filmId\" FROM Film f INNER JOIN FilmRole c ON f.rowid = c.filmId WHERE c.characterId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref2) {
      var filmId = _ref2.filmId;
      return filmId;
    });
  });
};

var getFilmIdsByActor = function getFilmIdsByActor(ids) {
  return _sqlite2.default.all("SELECT f.rowid as \"filmId\" FROM Film f INNER JOIN FilmRole c ON f.rowid = c.filmId WHERE c.actorId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref3) {
      var filmId = _ref3.filmId;
      return filmId;
    });
  });
};

var findFilmIdsByTitle = function findFilmIdsByTitle(titles) {
  return _sqlite2.default.all("SELECT rowid as \"filmId\" FROM Film WHERE " + (0, _utils.parameterizeLike)("title", titles), (0, _utils.asArray)(titles));
};

var addFilm = function addFilm(title, description, directorId) {
  return _sqlite2.default.run("INSERT INTO Film (title, directorId) VALUES ($title, $description, $directorId)", {
    $title: title,
    $description: description,
    $directorId: directorId
  }).then(function (_ref4) {
    var lastID = _ref4.lastID;
    return lastID;
  });
};

exports.default = {
  getFilms: getFilms,
  getFilmIdsByActor: getFilmIdsByActor,
  getFilmIdsByDirector: getFilmIdsByDirector,
  getFilmIdsByCharacter: getFilmIdsByCharacter,
  findFilmIdsByTitle: findFilmIdsByTitle,
  addFilm: addFilm
};