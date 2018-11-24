import { gql } from "apollo-server-express";
import { Film, Actor, Director, Character } from "../models";

export const typeDef = gql`
  union SearchResult = Actor | Director | Film | Character
`;

export const resolvers = {
  SearchResult: {
    __resolveType: obj =>
      obj instanceof Actor ||
      obj instanceof Director ||
      obj instanceof Film ||
      obj instanceof Character
        ? obj.constructor.name
        : null
  }
};
