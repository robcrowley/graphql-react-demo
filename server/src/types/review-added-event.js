import { gql } from "apollo-server-express";
import { topics, mediator } from "../mediator";

export const typeDef = gql`
  extend type Subscription {
    reviewAdded: ReviewAddedEvent!
  }

  "Represents a review added event on a given film."
  type ReviewAddedEvent {
    review: Review
    film: Film
  }
`;

export const resolvers = {
  Subscription: {
    reviewAdded: {
      subscribe: () => mediator.asyncIterator(topics.REVIEW_ADDED)
    }
  },
  ReviewAddedEvent: {
    review: ({ reviewId }, _, { loaders }) => loaders.review.load(reviewId),
    film: ({ filmId }, _, { loaders }) => loaders.film.load(filmId)
  }
};
