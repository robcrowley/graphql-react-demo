"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _authHeader = require("auth-header");

var authorization = _interopRequireWildcard(_authHeader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Viewer = exports.Viewer = function () {
  function Viewer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        userId = _ref.userId,
        username = _ref.username,
        name = _ref.name;

    _classCallCheck(this, Viewer);

    this.userId = userId;
    this.name = name;
    this.username = username;
  }

  _createClass(Viewer, [{
    key: "toJwt",
    value: function toJwt() {
      return _jsonwebtoken2.default.sign({
        userId: this.userId,
        name: this.name,
        username: this.username
      }, _config2.default.token.secret, { expiresIn: _config2.default.token.expiry });
    }
  }], [{
    key: "fromJwt",
    value: function fromJwt(token) {
      var data = _jsonwebtoken2.default.verify(token, _config2.default.token.secret);

      return new Viewer(data);
    }
  }, {
    key: "fromBearerAuthHeader",
    value: function fromBearerAuthHeader(header) {
      try {
        var _authorization$parse = authorization.parse(header),
            scheme = _authorization$parse.scheme,
            token = _authorization$parse.token;

        if (scheme === "Bearer") {
          return Viewer.fromJwt(token);
        }
      } catch (error) {
        /* gulp */
      }
      return new Viewer();
    }
  }]);

  return Viewer;
}();

exports.default = Viewer;