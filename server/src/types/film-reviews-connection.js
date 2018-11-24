import { gql } from "apollo-server-express";

export const typeDef = gql`
  type FilmReviewsConnection {
    edges: [FilmReviewsEdge]
    nodes: [Review]
    "Information to aid in pagination."
    pageInfo: PageInfo!
    aggregateRating: AggregateRating
  }
`;

export const resolvers = {
  FilmReviewsConnection: {
    nodes: conn => conn.edges.map(({ node }) => node.review)
  }
};
