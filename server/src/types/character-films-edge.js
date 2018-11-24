import { gql } from "apollo-server-express";

export const typeDef = gql`
  type CharacterFilmsEdge {
    cursor: String!
    node: Film
  }
`;
