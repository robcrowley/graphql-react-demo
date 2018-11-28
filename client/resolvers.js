import gql from "graphql-tag";

export const defaults = {
  bookmarks: {
    __typename: "Bookmarks",
    reviews: []
  }
};

export const resolvers = {
  Mutation: {
    toggleBookmark: (_, args, { cache }) => {
      const query = gql`
        {
          bookmarks {
            reviews
          }
        }
      `;

      let { bookmarks: { reviews} } = cache.readQuery({ query });

      const data = reviews.includes(args.id)
        ? reviews.filter(id => id !== args.id)
        : reviews.concat(args.id);

      cache.writeQuery({ query, data: { bookmarks: { __typename: "Bookmarks", reviews: data } } });

      return null;
    }
  }
};
