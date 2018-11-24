import { gql } from "apollo-server-express";

export const typeDef = gql`
  "An edge in a connection."
  type FilmActorsEdge {
    "A cursor for use in pagination."
    cursor: String!
    "The item at the end of the edge."
    node: Actor
    "The character who the actor was cast as related to the edge."
    castAs: Character
  }
`;

export const resolvers = {
  FilmActorsEdge: {
    node: ({ node }) => node.actor,
    castAs: ({ node }) => node.castAs
  },
};
