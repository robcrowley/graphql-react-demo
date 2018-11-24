import { gql } from "apollo-server-express";
import { toGlobalId, connectionFromPromisedArray } from "graphql-relay";

export const typeDef = gql`
  type Actor implements Node {
    id: ID!
    actorId: ID!
    name: String
    appearedIn: ActorFilmsConnection
  }
`;

export const resolvers = {
  Actor: {
    id: ({ actorId }, _, { models }) => toGlobalId(actorId, models.actor.name),
    appearedIn: ({ actorId }, args, { loaders }) =>
      connectionFromPromisedArray(
        loaders.filmRoleByActor
          .load(actorId)
          .then(ids => ids.map(({ filmId }) => loaders.film.load(filmId))),
        args
      )
  }
};
