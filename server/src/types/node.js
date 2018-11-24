import { gql } from "apollo-server-express";

export const typeDef = gql`
  "An object with an ID"
  interface Node {
    "The id of the object."
    id: ID!
  }
`;

