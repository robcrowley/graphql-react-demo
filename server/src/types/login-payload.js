import { gql } from "apollo-server-express";

import { Viewer } from "../models";

export const typeDef = gql`
  extend type Mutation {
    login(input: LoginInput): LoginPayload
  }

  type LoginPayload {
    clientMutationId: String
    token: String!
    user: User!
  }
`;

export const resolvers = {
  Mutation: {
    login: async (
      _,
      { input: { username, password, clientMutationId } },
      { models }
    ) => {
      const user = await models.user.login(username, password);

      const token = new Viewer(user).toJwt();

      return {
        clientMutationId,
        token,
        user
      };
    }
  }
};
