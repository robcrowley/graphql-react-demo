"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilmRolesByFilm = function getFilmRolesByFilm(ids) {
  return _sqlite2.default.all("SELECT filmId, actorId, characterId FROM FilmRole WHERE filmId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var getFilmRolesByActor = function getFilmRolesByActor(ids) {
  return _sqlite2.default.all("SELECT filmId, actorId, characterId FROM FilmRole WHERE actorId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var getFilmRolesByCharacter = function getFilmRolesByCharacter(ids) {
  return _sqlite2.default.all("SELECT filmId, actorId, characterId FROM FilmRole WHERE characterId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

exports.default = {
  getFilmRolesByFilm: getFilmRolesByFilm,
  getFilmRolesByActor: getFilmRolesByActor,
  getFilmRolesByCharacter: getFilmRolesByCharacter
};