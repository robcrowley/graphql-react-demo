import { extractId } from "../node";
import { gql } from "apollo-server-express";
import { topics, mediator } from "../mediator";
import { withFilter } from "apollo-server-express";

export const typeDef = gql`
  extend type Subscription {
    reviewAdded(id: ID, filmId: Int): ReviewAddedEvent!
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
      subscribe: withFilter(
          () => mediator.asyncIterator(topics.REVIEW_ADDED),
          ({ reviewAdded: review } , args) =>
            review.filmId === extractId(args, args => args.filmId)
        )
    }
  },
  ReviewAddedEvent: {
    review: ({ reviewId }, _, { loaders }) => loaders.review.load(reviewId),
    film: ({ filmId }, _, { loaders }) => loaders.film.load(filmId)
  }
};
