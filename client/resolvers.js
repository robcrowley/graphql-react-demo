import gql from "graphql-tag";

export const resolvers = {
  Mutation: {
    toggleFavourite: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: "Review", id: variables.id });

      const fragment = gql`
        fragment favouriteReview on Review {
          isFavourite @client
        }
      `;
      const review = cache.readFragment({ fragment, id });

      const data = { ...review, isFavourite: !review.isFavourite };
      cache.writeData({ id, data });
      return null;
    }
  },
  Review: {
    isFavourite: () => false
  }
};
