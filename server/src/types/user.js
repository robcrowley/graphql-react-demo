import { gql } from "apollo-server-express";
import { toGlobalId } from "graphql-relay";

export const typeDef = gql`
  type User implements Node {
    id: ID!
    userId: ID!
    name: String
    username: String!
  }
`;

export const resolvers = {
  User: {
    id: ({ userId }, _, { models }) => toGlobalId(userId, models.user.name)
  }
};

