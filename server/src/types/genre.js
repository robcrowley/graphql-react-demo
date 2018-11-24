import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Genre implements Node {
    id: ID!
    name: String!
    description: String
  }
`;
