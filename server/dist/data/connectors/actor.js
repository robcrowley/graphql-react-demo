"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getActors = function getActors(ids) {
  return _sqlite2.default.all("SELECT rowid as \"actorId\", name FROM Actor WHERE rowid IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var getActorIdsByFilm = function getActorIdsByFilm(ids) {
  return _sqlite2.default.all("SELECT a.rowid as \"actorId\" FROM Actor a INNER JOIN FilmRole c ON a.rowid = c.actorId WHERE c.filmId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref) {
      var actorId = _ref.actorId;
      return actorId;
    });
  });
};

var findActorIdsByName = function findActorIdsByName(names) {
  return _sqlite2.default.all("SELECT rowid as \"actorId\" FROM Actor WHERE " + (0, _utils.parameterizeLike)("name", names), (0, _utils.asArray)(names));
};

var addActor = function addActor(name) {
  return _sqlite2.default.run("INSERT INTO Actor (name) VALUES ($name)", {
    $name: name
  }).then(function (_ref2) {
    var lastID = _ref2.lastID;
    return lastID;
  });
};

exports.default = {
  getActors: getActors,
  getActorIdsByFilm: getActorIdsByFilm,
  findActorIdsByName: findActorIdsByName,
  addActor: addActor
};