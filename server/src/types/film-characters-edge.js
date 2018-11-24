import { gql } from "apollo-server-express";

export const typeDef = gql`
  "An edge in a connection."
  type FilmCharactersEdge {
    "A cursor for use in pagination."
    cursor: String!
    "The item at the end of the edge."
    node: Character
    "The actor who played the character related to the edge."
    playedBy: Actor
  }
`;

export const resolvers = {
  FilmCharactersEdge: {
    node: ({ node }) => node.character,
    playedBy: ({ node }) => node.playedBy
  }
};
