import { gql } from "apollo-server-express";

export const typeDef = gql`
  type DirectorFilmsConnection {
    edges: [DirectorFilmsEdge]
    nodes: [Film]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }
`;

export const resolvers = {
  DirectorFilmsConnection: {
    nodes: conn => conn.edges.map(edge => edge.node)
  }
};
