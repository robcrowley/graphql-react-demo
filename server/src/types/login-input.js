import { gql } from "apollo-server-express";

export const typeDef = gql`
  input LoginInput {
    clientMutationId: String
    username: String!
    password: String!
  }
`;
