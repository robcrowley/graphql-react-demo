"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDirectors = function getDirectors(ids) {
  return _sqlite2.default.all("SELECT rowid as \"directorId\", name FROM Director WHERE rowid IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var findDirectorIdsByName = function findDirectorIdsByName(names) {
  return _sqlite2.default.all("SELECT rowid as \"directorId\" FROM Director WHERE " + (0, _utils.parameterizeLike)("name", names), (0, _utils.asArray)(names));
};

var addDirector = function addDirector(name) {
  return _sqlite2.default.run("INSERT INTO Director (name) VALUES ($name)", {
    $name: name
  }).then(function (_ref) {
    var lastID = _ref.lastID;
    return lastID;
  });
};

exports.default = {
  getDirectors: getDirectors,
  findDirectorIdsByName: findDirectorIdsByName,
  addDirector: addDirector
};