import { gql } from "apollo-server-express";

export const typeDef = gql`
  "A connection to a list of characters appearing in a film."
  type FilmCharactersConnection {
    "A list of edges."
    edges: [FilmCharactersEdge]
    "A list of nodes in the connection (without going through the edges field)."
    nodes: [Character]
    "Information to aid in pagination."
    pageInfo: PageInfo!
  }
`;

export const resolvers = {
  FilmCharactersConnection: {
    nodes: conn => conn.edges.map(({ node }) => node.character)
  }
};
