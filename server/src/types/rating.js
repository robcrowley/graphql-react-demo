import { gql } from "apollo-server-express";

export const typeDef = gql`
  scalar Rating
`;

export const resolvers = {
  Rating: {
    __parseValue: value => parseInt(value),
    __serialize: value => value,
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  }
};
