"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataloader = require("dataloader");

var _dataloader2 = _interopRequireDefault(_dataloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLoaders = function createLoaders(viewer, models) {
  var filmRoleByCharacterLoader = new _dataloader2.default(function (ids) {
    return models.filmRole.getByCharacter(viewer, ids);
  });
  var filmRoleByActorLoader = new _dataloader2.default(function (ids) {
    return models.filmRole.getByActor(viewer, ids);
  });
  var filmRoleByFilmLoader = new _dataloader2.default(function (ids) {
    return models.filmRole.getByFilm(viewer, ids);
  });
  var aggregateRatingLoader = new _dataloader2.default(function (ids) {
    return models.aggregateRating.get(viewer, ids);
  });
  var characterLoader = new _dataloader2.default(function (ids) {
    return models.character.get(viewer, ids);
  });
  var directorLoader = new _dataloader2.default(function (ids) {
    return models.director.get(viewer, ids);
  });
  var reviewLoader = new _dataloader2.default(function (ids) {
    return models.review.get(viewer, ids);
  });
  var genreLoader = new _dataloader2.default(function (ids) {
    return models.genre.get(viewer, ids);
  });
  var actorLoader = new _dataloader2.default(function (ids) {
    return models.actor.get(viewer, ids);
  });
  var filmLoader = new _dataloader2.default(function (ids) {
    return models.film.get(viewer, ids);
  });

  var userLoader = new _dataloader2.default(function (ids) {
    return Promise.all(ids.map(function (id) {
      return models.user.get(viewer, id).then(function (user) {
        if (user) {
          userByUsernameLoader.prime(user.login, user);
        }
        return user;
      });
    }));
  });

  var userByUsernameLoader = new _dataloader2.default(function (usernames) {
    return Promise.all(usernames.map(function (login) {
      return models.user.getByLogin(viewer, usernames).then(function (user) {
        if (user) {
          userLoader.prime(user.id, user);
        }
        return user;
      });
    }));
  });

  return {
    filmRoleByCharacter: filmRoleByCharacterLoader,
    filmRoleByActor: filmRoleByActorLoader,
    filmRoleByFilm: filmRoleByFilmLoader,
    userByUsername: userByUsernameLoader,
    aggregateRating: aggregateRatingLoader,
    character: characterLoader,
    director: directorLoader,
    review: reviewLoader,
    genre: genreLoader,
    actor: actorLoader,
    film: filmLoader,
    user: userLoader
  };
};

exports.default = createLoaders;