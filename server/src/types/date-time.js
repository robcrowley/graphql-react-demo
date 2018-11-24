import { gql } from "apollo-server-express";
import { GraphQLDateTime } from "graphql-iso-date";

export const typeDef = gql`
  scalar DateTime
`;

export const resolvers = {
  DateTime: GraphQLDateTime,
};
