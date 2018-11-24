import { gql } from "apollo-server-express";

export const typeDef = gql`
  type FilmGenresEdge {
    cursor: String!
    node: Genre
  }
`;
