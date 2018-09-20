"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUser = function getUser(id) {
    return _sqlite2.default.get("SELECT rowid as \"userId\", name, username, password FROM User WHERE userId = ?", id);
};

var getUserByUsername = function getUserByUsername(username) {
    return _sqlite2.default.get("SELECT rowid as \"userId\", name, username, password FROM User WHERE username = ?", username);
};

exports.default = {
    getUser: getUser,
    getUserByUsername: getUserByUsername
};