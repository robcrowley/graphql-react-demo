import { gql } from "apollo-server-express";

export const typeDef = gql`
  type ActorFilmsConnection {
    edges: [ActorFilmsEdge]
    nodes: [Film]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }
`;
