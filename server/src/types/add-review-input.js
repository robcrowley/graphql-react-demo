import { gql } from "apollo-server-express";

export const typeDef = gql`
  input AddReviewInput {
    clientMutationId: String
    filmId: ID!
    content: String!
    rating: Rating!
  }
`;
