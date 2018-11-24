import { gql } from "apollo-server-express";

export const typeDef = gql`
  type DirectorFilmsEdge {
    cursor: String!
    node: Film
  }
`;
