import gql from "graphql-tag";
import { Query } from "react-apollo";
import App from "../components/App";
import FilmReviews from "../components/FilmReviews";

export const BOOKMARKS_QUERY = gql`
  {
    bookmarks @client {
      reviews
    }
  }
`;

export const REVIEWS_QUERY = gql`
  query Reviews($ids: [ID]!) {
    reviews(ids: $ids) @client {
      id
      content
    }
  }
`;

export default () => (
  <App>
    <Query query={BOOKMARKS_QUERY}>
      {({
        loading: bookmarksLoading,
        data: {
          bookmarks: { reviews: ids }
        }
      }) => (
        <Query query={REVIEWS_QUERY} variables={{ ids }}>
          {({ loading: reviewsLoading, data: { reviews } }) => {
            if (bookmarksLoading || reviewsLoading)
              return <div>Loading...</div>;

            return <FilmReviews reviews={reviews} />;
          }}
        </Query>
      )}
    </Query>
  </App>
);
