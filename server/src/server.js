import http from "http";

import express from "express";

import { Kind } from "graphql/language";

import flattenDeep from "lodash/flattenDeep";

import depthLimit from "graphql-depth-limit";

import costAnalysis from "graphql-cost-analysis";

import { topics, mediator } from "./mediator";

import { ApolloServer, gql } from "apollo-server-express";

import { GraphQLDate, GraphQLDateTime } from "graphql-iso-date";

import { toGlobalId, connectionFromPromisedArray } from "graphql-relay";

import { express as voyagerMiddleware } from "graphql-voyager/middleware";

import { RedisCache } from "apollo-server-cache-redis";

import { costMap } from "./cost-map";

import { extractId } from "./node";

import config from "./config";

import {
  Film,
  Actor,
  Genre,
  Director,
  Review,
  Character,
  User,
  FilmRole,
  Viewer,
  AggregateRating
} from "./models";

import memoizers from "./data/loaders";

import db from "sqlite";

const typeDefs = gql`
  scalar Date

  scalar DateTime

  scalar Rating

  "An object with an ID"
  interface Node {
    "The id of the object."
    id: ID!
  }

  "Information about pagination in a connection."
  type PageInfo {
    "When paginating forwards, are there more items?"
    hasNextPage: Boolean!
    "When paginating backwards, are there more items?"
    hasPreviousPage: Boolean!
    "When paginating backwards, the cursor to continue."
    startCursor: String
    "When paginating forwards, the cursor to continue."
    endCursor: String
  }

  type Film implements Node {
    id: ID!
    filmId: ID!
    title: String
    description: String
    director: Director
    releasedOn: Date
    createdAt: String
    cast(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmActorsConnection
    genres(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmGenresConnection
    characters(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmCharactersConnection
    reviews(
      first: Int
      after: String
      last: Int
      before: String
    ): FilmReviewsConnection
  }

  type FilmActorsConnection {
    edges: [FilmActorsEdge]
    nodes: [Actor]
    pageInfo: PageInfo!
  }

  "An edge in a connection."
  type FilmActorsEdge {
    "A cursor for use in pagination."
    cursor: String!
    "The item at the end of the edge."
    node: Actor
    "The character who the actor was cast as related to the edge."
    castAs: Character
  }

  "A connection to a list of characters appearing in a film."
  type FilmCharactersConnection {
    "A list of edges."
    edges: [FilmCharactersEdge]
    "A list of nodes in the connection (without going through the edges field)."
    nodes: [Character]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }

  "An edge in a connection."
  type FilmCharactersEdge {
    "A cursor for use in pagination."
    cursor: String!
    "The item at the end of the edge."
    node: Character
    "The actor who played the character related to the edge."
    playedBy: Actor
  }

  type Director implements Node {
    id: ID!
    directorId: ID!
    name: String
    directed: DirectorFilmsConnection
  }

  type DirectorFilmsConnection {
    edges: [DirectorFilmsEdge]
    nodes: [Film]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }

  type DirectorFilmsEdge {
    cursor: String!
    node: Film
  }

  type Actor implements Node {
    id: ID!
    actorId: ID!
    name: String
    appearedIn: ActorFilmsConnection
  }

  type ActorFilmsConnection {
    edges: [ActorFilmsEdge]
    nodes: [Film]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }

  type ActorFilmsEdge {
    cursor: String!
    node: Film
  }

  type Character implements Node {
    id: ID!
    characterId: ID!
    name: String
    appearedIn: CharacterFilmsConnection
  }

  type CharacterFilmsConnection {
    edges: [CharacterFilmsEdge]
    nodes: [Film]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }

  type CharacterFilmsEdge {
    cursor: String!
    node: Film
  }

  type AggregateRating {
    film: Film!
    count: Int!
    average: Int
    best: Int
    worst: Int
  }

  type Genre implements Node {
    id: ID!
    name: String!
    description: String
  }

  type FilmGenresConnection {
    edges: [FilmGenresEdge]
    nodes: [Genre]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }

  type FilmGenresEdge {
    cursor: String!
    node: Genre
  }

  union SearchResult = Actor | Director | Film | Character

  "A list of results that matched against a search query."
  type SearchResultsConnection {
    "A list of edges."
    edges: [SearchResultsEdge]
    "A list of nodes."
    nodes: [SearchResult]
    "Information to aid in pagination."
    pageInfo: PageInfo!
    "The number of characters that matched the search query."
    characterCount: Int!
    "The number of directors that matched the search query."
    directorCount: Int!
    "The number of actors that matched the search query."
    actorCount: Int!
    "The number of films that matched the search query."
    filmCount: Int!
  }

  type SearchResultsEdge {
    cursor: String!
    node: SearchResult
  }

  type Review implements Node {
    id: ID!
    reviewId: ID!
    content: String!
    rating: Rating!
    film: Film!
    createdAt: DateTime!
  }

  type FilmReviewsConnection {
    edges: [FilmReviewsEdge]
    nodes: [Review]
    "Information to aid in pagination."
    pageInfo: PageInfo!
    aggregateRating: AggregateRating
  }

  type FilmReviewsEdge {
    cursor: String!
    node: Review
  }

  type User implements Node {
    id: ID!
    userId: ID!
    name: String
    username: String!
  }

  type Query {
    film(id: ID, filmId: Int): Film
    search(query: String, first: Int, after: String): SearchResultsConnection
  }

  input AddReviewInput {
    clientMutationId: String
    filmId: ID!
    content: String!
    rating: Rating!
  }

  type AddReviewPayload {
    clientMutationId: String
    review: Review
  }

  input LoginInput {
    clientMutationId: String
    username: String!
    password: String!
  }

  type LoginPayload {
    clientMutationId: String
    token: String!
    user: User!
  }

  type Mutation {
    login(input: LoginInput): LoginPayload
    addReview(input: AddReviewInput!): AddReviewPayload
  }

  type Subscription {
    reviewAdded: ReviewAddedEvent!
  }

  "Represents a review added event on a given film."
  type ReviewAddedEvent {
    review: Review
    film: Film
  }
`;

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    film: (_, args, { loaders }) =>
      loaders.film.load(extractId(args, args => args.filmId)),
    search: (_, args, { viewer, loaders, models }) => {
      const films = models.film
        .findIdsByTitle(viewer, args.query)
        .then(ids => loaders.film.loadMany(ids.map(({ filmId }) => filmId)));
      const actors = models.actor
        .findIdsByName(viewer, args.query)
        .then(ids => loaders.actor.loadMany(ids.map(({ actorId }) => actorId)));
      const directors = models.director
        .findIdsByName(viewer, args.query)
        .then(ids =>
          loaders.director.loadMany(ids.map(({ directorId }) => directorId))
        );
      const characters = models.character
        .findIdsByName(viewer, args.query)
        .then(ids =>
          loaders.character.loadMany(ids.map(({ characterId }) => characterId))
        );
      const results = Promise.all([films, actors, directors, characters]).then(
        flattenDeep
      );

      return connectionFromPromisedArray(results, args);
    }
  },
  SearchResult: {
    __resolveType: obj =>
      obj instanceof Actor ||
      obj instanceof Director ||
      obj instanceof Film ||
      obj instanceof Character
        ? obj.constructor.name
        : null
  },
  Mutation: {
    addReview: async (_, { input }, { viewer, loaders, models }) => {
      const id = await models.review.add(viewer, input);
      const review = await loaders.review.load(id).then(elem => {
        mediator.publish(topics.REVIEW_ADDED, {
          [topics.REVIEW_ADDED]: {
            reviewId: elem.reviewId,
            filmId: elem.filmId
          }
        });
        return elem;
      });

      return {
        clientMutationId: input.clientMutationId,
        review
      };
    },
    login: async (_, { input: { username, password, clientMutationId } }, { models }) => {
      const user = await models.user.login(username, password);

      const token = new Viewer(user).toJwt();

      return {
        clientMutationId,
        token,
        user
      };
    }
  },
  Subscription: {
    reviewAdded: {
      subscribe: () => mediator.asyncIterator(topics.REVIEW_ADDED)
    }
  },
  Review: {
    id: ({ reviewId }, _, { models }) =>
      toGlobalId(reviewId, models.review.name),
    film: ({ filmId }, _, { loaders }) => loaders.film.load(filmId)
  },
  ReviewAddedEvent: {
    review: ({ reviewId }, _, { loaders }) => loaders.review.load(reviewId),
    film: ({ filmId }, _, { loaders }) => loaders.film.load(filmId)
  },
  Actor: {
    id: ({ actorId }, _, { models }) => toGlobalId(actorId, models.actor.name),
    appearedIn: ({ actorId }, args, { loaders }) =>
      connectionFromPromisedArray(
        loaders.filmRoleByActor
          .load(actorId)
          .then(ids => ids.map(({ filmId }) => loaders.film.load(filmId))),
        args
      )
  },
  Film: {
    id: ({ filmId }, _, { models }) => toGlobalId(filmId, models.film.name),
    director: ({ filmId }, _, { loaders }) => loaders.director.load(filmId),
    cast: ({ filmId }, args, { loaders }) =>
      connectionFromPromisedArray(
        loaders.filmRoleByFilm.load(filmId).then(ids =>
          ids.map(({ actorId, characterId }) => ({
            castAs: loaders.character.load(characterId),
            actor: loaders.actor.load(actorId)
          }))
        ),
        args
      ),
    characters: ({ filmId }, args, { loaders }) =>
      connectionFromPromisedArray(
        loaders.filmRoleByFilm.load(filmId).then(ids =>
          ids.map(({ characterId, actorId }) => ({
            playedBy: loaders.actor.load(actorId),
            character: loaders.character.load(characterId)
          }))
        ),
        args
      ),
    genres: ({ filmId }, args, { viewer, loaders, models }) =>
      connectionFromPromisedArray(
        models.genre
          .getIdsByFilm(viewer, filmId)
          .then(ids => ids.map(id => loaders.genre.load(id))),
        args
      ),
    reviews: async ({ filmId }, args, { viewer, loaders, models }) => {
      const connection = await connectionFromPromisedArray(
        models.review
          .getIdsByFilm(viewer, filmId)
          .then(ids => ids.map(id => loaders.review.load(id))),
        args
      );
      return {
        ...connection,
        aggregateRating: loaders.aggregateRating.load(filmId)
      };
    }
  },
  Director: {
    id: ({ directorId }, _, { models }) =>
      toGlobalId(directorId, models.director.name),
    directed: ({ directorId }, args, { viewer, loaders, models }) =>
      connectionFromPromisedArray(
        models.film
          .getIdsByDirector(viewer, directorId)
          .then(ids => ids.map(id => loaders.film.load(id))),
        args
      )
  },
  Character: {
    id: ({ characterId }, _, { models }) =>
      toGlobalId(characterId, models.character.name),
    appearedIn: ({ characterId }, args, { loaders }) =>
      connectionFromPromisedArray(
        loaders.filmRoleByCharacter
          .load(characterId)
          .then(ids => ids.map(({ filmId }) => loaders.film.load(filmId))),
        args
      )
  },
  User: {
    id: ({ userId }, _, { models }) => toGlobalId(userId, models.user.name)
  },
  FilmActorsConnection: {
    nodes: conn => conn.edges.map(({ node }) => node.actor)
  },
  FilmActorsEdge: {
    node: ({ node }) => node.actor,
    castAs: ({ node }) => node.castAs
  },
  FilmReviewsConnection: {
    nodes: conn => conn.edges.map(({ node }) => node.review)
  },
  FilmCharactersConnection: {
    nodes: conn => conn.edges.map(({ node }) => node.character)
  },
  FilmCharactersEdge: {
    node: ({ node }) => node.character,
    playedBy: ({ node }) => node.playedBy
  },
  FilmGenresConnection: {
    nodes: conn => conn.edges.map(edge => edge.node)
  },
  DirectorFilmsConnection: {
    nodes: conn => conn.edges.map(edge => edge.node)
  },
  CharacterFilmsConnection: {
    nodes: conn => conn.edges.map(edge => edge.node)
  },
  Rating: {
    __parseValue: value => parseInt(value),
    __serialize: value => value,
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "editor.cursorShape": "line"
    }
  },
  context: async ({ req, connection }) => {
    const authorization = !!connection
      ? connection.context.authorization
      : req.headers.authorization;
    const viewer = Viewer.fromBearerAuthHeader(authorization);
    const models = {
      user: User,
      film: Film,
      actor: Actor,
      genre: Genre,
      review: Review,
      filmRole: FilmRole,
      director: Director,
      character: Character,
      aggregateRating: AggregateRating
    };
    const loaders = memoizers(viewer, models);
    return {
      loaders,
      viewer,
      models
    };
  },
  tracing: true,
  cacheControl: true,
  engine: {
    apiKey: config.apolloEngineKey
  },
  persistedQueries: {
    cache: new RedisCache({
      host: config.redisCache.host,
      port: config.redisCache.port
    })
  },
  validationRules: [
    depthLimit(config.queryComplexity.maxDepth),
    costAnalysis({
      maximumCost: config.queryComplexity.maxCost,
      defaultCost: config.queryComplexity.defaultCost,
      costMap
    })
  ]
});

const app = express();

app.use(
  config.voyagerPath,
  voyagerMiddleware({ endpointUrl: config.graphqlPath })
);

server.applyMiddleware({ app, path: config.graphqlPath });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

Promise.resolve()
  .then(() =>
    db.open("./cassette-revival.sqlite", {
      Promise
    })
  )
  .then(() => db.driver.on("trace", console.log))
  .then(() =>
    db.migrate({
      force: "last"
    })
  )
  .then(() =>
    httpServer.listen(config.port, () => {
      console.log(
        `🚀 Server ready at http://localhost:${config.port}${
          server.graphqlPath
        }`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${config.port}${
          server.subscriptionsPath
        }`
      );
    })
  );
