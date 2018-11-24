import { gql } from "apollo-server-express";
import { toGlobalId } from "graphql-relay";

export const typeDef = gql`
  type Review implements Node {
    id: ID!
    reviewId: ID!
    content: String!
    rating: Rating!
    film: Film!
    createdAt: DateTime!
  }
`;

export const resolvers = {
  Review: {
    id: ({ reviewId }, _, { models }) =>
      toGlobalId(reviewId, models.review.name),
    film: ({ filmId }, _, { loaders }) => loaders.film.load(filmId)
  }
};
