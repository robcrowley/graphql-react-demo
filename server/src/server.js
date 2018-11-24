import http from "http";

import express from "express";

import depthLimit from "graphql-depth-limit";

import costAnalysis from "graphql-cost-analysis";

import { ApolloServer } from "apollo-server-express";

import { express as voyagerMiddleware } from "graphql-voyager/middleware";

import { RedisCache } from "apollo-server-cache-redis";

import { costMap } from "./cost-map";

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

import { typeDefs, resolvers } from "./types";

import memoizers from "./data/loaders";

import db from "sqlite";

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
