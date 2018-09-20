"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n  scalar Date\n\n  scalar DateTime\n\n  scalar Rating\n\n  \"An object with an ID\"\n  interface Node {\n    \"The id of the object.\"\n    id: ID!\n  }\n\n  \"Information about pagination in a connection.\"\n  type PageInfo {\n    \"When paginating forwards, are there more items?\"\n    hasNextPage: Boolean!\n    \"When paginating backwards, are there more items?\"\n    hasPreviousPage: Boolean!\n    \"When paginating backwards, the cursor to continue.\"\n    startCursor: String\n    \"When paginating forwards, the cursor to continue.\"\n    endCursor: String\n  }\n\n  type Film implements Node {\n    id: ID!\n    filmId: ID!\n    title: String\n    description: String\n    director: Director\n    releasedOn: Date\n    createdAt: String\n    cast(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmActorsConnection\n    genres(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmGenresConnection\n    characters(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmCharactersConnection\n    reviews(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmReviewsConnection\n  }\n\n  type FilmActorsConnection {\n    edges: [FilmActorsEdge]\n    nodes: [Actor]\n    pageInfo: PageInfo!\n  }\n\n  \"An edge in a connection.\"\n  type FilmActorsEdge {\n    \"A cursor for use in pagination.\"\n    cursor: String!\n    \"The item at the end of the edge.\"\n    node: Actor\n    \"The character who the actor was cast as related to the edge.\"\n    castAs: Character\n  }\n\n  \"A connection to a list of characters appearing in a film.\"\n  type FilmCharactersConnection {\n    \"A list of edges.\"\n    edges: [FilmCharactersEdge]\n    \"A list of nodes in the connection (without going through the edges field).\"\n    nodes: [Character]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  \"An edge in a connection.\"\n  type FilmCharactersEdge {\n    \"A cursor for use in pagination.\"\n    cursor: String!\n    \"The item at the end of the edge.\"\n    node: Character\n    \"The actor who played the character related to the edge.\"\n    playedBy: Actor\n  }\n\n  type Director implements Node {\n    id: ID!\n    directorId: ID!\n    name: String\n    directed: DirectorFilmsConnection\n  }\n\n  type DirectorFilmsConnection {\n    edges: [DirectorFilmsEdge]\n    nodes: [Film]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type DirectorFilmsEdge {\n    cursor: String!\n    node: Film\n  }\n\n  type Actor implements Node {\n    id: ID!\n    actorId: ID!\n    name: String\n    appearedIn: ActorFilmsConnection\n  }\n\n  type ActorFilmsConnection {\n    edges: [ActorFilmsEdge]\n    nodes: [Film]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type ActorFilmsEdge {\n    cursor: String!\n    node: Film\n  }\n\n  type Character implements Node {\n    id: ID!\n    characterId: ID!\n    name: String\n    appearedIn: CharacterFilmsConnection\n  }\n\n  type CharacterFilmsConnection {\n    edges: [CharacterFilmsEdge]\n    nodes: [Film]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type CharacterFilmsEdge {\n    cursor: String!\n    node: Film\n  }\n\n  type AggregateRating {\n    film: Film!\n    count: Int!\n    average: Int\n    best: Int\n    worst: Int\n  }\n\n  type Genre implements Node {\n    id: ID!\n    name: String!\n    description: String\n  }\n\n  type FilmGenresConnection {\n    edges: [FilmGenresEdge]\n    nodes: [Genre]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type FilmGenresEdge {\n    cursor: String!\n    node: Genre\n  }\n\n  union SearchResult = Actor | Director | Film | Character\n\n  \"A list of results that matched against a search query.\"\n  type SearchResultsConnection {\n    \"A list of edges.\"\n    edges: [SearchResultsEdge]\n    \"A list of nodes.\"\n    nodes: [SearchResult]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n    \"The number of characters that matched the search query.\"\n    characterCount: Int!\n    \"The number of directors that matched the search query.\"\n    directorCount: Int!\n    \"The number of actors that matched the search query.\"\n    actorCount: Int!\n    \"The number of films that matched the search query.\"\n    filmCount: Int!\n  }\n\n  type SearchResultsEdge {\n    cursor: String!\n    node: SearchResult\n  }\n\n  type Review implements Node {\n    id: ID!\n    reviewId: ID!\n    content: String!\n    rating: Rating!\n    film: Film!\n    createdAt: DateTime!\n  }\n\n  type FilmReviewsConnection {\n    edges: [FilmReviewsEdge]\n    nodes: [Review]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n    aggregateRating: AggregateRating\n  }\n\n  type FilmReviewsEdge {\n    cursor: String!\n    node: Review\n  }\n\n  type User implements Node {\n    id: ID!\n    userId: ID!\n    name: String\n    username: String!\n  }\n\n  type Query {\n    film(id: ID, filmId: Int): Film\n    search(query: String, first: Int, after: String): SearchResultsConnection\n  }\n\n  input AddReviewInput {\n    clientMutationId: String\n    filmId: ID!\n    content: String!\n    rating: Rating!\n  }\n\n  type AddReviewPayload {\n    clientMutationId: String\n    review: Review\n  }\n\n  input LoginInput {\n    username: String!\n    password: String!\n  }\n\n  type LoginPayload {\n    token: String!\n    user: User!\n  }\n\n  type Mutation {\n    login(input: LoginInput!): LoginPayload\n    addReview(input: AddReviewInput!): AddReviewPayload\n  }\n\n  type Subscription {\n    reviewAdded: ReviewAddedEvent!\n  }\n\n  \"Represents a review added event on a given film.\"\n  type ReviewAddedEvent {\n    review: Review\n    film: Film\n  }\n"], ["\n  scalar Date\n\n  scalar DateTime\n\n  scalar Rating\n\n  \"An object with an ID\"\n  interface Node {\n    \"The id of the object.\"\n    id: ID!\n  }\n\n  \"Information about pagination in a connection.\"\n  type PageInfo {\n    \"When paginating forwards, are there more items?\"\n    hasNextPage: Boolean!\n    \"When paginating backwards, are there more items?\"\n    hasPreviousPage: Boolean!\n    \"When paginating backwards, the cursor to continue.\"\n    startCursor: String\n    \"When paginating forwards, the cursor to continue.\"\n    endCursor: String\n  }\n\n  type Film implements Node {\n    id: ID!\n    filmId: ID!\n    title: String\n    description: String\n    director: Director\n    releasedOn: Date\n    createdAt: String\n    cast(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmActorsConnection\n    genres(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmGenresConnection\n    characters(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmCharactersConnection\n    reviews(\n      first: Int\n      after: String\n      last: Int\n      before: String\n    ): FilmReviewsConnection\n  }\n\n  type FilmActorsConnection {\n    edges: [FilmActorsEdge]\n    nodes: [Actor]\n    pageInfo: PageInfo!\n  }\n\n  \"An edge in a connection.\"\n  type FilmActorsEdge {\n    \"A cursor for use in pagination.\"\n    cursor: String!\n    \"The item at the end of the edge.\"\n    node: Actor\n    \"The character who the actor was cast as related to the edge.\"\n    castAs: Character\n  }\n\n  \"A connection to a list of characters appearing in a film.\"\n  type FilmCharactersConnection {\n    \"A list of edges.\"\n    edges: [FilmCharactersEdge]\n    \"A list of nodes in the connection (without going through the edges field).\"\n    nodes: [Character]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  \"An edge in a connection.\"\n  type FilmCharactersEdge {\n    \"A cursor for use in pagination.\"\n    cursor: String!\n    \"The item at the end of the edge.\"\n    node: Character\n    \"The actor who played the character related to the edge.\"\n    playedBy: Actor\n  }\n\n  type Director implements Node {\n    id: ID!\n    directorId: ID!\n    name: String\n    directed: DirectorFilmsConnection\n  }\n\n  type DirectorFilmsConnection {\n    edges: [DirectorFilmsEdge]\n    nodes: [Film]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type DirectorFilmsEdge {\n    cursor: String!\n    node: Film\n  }\n\n  type Actor implements Node {\n    id: ID!\n    actorId: ID!\n    name: String\n    appearedIn: ActorFilmsConnection\n  }\n\n  type ActorFilmsConnection {\n    edges: [ActorFilmsEdge]\n    nodes: [Film]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type ActorFilmsEdge {\n    cursor: String!\n    node: Film\n  }\n\n  type Character implements Node {\n    id: ID!\n    characterId: ID!\n    name: String\n    appearedIn: CharacterFilmsConnection\n  }\n\n  type CharacterFilmsConnection {\n    edges: [CharacterFilmsEdge]\n    nodes: [Film]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type CharacterFilmsEdge {\n    cursor: String!\n    node: Film\n  }\n\n  type AggregateRating {\n    film: Film!\n    count: Int!\n    average: Int\n    best: Int\n    worst: Int\n  }\n\n  type Genre implements Node {\n    id: ID!\n    name: String!\n    description: String\n  }\n\n  type FilmGenresConnection {\n    edges: [FilmGenresEdge]\n    nodes: [Genre]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n  }\n\n  type FilmGenresEdge {\n    cursor: String!\n    node: Genre\n  }\n\n  union SearchResult = Actor | Director | Film | Character\n\n  \"A list of results that matched against a search query.\"\n  type SearchResultsConnection {\n    \"A list of edges.\"\n    edges: [SearchResultsEdge]\n    \"A list of nodes.\"\n    nodes: [SearchResult]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n    \"The number of characters that matched the search query.\"\n    characterCount: Int!\n    \"The number of directors that matched the search query.\"\n    directorCount: Int!\n    \"The number of actors that matched the search query.\"\n    actorCount: Int!\n    \"The number of films that matched the search query.\"\n    filmCount: Int!\n  }\n\n  type SearchResultsEdge {\n    cursor: String!\n    node: SearchResult\n  }\n\n  type Review implements Node {\n    id: ID!\n    reviewId: ID!\n    content: String!\n    rating: Rating!\n    film: Film!\n    createdAt: DateTime!\n  }\n\n  type FilmReviewsConnection {\n    edges: [FilmReviewsEdge]\n    nodes: [Review]\n    \"Information to aid in pagination.\"\n    pageInfo: PageInfo!\n    aggregateRating: AggregateRating\n  }\n\n  type FilmReviewsEdge {\n    cursor: String!\n    node: Review\n  }\n\n  type User implements Node {\n    id: ID!\n    userId: ID!\n    name: String\n    username: String!\n  }\n\n  type Query {\n    film(id: ID, filmId: Int): Film\n    search(query: String, first: Int, after: String): SearchResultsConnection\n  }\n\n  input AddReviewInput {\n    clientMutationId: String\n    filmId: ID!\n    content: String!\n    rating: Rating!\n  }\n\n  type AddReviewPayload {\n    clientMutationId: String\n    review: Review\n  }\n\n  input LoginInput {\n    username: String!\n    password: String!\n  }\n\n  type LoginPayload {\n    token: String!\n    user: User!\n  }\n\n  type Mutation {\n    login(input: LoginInput!): LoginPayload\n    addReview(input: AddReviewInput!): AddReviewPayload\n  }\n\n  type Subscription {\n    reviewAdded: ReviewAddedEvent!\n  }\n\n  \"Represents a review added event on a given film.\"\n  type ReviewAddedEvent {\n    review: Review\n    film: Film\n  }\n"]);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _language = require("graphql/language");

