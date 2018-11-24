import { gql } from "apollo-server-express";

export const typeDef = gql`
  type FilmReviewsEdge {
    cursor: String!
    node: Review
  }
`;

