import { gql } from "apollo-server-express";

export const typeDef = gql`
  type FilmActorsConnection {
    edges: [FilmActorsEdge]
    nodes: [Actor]
    pageInfo: PageInfo!
  }
`;

export const resolvers = {
  FilmActorsConnection: {
    nodes: conn => conn.edges.map(({ node }) => node.actor)
  }
};
