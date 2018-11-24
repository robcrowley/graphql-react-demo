import { gql } from "apollo-server-express";
import { topics, mediator } from "../mediator";

export const typeDef = gql`
  extend type Mutation {
    addReview(input: AddReviewInput!): AddReviewPayload
  }

  type AddReviewPayload {
    clientMutationId: String
    review: Review
  }
`;

export const resolvers = {
  Mutation: {
    addReview: async (_, { input }, { viewer, loaders, models }) => {
      const id = await models.review.add(viewer, input);
      const review = await loaders.review.load(id).then(elem => {
        mediator.publish(topics.REVIEW_ADDED, {
          [topics.REVIEW_ADDED]: {
            reviewId: elem.reviewId,
            filmId: elem.filmId
          }
        });
        return elem;
      });

      return {
        clientMutationId: input.clientMutationId,
        review
      };
    }
  }
};
