import { gql } from "apollo-server-express";
import flattenDeep from "lodash/flattenDeep";
import { connectionFromPromisedArray } from "graphql-relay";

export const typeDef = gql`
  extend type Query {
    search(query: String, first: Int, after: String): SearchResultsConnection
  }

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
`;

export const resolvers = {
  Query: {
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
  }
};

