import { gql } from "apollo-server-express";

export const typeDef = gql`
  type SearchResultsEdge {
    cursor: String!
    node: SearchResult
  }
`;
