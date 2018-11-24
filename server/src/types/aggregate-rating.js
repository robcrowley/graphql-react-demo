import { gql } from "apollo-server-express";

export const typeDef = gql`
  type AggregateRating {
    film: Film!
    count: Int!
    average: Int
    best: Int
    worst: Int
  }
`;
