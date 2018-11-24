import { gql } from "apollo-server-express";

export const typeDef = gql`
  type CharacterFilmsConnection {
    edges: [CharacterFilmsEdge]
    nodes: [Film]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }
`;

export const resolvers = {
  CharacterFilmsConnection: {
    nodes: conn => conn.edges.map(edge => edge.node)
  }
};

