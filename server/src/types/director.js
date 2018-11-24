import { gql } from "apollo-server-express";
import { toGlobalId, connectionFromPromisedArray } from "graphql-relay";

export const typeDef = gql`
  type Director implements Node {
    id: ID!
    directorId: ID!
    name: String
    directed: DirectorFilmsConnection
  }
`;

export const resolvers = {
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
  }
};

