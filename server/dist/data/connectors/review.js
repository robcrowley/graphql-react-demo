"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getReviews = function getReviews(ids) {
  return _sqlite2.default.all("SELECT rowid as \"reviewId\", filmId, content, rating, userId, createdAt FROM Review WHERE rowid IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids));
};

var getReviewIdsByFilm = function getReviewIdsByFilm(ids) {
  return _sqlite2.default.all("SELECT rowid as \"reviewId\" FROM Review WHERE filmId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref) {
      var reviewId = _ref.reviewId;
      return reviewId;
    });
  });
};

var getReviewIdsByDirector = function getReviewIdsByDirector(ids) {
  return _sqlite2.default.all("SELECT r.rowid as \"reviewId\" FROM Review r INNER JOIN Film f ON r.filmId = f.filmId WHERE f.directorId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref2) {
      var reviewId = _ref2.reviewId;
      return reviewId;
    });
  });
};

var getReviewIdsByUser = function getReviewIdsByUser(ids) {
  return _sqlite2.default.all("SELECT rowid as \"reviewId\" FROM Review WHERE userId IN (" + (0, _utils.parameterize)(ids) + ")", (0, _utils.asArray)(ids)).then(function (rows) {
    return rows.map(function (_ref3) {
      var reviewId = _ref3.reviewId;
      return reviewId;
    });
  });
};

var addReview = function addReview(filmId, content, rating, userId) {
  return _sqlite2.default.run("INSERT INTO Review (filmId, content, rating, userId) VALUES ($filmId, $content, $rating, $userId)", {
    $filmId: filmId,
    $content: content,
    $rating: rating,
    $userId: userId
  }).then(function (_ref4) {
    var lastID = _ref4.lastID;
    return lastID;
  });
};

exports.default = {
  getReviews: getReviews,
  getReviewIdsByFilm: getReviewIdsByFilm,
  getReviewIdsByDirector: getReviewIdsByDirector,
  getReviewIdsByUser: getReviewIdsByUser,
  addReview: addReview
};