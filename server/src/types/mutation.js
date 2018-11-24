import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Mutation {
    _empty: String
  }
`;
