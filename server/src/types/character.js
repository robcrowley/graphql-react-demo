import { gql } from "apollo-server-express";
import { toGlobalId, connectionFromPromisedArray } from "graphql-relay";

export const typeDef = gql`
  type Character implements Node {
    id: ID!
    characterId: ID!
    name: String
    appearedIn: CharacterFilmsConnection
  }
`;

export const resolvers = {
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
  }
};