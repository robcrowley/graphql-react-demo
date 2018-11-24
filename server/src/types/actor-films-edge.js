import { gql } from "apollo-server-express";

export const typeDef = gql`
  type ActorFilmsEdge {
    cursor: String!
    node: Film
  }
`;
