import gql from "graphql-tag";
import { Subscription } from "react-apollo";

const FILM_REVIEWS_SUBSCRIPTION = gql`
  subscription onReviewAdded {
    reviewAdded {
      review {
        __typename
        id
        reviewId
        content
        rating
        createdAt
      }
      film {
        __typename
        id
        filmId
        title
        description
        releasedOn
      }
    }
  }
`;

const FilmReviewSubscriber = ({ filmId }) => (
  <Subscription subscription={FILM_REVIEWS_SUBSCRIPTION}>
    {({
      data: { reviewAdded: { review: { content: review } = {} } = {} } = {},
      loading
    }) => (
      <section>
        {!loading && review && (
          <div className="alert alert-primary" role="alert">
            New Review: <strong>{review}</strong>
          </div>
        )}
      </section>
    )}
  </Subscription>
);

export default FilmReviewSubscriber;
