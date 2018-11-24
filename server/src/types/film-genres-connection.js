import { gql } from "apollo-server-express";

export const typeDef = gql`
  type FilmGenresConnection {
    edges: [FilmGenresEdge]
    nodes: [Genre]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }
`;

export const resolvers = {
  FilmGenresConnection: {
    nodes: conn => conn.edges.map(edge => edge.node)
  }
};