var _flattenDeep = require("lodash/flattenDeep");

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _graphqlDepthLimit = require("graphql-depth-limit");

var _graphqlDepthLimit2 = _interopRequireDefault(_graphqlDepthLimit);

var _graphqlCostAnalysis = require("graphql-cost-analysis");

var _graphqlCostAnalysis2 = _interopRequireDefault(_graphqlCostAnalysis);

var _mediator = require("./mediator");

var _apolloServerExpress = require("apollo-server-express");

var _graphqlIsoDate = require("graphql-iso-date");

var _graphqlRelay = require("graphql-relay");

var _middleware = require("graphql-voyager/middleware");

var _apolloServerCacheRedis = require("apollo-server-cache-redis");

var _costMap = require("./cost-map");

var _node3 = require("./node");

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _models = require("./models");

var _loaders = require("./data/loaders");

var _loaders2 = _interopRequireDefault(_loaders);

var _sqlite = require("sqlite");

var _sqlite2 = _interopRequireDefault(_sqlite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = {
  Date: _graphqlIsoDate.GraphQLDate,
  DateTime: _graphqlIsoDate.GraphQLDateTime,
  Query: {
    film: function film(_, args, _ref) {
      var loaders = _ref.loaders;
      return loaders.film.load((0, _node3.extractId)(args, function (args) {
        return args.filmId;
      }));
    },
    search: function search(_, args, _ref2) {
      var viewer = _ref2.viewer,
          loaders = _ref2.loaders,
          models = _ref2.models;

      var films = models.film.findIdsByTitle(viewer, args.query).then(function (ids) {
        return loaders.film.loadMany(ids.map(function (_ref3) {
          var filmId = _ref3.filmId;
          return filmId;
        }));
      });
      var actors = models.actor.findIdsByName(viewer, args.query).then(function (ids) {
        return loaders.actor.loadMany(ids.map(function (_ref4) {
          var actorId = _ref4.actorId;
          return actorId;
        }));
      });
      var directors = models.director.findIdsByName(viewer, args.query).then(function (ids) {
        return loaders.director.loadMany(ids.map(function (_ref5) {
          var directorId = _ref5.directorId;
          return directorId;
        }));
      });
      var characters = models.character.findIdsByName(viewer, args.query).then(function (ids) {
        return loaders.character.loadMany(ids.map(function (_ref6) {
          var characterId = _ref6.characterId;
          return characterId;
        }));
      });
      var results = Promise.all([films, actors, directors, characters]).then(_flattenDeep2.default);

      return (0, _graphqlRelay.connectionFromPromisedArray)(results, args);
    }
  },
  SearchResult: {
    __resolveType: function __resolveType(obj) {
      return obj instanceof _models.Actor || obj instanceof _models.Director || obj instanceof _models.Film || obj instanceof _models.Character ? obj.constructor.name : null;
    }
  },
  Mutation: {
    addReview: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref7, _ref8) {
        var input = _ref7.input;
        var viewer = _ref8.viewer,
            loaders = _ref8.loaders,
            models = _ref8.models;
        var id, review;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return models.review.add(viewer, input);

              case 2:
                id = _context.sent;
                _context.next = 5;
                return loaders.review.load(id).then(function (elem) {
                  _mediator.mediator.publish(_mediator.topics.REVIEW_ADDED, _defineProperty({}, _mediator.topics.REVIEW_ADDED, {
                    reviewId: elem.reviewId,
                    filmId: elem.filmId
                  }));
                  return elem;
                });

              case 5:
                review = _context.sent;
                return _context.abrupt("return", {
                  clientMutationId: input.clientMutationId,
                  review: review
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function addReview(_x, _x2, _x3) {
        return _ref9.apply(this, arguments);
      }

      return addReview;
    }(),
    login: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref10, _ref11) {
        var _ref10$input = _ref10.input,
            username = _ref10$input.username,
            password = _ref10$input.password;
        var models = _ref11.models;
        var user, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return models.user.login(username, password);

              case 2:
                user = _context2.sent;
                token = new _models.Viewer(user).toJwt();
                return _context2.abrupt("return", {
                  token: token,
                  user: user
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function login(_x4, _x5, _x6) {
        return _ref12.apply(this, arguments);
      }

      return login;
    }()
  },
  Subscription: {
    reviewAdded: {
      subscribe: function subscribe() {
        return _mediator.mediator.asyncIterator(_mediator.topics.REVIEW_ADDED);
      }
    }
  },
  Review: {
    id: function id(_ref13, _, _ref14) {
      var reviewId = _ref13.reviewId;
      var models = _ref14.models;
      return (0, _graphqlRelay.toGlobalId)(reviewId, models.review.name);
    },
    film: function film(_ref15, _, _ref16) {
      var filmId = _ref15.filmId;
      var loaders = _ref16.loaders;
      return loaders.film.load(filmId);
    }
  },
  ReviewAddedEvent: {
    review: function review(_ref17, _, _ref18) {
      var reviewId = _ref17.reviewId;
      var loaders = _ref18.loaders;
      return loaders.review.load(reviewId);
    },
    film: function film(_ref19, _, _ref20) {
      var filmId = _ref19.filmId;
      var loaders = _ref20.loaders;
      return loaders.film.load(filmId);
    }
  },
  Actor: {
    id: function id(_ref21, _, _ref22) {
      var actorId = _ref21.actorId;
      var models = _ref22.models;
      return (0, _graphqlRelay.toGlobalId)(actorId, models.actor.name);
    },
    appearedIn: function appearedIn(_ref23, args, _ref24) {
      var actorId = _ref23.actorId;
      var loaders = _ref24.loaders;
      return (0, _graphqlRelay.connectionFromPromisedArray)(loaders.filmRoleByActor.load(actorId).then(function (ids) {
        return ids.map(function (_ref25) {
          var filmId = _ref25.filmId;
          return loaders.film.load(filmId);
        });
      }), args);
    }
  },
  Film: {
    id: function id(_ref26, _, _ref27) {
      var filmId = _ref26.filmId;
      var models = _ref27.models;
      return (0, _graphqlRelay.toGlobalId)(filmId, models.film.name);
    },
    director: function director(_ref28, _, _ref29) {
      var filmId = _ref28.filmId;
      var loaders = _ref29.loaders;
      return loaders.director.load(filmId);
    },
    cast: function cast(_ref30, args, _ref31) {
      var filmId = _ref30.filmId;
      var loaders = _ref31.loaders;
      return (0, _graphqlRelay.connectionFromPromisedArray)(loaders.filmRoleByFilm.load(filmId).then(function (ids) {
        return ids.map(function (_ref32) {
          var actorId = _ref32.actorId,
              characterId = _ref32.characterId;
          return {
            castAs: loaders.character.load(characterId),
            actor: loaders.actor.load(actorId)
          };
        });
      }), args);
    },
    characters: function characters(_ref33, args, _ref34) {
      var filmId = _ref33.filmId;
      var loaders = _ref34.loaders;
      return (0, _graphqlRelay.connectionFromPromisedArray)(loaders.filmRoleByFilm.load(filmId).then(function (ids) {
        return ids.map(function (_ref35) {
          var characterId = _ref35.characterId,
              actorId = _ref35.actorId;
          return {
            playedBy: loaders.actor.load(actorId),
            character: loaders.character.load(characterId)
          };
        });
      }), args);
    },
    genres: function genres(_ref36, args, _ref37) {
      var filmId = _ref36.filmId;
      var viewer = _ref37.viewer,
          loaders = _ref37.loaders,
          models = _ref37.models;
      return (0, _graphqlRelay.connectionFromPromisedArray)(models.genre.getIdsByFilm(viewer, filmId).then(function (ids) {
        return ids.map(function (id) {
          return loaders.genre.load(id);
        });
      }), args);
    },
    reviews: function () {
      var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref38, args, _ref39) {
        var filmId = _ref38.filmId;
        var viewer = _ref39.viewer,
            loaders = _ref39.loaders,
            models = _ref39.models;
        var connection;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _graphqlRelay.connectionFromPromisedArray)(models.review.getIdsByFilm(viewer, filmId).then(function (ids) {
                  return ids.map(function (id) {
                    return loaders.review.load(id);
                  });
                }), args);

              case 2:
                connection = _context3.sent;
                return _context3.abrupt("return", _extends({}, connection, {
                  aggregateRating: loaders.aggregateRating.load(filmId)
                }));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      function reviews(_x7, _x8, _x9) {
        return _ref40.apply(this, arguments);
      }

      return reviews;
    }()
  },
  Director: {
    id: function id(_ref41, _, _ref42) {
      var directorId = _ref41.directorId;
      var models = _ref42.models;
      return (0, _graphqlRelay.toGlobalId)(directorId, models.director.name);
    },
    directed: function directed(_ref43, args, _ref44) {
      var directorId = _ref43.directorId;
      var viewer = _ref44.viewer,
          loaders = _ref44.loaders,
          models = _ref44.models;
      return (0, _graphqlRelay.connectionFromPromisedArray)(models.film.getIdsByDirector(viewer, directorId).then(function (ids) {
        return ids.map(function (id) {
          return loaders.film.load(id);
        });
      }), args);
    }
  },
  Character: {
    id: function id(_ref45, _, _ref46) {
      var characterId = _ref45.characterId;
      var models = _ref46.models;
      return (0, _graphqlRelay.toGlobalId)(characterId, models.character.name);
    },
    appearedIn: function appearedIn(_ref47, args, _ref48) {
      var characterId = _ref47.characterId;
      var loaders = _ref48.loaders;
      return (0, _graphqlRelay.connectionFromPromisedArray)(loaders.filmRoleByCharacter.load(characterId).then(function (ids) {
        return ids.map(function (_ref49) {
          var filmId = _ref49.filmId;
          return loaders.film.load(filmId);
        });
      }), args);
    }
  },
  User: {
    id: function id(_ref50, _, _ref51) {
      var userId = _ref50.userId;
      var models = _ref51.models;
      return (0, _graphqlRelay.toGlobalId)(userId, models.user.name);
    }
  },
  FilmActorsConnection: {
    nodes: function nodes(conn) {
      return conn.edges.map(function (_ref52) {
        var node = _ref52.node;
        return node.actor;
      });
    }
  },
  FilmActorsEdge: {
    node: function node(_ref53) {
      var _node = _ref53.node;
      return _node.actor;
    },
    castAs: function castAs(_ref54) {
      var node = _ref54.node;
      return node.castAs;
    }
  },
  FilmReviewsConnection: {
    nodes: function nodes(conn) {
      return conn.edges.map(function (_ref55) {
        var node = _ref55.node;
        return node.review;
      });
    }
  },
  FilmCharactersConnection: {
    nodes: function nodes(conn) {
      return conn.edges.map(function (_ref56) {
        var node = _ref56.node;
        return node.character;
      });
    }
  },
  FilmCharactersEdge: {
    node: function node(_ref57) {
      var _node2 = _ref57.node;
      return _node2.character;
    },
    playedBy: function playedBy(_ref58) {
      var node = _ref58.node;
      return node.playedBy;
    }
  },
  FilmGenresConnection: {
    nodes: function nodes(conn) {
      return conn.edges.map(function (edge) {
        return edge.node;
      });
    }
  },
  DirectorFilmsConnection: {
    nodes: function nodes(conn) {
      return conn.edges.map(function (edge) {
        return edge.node;
      });
    }
  },
  CharacterFilmsConnection: {
    nodes: function nodes(conn) {
      return conn.edges.map(function (edge) {
        return edge.node;
      });
    }
  },
  Rating: {
    __parseValue: function __parseValue(value) {
      return parseInt(value);
    },
    __serialize: function __serialize(value) {
      return value;
    },
    __parseLiteral: function __parseLiteral(ast) {
      if (ast.kind === _language.Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  }
};

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    settings: {
      "editor.cursorShape": "line"
    }
  },
  context: function () {
    var _ref60 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref59) {
      var req = _ref59.req,
          connection = _ref59.connection;
      var authorization, viewer, models, loaders;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              authorization = !!connection ? connection.context.authorization : req.headers.authorization;
              viewer = _models.Viewer.fromBearerAuthHeader(authorization);
              models = {
                user: _models.User,
                film: _models.Film,
                actor: _models.Actor,
                genre: _models.Genre,
                review: _models.Review,
                filmRole: _models.FilmRole,
                director: _models.Director,
                character: _models.Character,
                aggregateRating: _models.AggregateRating
              };
              loaders = (0, _loaders2.default)(viewer, models);
              return _context4.abrupt("return", {
                loaders: loaders,
                viewer: viewer,
                models: models
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    function context(_x10) {
      return _ref60.apply(this, arguments);
    }

    return context;
  }(),
  tracing: true,
  cacheControl: true,
  engine: {
    apiKey: _config2.default.apolloEngineKey
  },
  persistedQueries: {
    cache: new _apolloServerCacheRedis.RedisCache({
      host: _config2.default.redisCache.host,
      port: _config2.default.redisCache.port
    })
  },
  subscriptions: {
    onConnect: function onConnect(connectionParams, webSocket) {
      console.log('Web Socket connection created');
    }
  },
  validationRules: [(0, _graphqlDepthLimit2.default)(_config2.default.queryComplexity.maxDepth), (0, _graphqlCostAnalysis2.default)({
    maximumCost: _config2.default.queryComplexity.maxCost,
    defaultCost: _config2.default.queryComplexity.defaultCost,
    costMap: _costMap.costMap
  })]
});

var app = (0, _express2.default)();

app.use(_config2.default.voyagerPath, (0, _middleware.express)({ endpointUrl: _config2.default.graphqlPath }));

server.applyMiddleware({ app: app, path: _config2.default.graphqlPath });

var httpServer = _http2.default.createServer(app);
server.installSubscriptionHandlers(httpServer);

Promise.resolve().then(function () {
  return _sqlite2.default.open("./cassette-revival.sqlite", {
    Promise: Promise
  });
}).then(function () {
  return _sqlite2.default.driver.on("trace", console.log);
}).then(function () {
  return _sqlite2.default.migrate({
    force: "last"
  });
}).then(function () {
  return app.listen({ port: _config2.default.port });
}).then(function () {
  console.log("\uD83D\uDE80 Server ready at http://localhost:" + _config2.default.port + server.graphqlPath);
  console.log("\uD83D\uDE80 Subscriptions ready at ws://localhost:" + _config2.default.port + server.subscriptionsPath);
});