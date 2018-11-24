import { gql } from "apollo-server-express";
import { GraphQLDate } from "graphql-iso-date";

export const typeDef = gql`
  scalar Date
`;

export const resolvers = {
  Date: GraphQLDate,
};
