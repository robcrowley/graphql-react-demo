"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCharacters = function getCharacters(ids) {
  return _sqlite2.default.all("SELECT rowid as \"characterId\", name FROM Character WHERE rowid IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var findCharacterIdsByName = function findCharacterIdsByName(names) {
  return _sqlite2.default.all("SELECT rowid as \"characterId\" FROM Character WHERE " + (0, _utils.parameterizeLike)("name", names), (0, _utils.asArray)(names));
};

var addCharacter = function addCharacter(name) {
  return _sqlite2.default.run("INSERT INTO Character (name) VALUES ($name)", {
    $name: name
  }).then(function (_ref) {
    var lastID = _ref.lastID;
    return lastID;
  });
};

exports.default = {
  getCharacters: getCharacters,
  findCharacterIdsByName: findCharacterIdsByName,
  addCharacter: addCharacter
};